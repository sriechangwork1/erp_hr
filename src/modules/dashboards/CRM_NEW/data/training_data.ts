// src/crm/data/training_data.ts

export const trainings = [
  {
    TRAININGID: "TRN001",
    TRAININGNAME: "หลักสูตรผู้นำยุคดิจิทัล",
    STARTDATE: "2025-01-20",
    ENDDATE: "2025-01-22",
    DURATION_DAYS: 3,
    ORGANIZER: "สำนักงาน ก.พ.",
    CATEGORY: "พัฒนาทักษะการบริหาร",
  },
  {
    TRAININGID: "TRN002",
    TRAININGNAME: "เทคนิคการสอนออนไลน์",
    STARTDATE: "2025-03-01",
    ENDDATE: "2025-03-01",
    DURATION_DAYS: 1,
    ORGANIZER: "ศูนย์นวัตกรรมการเรียนรู้",
    CATEGORY: "พัฒนาทักษะการสอน",
  },
  {
    TRAININGID: "TRN003",
    TRAININGNAME: "การใช้โปรแกรมบัญชีใหม่",
    STARTDATE: "2025-04-10",
    ENDDATE: "2025-04-11",
    DURATION_DAYS: 2,
    ORGANIZER: "กองการเงินและบัญชี",
    CATEGORY: "พัฒนาทักษะเฉพาะด้าน",
  },
];

export const trainingAttendances = [
  { TRAININGID: "TRN001", PERSONNELID: "PSN001", ATTENDED: true, EVALUATION_SCORE: 90 },
  { TRAININGID: "TRN001", PERSONNELID: "PSN005", ATTENDED: true, EVALUATION_SCORE: 85 },
  { TRAININGID: "TRN002", PERSONNELID: "PSN002", ATTENDED: true, EVALUATION_SCORE: 92 },
  { TRAININGID: "TRN002", PERSONNELID: "PSN004", ATTENDED: true, EVALUATION_SCORE: 88 },
  { TRAININGID: "TRN003", PERSONNELID: "PSN003", ATTENDED: true, EVALUATION_SCORE: 78 },
  { TRAININGID: "TRN003", PERSONNELID: "PSN001", ATTENDED: false, EVALUATION_SCORE: null }, // ไม่ได้เข้าอบรม
];