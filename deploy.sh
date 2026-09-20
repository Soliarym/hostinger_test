#!/bin/bash
set -e

echo "=========================================="
echo " Starting Next.js Deployment on VPS "
echo "=========================================="

# 1. ติดตั้ง Dependencies
echo "--> Installing dependencies..."
npm install

# 2. เตรียม SQLite Database ผ่าน Prisma
echo "--> Syncing SQLite database..."
npx prisma db push

# ตรวจสอบว่ามีข้อมูลสินค้าหรือยัง ถ้ายังไม่มีให้ seed
echo "--> Seeding database if empty..."
npx prisma db seed

# 3. Build Production Bundle
echo "--> Building Next.js application..."
npm run build

# 4. Start / Reload แอปพลิเคชันด้วย PM2
echo "--> Restarting application with PM2..."
pm2 reload ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production

# 5. บันทึกสถานะ PM2 ให้เริ่มต้นใหม่อัตโนมัติเวลารีบูตเซิร์ฟเวอร์
pm2 save

echo "=========================================="
echo " Deployment Completed Successfully! "
echo "=========================================="
