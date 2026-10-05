import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { POKEMON_TYPES, PokemonType, PokemonItem } from "../pokemonData";

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export const metadata = {
  title: "Pokemon Catch-all Segments | Next.js App",
  description: "Next.js Catch-all segments demonstration with 10 Pokemon types and 100 Pokemon",
};

export default async function PokemonCatchAllPage(props: PageProps) {
  const resolvedParams = await props.params;
  const slug = resolvedParams?.slug || [];

  // Determine active type and active pokemon from slug
  // Level 0: /pokemon_list -> default to "water" and "totodile" (as shown in mock)
  // Level 1: /pokemon_list/[type] -> selected type, default to first pokemon of that type
  // Level 2: /pokemon_list/[type]/[pokemon] -> selected type and pokemon
  let activeType: PokemonType = POKEMON_TYPES.find((t) => t.id === "water") || POKEMON_TYPES[0];
  let activePokemon: PokemonItem = activeType.pokemon[0];

  if (slug.length >= 1) {
    const matchedType = POKEMON_TYPES.find(
      (t) => t.id.toLowerCase() === slug[0].toLowerCase()
    );
    if (!matchedType) {
      // If invalid type segment, fallback to first type or 404
      // We gracefully fallback to first type to keep preview alive
      activeType = POKEMON_TYPES[0];
    } else {
      activeType = matchedType;
    }
    // Default pokemon to first in the matched type
    activePokemon = activeType.pokemon[0];
  }

  if (slug.length >= 2) {
    const matchedPokemon = activeType.pokemon.find(
      (p) => p.id.toLowerCase() === slug[1].toLowerCase()
    );
    if (matchedPokemon) {
      activePokemon = matchedPokemon;
    }
  }

  // Construct simulated & actual path
  const currentPath = `/pokemon_list/${activeType.id}/${activePokemon.id}`;
  const displayUrl = `localhost:3000/pokemon_list/${activeType.id}/${activePokemon.id}`;

  return (
    <main className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Catch-all segments
              <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono font-medium">
                [[...slug]]
              </span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              แสดงการทำงานของ Dynamic Catch-all Segments ใน Next.js App Router (10 ธาตุ ธาตุละ 10 ตัว รวม 100 ตัว)
            </p>
          </div>

          {/* Quick Segment Inspector Pill */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-400 font-mono">
            <span className="text-emerald-400">params.slug:</span>
            <span className="text-slate-200">
              {slug.length === 0 ? "[] (Root Default)" : JSON.stringify(slug)}
            </span>
          </div>
        </div>

        {/* Main Grid: Left Type Sidebar | Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 10 Types */}
          <aside className="lg:col-span-3 bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-3 shadow-xl">
            <h2 className="text-xs uppercase font-semibold text-slate-400 tracking-wider px-3 py-2 mb-1">
              เลือกธาตุ (10 Types)
            </h2>
            <nav className="flex flex-col space-y-1" aria-label="Pokemon Types">
              {POKEMON_TYPES.map((type) => {
                const isActive = type.id === activeType.id;
                // Target URL retains first pokemon of that type
                const targetUrl = `/pokemon_list/${type.id}/${type.pokemon[0].id}`;

                return (
                  <Link
                    key={type.id}
                    href={targetUrl}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-slate-800/90 text-white shadow-md border border-slate-700/60 ring-1 ring-slate-600/40"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                    }`}
                  >
                    <span className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-base shrink-0">
                      {type.icon}
                    </span>
                    <span className="truncate">{type.nameTh}</span>
                    <span className="text-xs text-slate-500 ml-auto font-mono">
                      {type.nameEn}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Right Column: Title + Pokemon List & Detail Card */}
          <section className="lg:col-span-9 flex flex-col">
            {/* Title Header above the card */}
            <div className="mb-2 px-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
                <span>ข้อมูลของ {activePokemon.nameTh}</span>
                <span className="text-slate-400 font-normal">({activePokemon.nameEn})</span>
              </h2>
            </div>

            {/* Main Interactive Card */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 sm:p-6 shadow-2xl">
              {/* URL Address Bar Simulator */}
              <div className="mb-6 bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-inner">
                <span className="flex gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </span>
                <span className="text-xs text-slate-500 select-none">URL:</span>
                <code className="text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto whitespace-nowrap">
                  {displayUrl}
                </code>
              </div>

              {/* Sub-layout: Pokemon Sub-list + Detail Info */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Pokemon List in this type (10 Pokemon) */}
                <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-slate-800/80 pb-4 md:pb-0 md:pr-4">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2 flex items-center justify-between">
                    <span>รายชื่อในธาตุนี้</span>
                    <span className="text-[11px] text-slate-500 font-mono">10 ตัว</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {activeType.pokemon.map((poke) => {
                      const isSelected = poke.id === activePokemon.id;
                      const pokeUrl = `/pokemon_list/${activeType.id}/${poke.id}`;

                      return (
                        <Link
                          key={poke.id}
                          href={pokeUrl}
                          className={`text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 flex items-center justify-between ${
                            isSelected
                              ? "bg-slate-800 text-white font-medium shadow-sm border border-slate-700/50"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                          }`}
                        >
                          <span className="truncate">{poke.nameTh}</span>
                          <span className="text-[11px] text-slate-500 font-mono ml-2 shrink-0">
                            #{String(poke.dexNumber).padStart(3, "0")}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Pokemon Detail View */}
                <div className="md:col-span-8 flex flex-col justify-between">
                  <div>
                    {/* Artwork Image Container */}
                    <div className="flex justify-center items-center py-4 bg-slate-950/40 rounded-xl border border-slate-800/50 mb-5 relative min-h-[220px]">
                      {/* Ambient background glow matching type */}
                      <div
                        className={`absolute w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none ${
                          activeType.id === "fire"
                            ? "bg-amber-500"
                            : activeType.id === "water"
                            ? "bg-blue-500"
                            : activeType.id === "grass"
                            ? "bg-emerald-500"
                            : activeType.id === "electric"
                            ? "bg-yellow-400"
                            : activeType.id === "ice"
                            ? "bg-cyan-400"
                            : activeType.id === "fighting"
                            ? "bg-red-600"
                            : activeType.id === "poison"
                            ? "bg-purple-600"
                            : activeType.id === "ground"
                            ? "bg-amber-600"
                            : activeType.id === "flying"
                            ? "bg-sky-400"
                            : "bg-pink-500"
                        }`}
                      />
                      {/* Official Artwork */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activePokemon.imageUrl}
                        alt={`${activePokemon.nameTh} (${activePokemon.nameEn})`}
                        width={210}
                        height={210}
                        className="relative z-10 drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-200 object-contain max-h-[210px]"
                        loading="eager"
                      />
                    </div>

                    {/* Header info */}
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {activePokemon.nameTh} ({activePokemon.nameEn})
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${activeType.badgeClass}`}
                      >
                        {activeType.nameTh}
                      </span>
                    </div>

                    {/* Stats List */}
                    <div className="text-sm text-slate-300 space-y-1.5 mb-4 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-medium">Height:</span>
                        <span>{activePokemon.height}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-medium">Weight:</span>
                        <span>{activePokemon.weight}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-medium">Ability:</span>
                        <span>{activePokemon.ability}</span>
                      </div>
                    </div>

                    {/* Description Box */}
                    <div className="bg-slate-950/50 rounded-xl p-3.5 border border-slate-800/80 text-sm text-slate-300 leading-relaxed">
                      <div className="text-xs font-semibold text-slate-400 mb-1">
                        ข้อมูลของ {activePokemon.nameTh}
                      </div>
                      <p>{activePokemon.description}</p>
                    </div>
                  </div>

                  {/* Catch-all Segments Technical Helper */}
                  <div className="mt-5 pt-4 border-t border-slate-800/70 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Next.js App Router Catch-all Route:</span>
                      <code className="text-slate-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">
                        /pokemon_list/[[...slug]]
                      </code>
                    </div>
                    <div className="font-mono text-slate-400">
                      Segments: {slug.length} (Type: {activeType.id}, Pokemon: {activePokemon.id})
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
