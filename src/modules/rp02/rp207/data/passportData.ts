// src/data/passportData.ts
import { IPassport } from '../interfaces/passport.interface';

// ข้อมูลพาสปอร์ตแต่ละรายการถูกรวมอยู่ในอ็อบเจกต์บุคลากรใน staffData.ts แล้ว
// ไฟล์นี้มีไว้เพื่อให้ครบตามโครงสร้างที่ร้องขอ แต่โดยปกติแล้วข้อมูลจะถูกเข้าถึงผ่าน staff.passport
export const allPassportData: IPassport[] = [];