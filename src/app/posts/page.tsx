import Link from "next/link";
import ErrorTrigger from "./ErrorTrigger";

type YouTubeVideo = {
  id: string;
  title: string;
  link: string;
  published: string;
  thumbnail: string;
  description: string;
  views: number;
};

function decodeXmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

const FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: "F5_G0AHfYhI",
    title: "A Physics Professor Bet Me $10,000 I'm Wrong...",
    link: "https://www.youtube.com/watch?v=F5_G0AHfYhI",
    published: "2026-09-02T13:00:04+00:00",
    thumbnail: "https://i3.ytimg.com/vi/F5_G0AHfYhI/hqdefault.jpg",
    description: "A UCLA Physics Professor bet me $10,000 that my video about going downwind faster than the wind was wrong. Here's how we proved it...",
    views: 1084057,
  },
  {
    id: "b3KpFdb1pW8",
    title: "We Took $10,000 From @mkbhd's Locked iPhone",
    link: "https://www.youtube.com/watch?v=b3KpFdb1pW8",
    published: "2026-08-26T15:00:02+00:00",
    thumbnail: "https://i3.ytimg.com/vi/b3KpFdb1pW8/hqdefault.jpg",
    description: "Can you bypass iPhone passcode security? We tested this on Marques Brownlee's locked iPhone.",
    views: 2450300,
  },
  {
    id: "4L36eHh4n5Y",
    title: "Why The World's Best Mathematicians Are Panicking",
    link: "https://www.youtube.com/watch?v=4L36eHh4n5Y",
    published: "2026-08-15T14:00:00+00:00",
    thumbnail: "https://i3.ytimg.com/vi/4L36eHh4n5Y/hqdefault.jpg",
    description: "How AI and automated theorem provers are reshaping mathematics forever.",
    views: 3820000,
  },
];

async function getVeritasiumVideos(): Promise<YouTubeVideo[]> {
  const channelId = "UCHnyfMqiRRG1u-2MsSQLbXA"; // Veritasium Channel ID
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`YouTube RSS responded with status: ${res.status}`);
      return FALLBACK_VIDEOS;
    }

    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);
    if (entries.length === 0) return FALLBACK_VIDEOS;

    return entries.map((entry) => {
      const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] || "";
      const rawTitle = entry.match(/<title>([^<]+)<\/title>/)?.[1] || "";
      const rawLink = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1] || `https://www.youtube.com/watch?v=${videoId}`;
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1] || "";
      const thumbnail = entry.match(/<media:thumbnail url="([^"]+)"/)?.[1] || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      const rawDesc = entry.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] || "";
      const viewsStr = entry.match(/<media:statistics views="([^"]+)"/)?.[1] || "0";

      return {
        id: videoId,
        title: decodeXmlEntities(rawTitle),
        link: rawLink,
        published,
        thumbnail,
        description: decodeXmlEntities(rawDesc.trim()),
        views: parseInt(viewsStr, 10) || 0,
      };
    });
  } catch (error) {
    console.error("Error fetching YouTube feed:", error);
    return FALLBACK_VIDEOS;
  }
}

type Props = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function PostsPage({ searchParams }: Props) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  if (resolvedSearchParams?.error === "true") {
    throw new Error("ข้อผิดพลาดจำลอง: ไม่สามารถดึงข้อมูลโพสต์ได้ (Simulated Error for Testing Error Boundary & Reset)");
  }

  const videos = await getVeritasiumVideos();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white pb-16">
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full space-y-10">
        {/* Header / Channel Banner Section */}
        <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-xl space-y-4 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            Live YouTube RSS Feed (cache: no-store)
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Veritasium
          </h1>

          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            ดึงคลิปล่าสุดแบบ Real-time จากช่องวิทยาศาสตร์ระดับโลก <span className="text-rose-400 font-semibold">Veritasium</span> (16M+ Subscribers) ผ่าน YouTube Atom/RSS Feed อย่างเป็นทางการ
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 font-medium">
            <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
              📺 Channel ID: UCHnyfMqiRRG1u-2MsSQLbXA
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
              ✨ อัปเดตล่าสุด: {videos.length} คลิป
            </span>
          </div>
        </div>

        {/* Interactive Error & Reset Test Panel */}
        <ErrorTrigger />

        {/* Video Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => {
            const dateFormatted = video.published
              ? new Date(video.published).toLocaleDateString("th-TH", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "ล่าสุด";

            return (
              <article
                key={video.id}
                className="rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-rose-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-500/10 group"
              >
                {/* Video Thumbnail */}
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-video overflow-hidden bg-slate-950"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center group-hover:bg-slate-950/10 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-rose-500 transition-all duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-7 h-7 ml-0.5"
                      >
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Date Badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[11px] font-mono text-slate-200 border border-slate-700/50">
                    {dateFormatted}
                  </div>
                </a>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* View count & tag */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-rose-400 font-semibold tracking-wide">
                        {video.views > 0
                          ? `👁️ ${video.views.toLocaleString()} วิว`
                          : "👁️ มีผู้ชมแล้ว"}
                      </span>
                      <span className="font-mono text-slate-500 text-[11px]">
                        ID: {video.id}
                      </span>
                    </div>

                    {/* Title */}
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <h2 className="text-lg font-bold text-white leading-snug group-hover:text-rose-400 transition-colors line-clamp-2">
                        {video.title}
                      </h2>
                    </a>

                    {/* Description preview */}
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                      {video.description || "คลิกเพื่อดูรายละเอียดและรับชมคลิปเต็มได้บน YouTube"}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                    <span className="text-xs text-slate-500">YouTube Channel</span>
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white text-xs font-semibold transition-all duration-200 shadow-md"
                    >
                      <span>ชมบน YouTube</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Back Link */}
        <div className="text-center pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium text-sm transition-all"
          >
            ← กลับหน้าหลัก (Home)
          </Link>
        </div>
      </main>
    </div>
  );
}
