// src/data/educationData.ts
import { IEducation } from '../interfaces/education.interface';

// ข้อมูลการศึกษาแต่ละรายการถูกรวมอยู่ในอ็อบเจกต์บุคลากรใน staffData.ts แล้ว
// ไฟล์นี้มีไว้เพื่อให้ครบตามโครงสร้างที่ร้องขอ แต่โดยปกติแล้วข้อมูลจะถูกเข้าถึงผ่าน staff.education
export const allEducationData: IEducation[] = [];