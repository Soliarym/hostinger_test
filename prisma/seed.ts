import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialProducts = [
  {
    id: 1,
    name: "สว่านไร้สาย 20V",
    price: 2490,
    description: "สว่านไร้สายแรงบิดสูง 20V มาพร้อมแบตเตอรี่ 2 ก้อนและแท่นชาร์จเร็ว เหมาะสำหรับงานเจาะไม้ เหล็ก และปูน",
    category: "เครื่องมือไฟฟ้า",
    inStock: true,
    specifications: JSON.stringify({
      "แรงดันไฟฟ้า": "20V",
      "ความเร็วรอบ": "0-1500 RPM",
      "ขนาดหัวจับ": "10 mm",
      "น้ำหนัก": "1.2 kg"
    }),
  },
  {
    id: 2,
    name: "ชุดไขควงแม่เหล็ก 32 ชิ้น",
    price: 590,
    description: "ชุดหัวไขควงแม่เหล็กความแม่นยำสูง 32 ชิ้น พร้อมด้ามจับกันลื่น บรรจุในกล่องพลาสติกแข็งแรงทนทาน",
    category: "เครื่องมือช่างทั่วไป",
    inStock: true,
    specifications: JSON.stringify({
      "จำนวน": "32 ชิ้น",
      "วัสดุ": "เหล็ก CR-V",
      "ชนิดหัว": "PH, PZ, SL, Torx",
      "น้ำหนัก": "0.4 kg"
    }),
  },
  {
    id: 3,
    name: "เครื่องเจียร์ไฟฟ้า 4 นิ้ว",
    price: 1850,
    description: "เครื่องเจียร์มอเตอร์กำลังสูง 850W ระบายความร้อนได้ดี รองรับงานตัดและเจียร์โลหะ ปลอดภัยด้วยสวิตช์เซฟตี้",
    category: "เครื่องมือไฟฟ้า",
    inStock: true,
    specifications: JSON.stringify({
      "กำลังไฟฟ้า": "850W",
      "ขนาดใบเจียร์": "4 นิ้ว (100mm)",
      "ความเร็วรอบ": "11000 RPM",
      "น้ำหนัก": "1.8 kg"
    }),
  },
  {
    id: 4,
    name: "ตลับเมตรดิจิทัล 5 เมตร",
    price: 420,
    description: "ตลับเมตรความยาว 5 เมตร พร้อมจอแสดงผลดิจิทัล อ่านค่าง่าย แม่นยำระดับมิลลิเมตร มีปุ่มล็อกสายวัด",
    category: "เครื่องมือวัด",
    inStock: true,
    specifications: JSON.stringify({
      "ความยาว": "5 เมตร",
      "หน่วยวัด": "cm / inch / mm",
      "แบตเตอรี่": "CR2032",
      "หน้าจอ": "LCD"
    }),
  },
  {
    id: 5,
    name: "ค้อนเหล็กหุน 16 ออนซ์",
    price: 350,
    description: "ค้อนหุนเหล็กกล้าคาร์บอนสูง ด้ามจับไฟเบอร์กลาสหุ้มยาง จับกระชับมือ ลดแรงสั่นสะเทือนขณะใช้งาน",
    category: "เครื่องมือช่างทั่วไป",
    inStock: true,
    specifications: JSON.stringify({
      "น้ำหนักหัวค้อน": "16 oz (450g)",
      "วัสดุด้าม": "Fiberglass + Rubber",
      "ความยาวรวม": "33 cm"
    }),
  },
  {
    id: 6,
    name: "เลื่อยวงเดือน 7 นิ้ว",
    price: 3200,
    description: "เลื่อยวงเดือนกำลังไฟ 1400W ปรับระดับความลึกและมุมตัดได้ถึง 45 องศา พร้อมการ์ดป้องกันใบเลื่อย",
    category: "เครื่องมือไฟฟ้า",
    inStock: true,
    specifications: JSON.stringify({
      "กำลังไฟฟ้า": "1400W",
      "ขนาดใบเลื่อย": "7 นิ้ว (185mm)",
      "ความเร็วรอบ": "5000 RPM",
      "น้ำหนัก": "3.9 kg"
    }),
  },
  {
    id: 7,
    name: "ประแจปอนด์ปรับตั้งได้",
    price: 1490,
    description: "ประแจวัดแรงบิดขนาด 1/2 นิ้ว ปรับตั้งค่าปอนด์ได้แม่นยำ พร้อมระบบคลิกแจ้งเตือนเมื่อถึงค่าที่ตั้งไว้",
    category: "เครื่องมือช่างยนต์",
    inStock: true,
    specifications: JSON.stringify({
      "ขนาดด้าม": "1/2 นิ้ว",
      "ช่วงแรงบิด": "28-210 N.m",
      "ความยาว": "46.5 cm",
      "วัสดุ": "Chrome Vanadium"
    }),
  },
  {
    id: 8,
    name: "คีมล็อกปากตรง 10 นิ้ว",
    price: 380,
    description: "คีมล็อกปากตรงเหล็กโครมวานาเดียม ปรับระดับความแน่นด้วยสกรูท้ายด้าม ปลดล็อกง่ายด้วยคันปลด",
    category: "เครื่องมือช่างทั่วไป",
    inStock: true,
    specifications: JSON.stringify({
      "ขนาด": "10 นิ้ว",
      "ประเภทปาก": "ปากตรง",
      "วัสดุ": "Chrome Vanadium Steel"
    }),
  },
  {
    id: 9,
    name: "เครื่องฉีดน้ำแรงดันสูง 140 Bar",
    price: 4500,
    description: "เครื่องฉีดน้ำแรงดันสูง 140 Bar เหมาะสำหรับล้างรถ ล้างพื้น คราบฝังลึก มอเตอร์เหนี่ยวนำเสียงเงียบและทนทาน",
    category: "อุปกรณ์ทำความสะอาด",
    inStock: true,
    specifications: JSON.stringify({
      "แรงดันสูงสุด": "140 Bar",
      "กำลังมอเตอร์": "1800W",
      "อัตราการไหล": "6.5 L/min",
      "ความยาวสาย": "8 เมตร"
    }),
  },
  {
    id: 10,
    name: "กล่องเก็บเครื่องมือช่าง 3 ชั้น",
    price: 990,
    description: "กล่องเหล็กเก็บเครื่องมือแบบ 3 ชั้น แบบกางออกได้ แข็งแรงทนทาน มีช่องแบ่งสัดส่วน ชัดเจน ล็อกได้",
    category: "อุปกรณ์จัดเก็บ",
    inStock: true,
    specifications: JSON.stringify({
      "ขนาด": "42 x 20 x 20 cm",
      "จำนวนชั้น": "3 ชั้น 5 ถาด",
      "วัสดุ": "เหล็กพ่นสีกันสนิม"
    }),
  },
];

async function main() {
  console.log("Seeding SQLite database...");
  for (const item of initialProducts) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
  const count = await prisma.product.count();
  console.log(`Successfully seeded ${count} products into SQLite.`);

  // Seed default admin user
  const adminUser = await prisma.user.upsert({
    where: { username: "admin" },
    update: {
      password: "admin",
      email: "admin@example.com",
      role: "admin",
    },
    create: {
      username: "admin",
      password: "admin",
      email: "admin@example.com",
      role: "admin",
    },
  });
  console.log(`Successfully seeded default admin user: ${adminUser.username} (role: ${adminUser.role})`);
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
