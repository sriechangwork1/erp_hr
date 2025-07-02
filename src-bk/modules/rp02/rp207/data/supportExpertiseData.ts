// src/data/supportExpertiseData.ts
import { ISupportExpertise } from '../interfaces/supportExpertise.interface';

// ข้อมูลความเชี่ยวชาญด้านการสนับสนุนแต่ละรายการถูกรวมอยู่ในอ็อบเจกต์บุคลากรใน staffData.ts แล้ว
// ไฟล์นี้มีไว้เพื่อให้ครบตามโครงสร้างที่ร้องขอ แต่โดยปกติแล้วข้อมูลจะถูกเข้าถึงผ่าน staff.support_expertise
export const allSupportExpertiseData: ISupportExpertise[] = [];