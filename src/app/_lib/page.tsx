/**
 * หน้าเพจทดสอบภายใน Private Folder (`src/app/_lib/page.tsx`)
 * 
 * ⚠️ หมายเหตุสำคัญ:
 * ใน Next.js App Router โฟลเดอร์ใดก็ตามที่ขึ้นต้นด้วยเครื่องหมายขีดล่าง "_" (Underscore)
 * จะถูกกำหนดให้เป็น "Private Folder" โดยอัตโนมัติ
 * 
 * ผลลัพธ์:
 * ถึงแม้จะมีไฟล์ page.tsx นี้อยู่ข้างใน แต่ผู้ใช้จะไม่สามารถเข้าถึงผ่าน URL "/_lib" ได้!
 * หากพยายามเข้าผ่านเบราว์เซอร์ Next.js จะปฏิเสธและดีดไปหน้า 404 Not Found เสมอ
 */

export default function PrivateLibPage() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>🔒 Secret Private Page</h1>
      <p>
        หากคุณสามารถเห็นหน้านี้ผ่าน URL สาธารณะได้ แสดงว่า Private Folder ไม่ทำงาน!
        แต่ในความเป็นจริง Next.js จะไม่มีทาง Route มาที่หน้านี้เด็ดขาด (จะติด 404 เสมอ)
      </p>
    </div>
  );
}
