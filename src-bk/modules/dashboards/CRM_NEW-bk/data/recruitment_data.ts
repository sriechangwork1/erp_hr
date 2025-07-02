//crm/data/recruitment_data.ts
export const jobVacancies = [
  {
    VACANCYID: "VCN001",
    POSITIONID: "P007",
    POSITIONNAME: "อาจารย์",
    FACULTYID: "4",
    DEPARTMENTID: "401",
    OPEN_DATE: "2025-05-01",
    CLOSE_DATE: "2025-06-30",
    STATUS: "เปิดรับสมัคร",
    NUM_REQUIRED: 2,
  },
  {
    VACANCYID: "VCN002",
    POSITIONID: "P005",
    POSITIONNAME: "นักวิเคราะห์นโยบายและแผน",
    FACULTYID: "1",
    DEPARTMENTID: "102",
    OPEN_DATE: "2025-04-15",
    CLOSE_DATE: "2025-05-31",
    STATUS: "ปิดรับสมัคร",
    NUM_REQUIRED: 1,
  },
  {
    VACANCYID: "VCN003",
    POSITIONID: "P010",
    POSITIONNAME: "นักทรัพยากรบุคคล",
    FACULTYID: "1",
    DEPARTMENTID: "101",
    OPEN_DATE: "2025-06-01",
    CLOSE_DATE: "2025-07-15",
    STATUS: "เปิดรับสมัคร",
    NUM_REQUIRED: 1,
  },
  {
    VACANCYID: "VCN004",
    POSITIONID: "P007",
    POSITIONNAME: "อาจารย์",
    FACULTYID: "5",
    DEPARTMENTID: "501",
    OPEN_DATE: "2025-03-01",
    CLOSE_DATE: "2025-03-31",
    STATUS: "บรรจุแล้ว",
    NUM_REQUIRED: 1,
  },
];

export const applications = [
  { APPID: "APP001", VACANCYID: "VCN001", APPLICANT_NAME: "นาย ก", STATUS: "สัมภาษณ์" },
  { APPID: "APP002", VACANCYID: "VCN001", APPLICANT_NAME: "นางสาว ข", STATUS: "คัดเลือกเอกสาร" },
  { APPID: "APP003", VACANCYID: "VCN002", APPLICANT_NAME: "นาย ค", STATUS: "ผ่านการคัดเลือก" },
  { APPID: "APP004", VACANCYID: "VCN003", APPLICANT_NAME: "นาง ง", STATUS: "คัดเลือกเอกสาร" },
  { APPID: "APP005", VACANCYID: "VCN004", APPLICANT_NAME: "นาย จ", STATUS: "บรรจุแล้ว" },
];

export const turnoverRates = [
  { YEAR_MONTH: "2024-12", EMP_START: 1000, EMP_END: 990, HIRED: 10, SEPARATED: 20, TURNOVER_RATE: 2.0 },
  { YEAR_MONTH: "2025-01", EMP_START: 990, EMP_END: 995, HIRED: 15, SEPARATED: 10, TURNOVER_RATE: 1.0 },
  { YEAR_MONTH: "2025-02", EMP_START: 995, EMP_END: 992, HIRED: 7, SEPARATED: 10, TURNOVER_RATE: 1.0 },
  { YEAR_MONTH: "2025-03", EMP_START: 992, EMP_END: 998, HIRED: 10, SEPARATED: 4, TURNOVER_RATE: 0.4 },
  { YEAR_MONTH: "2025-04", EMP_START: 998, EMP_END: 996, HIRED: 5, SEPARATED: 7, TURNOVER_RATE: 0.7 },
  { YEAR_MONTH: "2025-05", EMP_START: 996, EMP_END: 1000, HIRED: 10, SEPARATED: 6, TURNOVER_RATE: 0.6 },
];