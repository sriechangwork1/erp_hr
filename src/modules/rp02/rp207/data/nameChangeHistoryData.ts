// src/data/nameChangeHistoryData.ts
import { INameChangeHistory } from '../interfaces/nameChangeHistory.interface';

// ข้อมูลประวัติการเปลี่ยนชื่อแต่ละรายการถูกรวมอยู่ในอ็อบเจกต์บุคลากรใน staffData.ts แล้ว
// ไฟล์นี้มีไว้เพื่อให้ครบตามโครงสร้างที่ร้องขอ แต่โดยปกติแล้วข้อมูลจะถูกเข้าถึงผ่าน staff.name_change_history
export const allNameChangeHistoryData: INameChangeHistory[] = [];