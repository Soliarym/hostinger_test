/**
 * Helper ฟังก์ชันสำหรับจัดการและจัดรูปแบบวันเวลา (Internal Private Utility)
 * ไฟล์นี้อยู่ภายใน Private Folder `src/app/_lib/` 
 * ซึ่งจะไม่สามารถถูกเข้าถึงโดยตรงผ่าน URL Route ได้
 */

export function formatThaiDate(dateInput: Date | string | number = new Date()): string {
  const date = typeof dateInput === "object" ? dateInput : new Date(dateInput);

  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const thaiDays = [
    "วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"
  ];

  const dayOfWeek = thaiDays[date.getDay()];
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543; // แปลง ค.ศ. เป็น พ.ศ.
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${dayOfWeek}ที่ ${day} ${month} พ.ศ. ${year} เวลา ${hours}:${minutes} น.`;
}

export function formatShortThaiDate(dateInput: Date | string | number = new Date()): string {
  const date = typeof dateInput === "object" ? dateInput : new Date(dateInput);

  const shortMonths = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ];

  const day = date.getDate();
  const month = shortMonths[date.getMonth()];
  const year = (date.getFullYear() + 543).toString().slice(-2);

  return `${day} ${month} ${year}`;
}

export function getPrivateFolderInfo() {
  return {
    feature: "Next.js App Router Private Folders",
    pattern: "_folderName",
    isRoutable: false,
    purpose: "จัดเก็บ helper libraries, UI components หรือ business logic ภายใน โดยไม่เปิดให้เข้าถึงผ่าน URL",
  };
}
