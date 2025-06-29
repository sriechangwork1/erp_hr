// src/data/salaryData.ts
import { ISalary } from '../interfaces/salary.interface';

// ข้อมูลเงินเดือนแต่ละรายการถูกรวมอยู่ในอ็อบเจกต์บุคลากรใน staffData.ts แล้ว
// ไฟล์นี้มีไว้เพื่อให้ครบตามโครงสร้างที่ร้องขอ แต่โดยปกติแล้วข้อมูลจะถูกเข้าถึงผ่าน staff.salary
export const allSalaryData: ISalary[] = [];