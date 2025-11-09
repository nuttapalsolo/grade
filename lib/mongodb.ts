import mongoose from 'mongoose';
import { Connection } from 'mongoose'; // นำเข้า Connection Type

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/teacherDB';
if(!MONGODB_URI) throw new Error('MONGODB_URI not set');

// **********************************************
// ✅ แก้ไข: กำหนด Type ที่ชัดเจนสำหรับ Cache Object
// **********************************************

// 1. สร้าง Type สำหรับ Cache Object
type MongooseCache = {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

// 2. ประกาศ Type สำหรับ GlobalThis
declare global {
  var _mongoose: MongooseCache | undefined;
}

// 3. ตรวจสอบและกำหนดค่าเริ่มต้นให้กับ Global Cache
if (!globalThis._mongoose) {
    globalThis._mongoose = { conn: null, promise: null };
}

// 4. กำหนดตัวแปร local 'cached' โดยให้ Type เป็น MongooseCache ที่แน่นอน (ไม่ใช่ undefined)
const cached: MongooseCache = globalThis._mongoose;

export async function connectDB(){
  // บรรทัดนี้จะไม่มี error อีกต่อไป เพราะ cached ถูกรับประกันว่าเป็น MongooseCache
  if(cached.conn) return cached.conn; 

  // ป้องกันการเรียก Promise ซ้ำ
  if(!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(m => {
      return m.connection;
    });
  }

  // รอดำเนินการ Promise ที่เก็บไว้
  cached.conn = await cached.promise;
  return cached.conn;
}