// src/data/workPermitData.ts
import { IWorkPermit } from '../interfaces/workPermit.interface';

// ข้อมูลใบอนุญาตทำงานแต่ละรายการถูกรวมอยู่ในอ็อบเจกต์บุคลากรใน staffData.ts แล้ว
// ไฟล์นี้มีไว้เพื่อให้ครบตามโครงสร้างที่ร้องขอ แต่โดยปกติแล้วข้อมูลจะถูกเข้าถึงผ่าน staff.work_permit
export const allWorkPermitData: IWorkPermit[] = [];