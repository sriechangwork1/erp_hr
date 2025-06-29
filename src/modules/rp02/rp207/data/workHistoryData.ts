// src/data/workHistoryData.ts
import { IWorkHistory } from '../interfaces/workHistory.interface';

// ข้อมูลประวัติการทำงานแต่ละรายการถูกรวมอยู่ในอ็อบเจกต์บุคลากรใน staffData.ts แล้ว
// ไฟล์นี้มีไว้เพื่อให้ครบตามโครงสร้างที่ร้องขอ แต่โดยปกติแล้วข้อมูลจะถูกเข้าถึงผ่าน staff.work_history
export const allWorkHistoryData: IWorkHistory[] = [];