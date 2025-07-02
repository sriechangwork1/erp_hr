// src/data/academicExpertiseData.ts
import { IAcademicExpertise } from '../interfaces/academicExpertise.interface';

// ข้อมูลความเชี่ยวชาญทางวิชาการแต่ละรายการถูกรวมอยู่ในอ็อบเจกต์บุคลากรใน staffData.ts แล้ว
// ไฟล์นี้มีไว้เพื่อให้ครบตามโครงสร้างที่ร้องขอ แต่โดยปกติแล้วข้อมูลจะถูกเข้าถึงผ่าน staff.academic_expertise
export const allAcademicExpertiseData: IAcademicExpertise[] = [];