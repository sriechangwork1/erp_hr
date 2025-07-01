//crm/data/org_data.ts
export const faculties = [
  { FACULTYID: "1", FACULTYNAME: "สำนักงานอธิการบดี-กองบริหารงานทั่วไป" },
  { FACULTYID: "2", FACULTYNAME: "สำนักงานอธิการบดี-กองนโยบายและแผน" },
  { FACULTYID: "3", FACULTYNAME: "สำนักงานอธิการบดี-กองพัฒนานักศึกษา" },
  { FACULTYID: "4", FACULTYNAME: "คณะวิทยาศาสตร์" },
  { FACULTYID: "5", FACULTYNAME: "คณะวิศวกรรมศาสตร์" },
  { FACULTYID: "6", FACULTYNAME: "คณะมนุษยศาสตร์และสังคมศาสตร์" },
  { FACULTYID: "7", FACULTYNAME: "คณะแพทยศาสตร์" },
  { FACULTYID: "8", FACULTYNAME: "คณะพยาบาลศาสตร์" },
  { FACULTYID: "9", FACULTYNAME: "คณะสัตวแพทยศาสตร์" },
  { FACULTYID: "10", FACULTYNAME: "วิทยาลัยการปกครองท้องถิ่น" },
];

export const departments = [
  { DEPARTMENTID: "101", DEPARTMENTNAME: "งานธุรการ", FACULTYID: "1" },
  { DEPARTMENTID: "102", DEPARTMENTNAME: "งานการเงินและบัญชี", FACULTYID: "1" },
  { DEPARTMENTID: "201", DEPARTMENTNAME: "แผนยุทธศาสตร์", FACULTYID: "2" },
  { DEPARTMENTID: "301", DEPARTMENTNAME: "กิจการนักศึกษา", FACULTYID: "3" },
  { DEPARTMENTID: "401", DEPARTMENTNAME: "ภาควิชาฟิสิกส์", FACULTYID: "4" },
  { DEPARTMENTID: "402", DEPARTMENTNAME: "ภาควิชาเคมี", FACULTYID: "4" },
  { DEPARTMENTID: "501", DEPARTMENTNAME: "ภาควิชาวิศวกรรมโยธา", FACULTYID: "5" },
];

export const positions = [
  { POSITIONID: "P001", POSITIONNAME: "อธิการบดี", POSITIONTYPE: "ผู้บริหาร" },
  { POSITIONID: "P002", POSITIONNAME: "รองอธิการบดี", POSITIONTYPE: "ผู้บริหาร" },
  { POSITIONID: "P003", POSITIONNAME: "คณบดี", POSITIONTYPE: "ผู้บริหาร" },
  { POSITIONID: "P004", POSITIONNAME: "ผู้อำนวยการกอง", POSITIONTYPE: "ผู้บริหาร" },
  { POSITIONID: "P005", POSITIONNAME: "นักวิเคราะห์นโยบายและแผน", POSITIONTYPE: "สายสนับสนุน" },
  { POSITIONID: "P006", POSITIONNAME: "นักวิชาการศึกษา", POSITIONTYPE: "สายสนับสนุน" },
  { POSITIONID: "P007", POSITIONNAME: "อาจารย์", POSITIONTYPE: "สายวิชาการ" },
  { POSITIONID: "P008", POSITIONNAME: "ผู้ช่วยศาสตราจารย์", POSITIONTYPE: "สายวิชาการ" },
  { POSITIONID: "P009", POSITIONNAME: "พยาบาลวิชาชีพ", POSITIONTYPE: "สายวิชาชีพเฉพาะ" },
  { POSITIONID: "P010", POSITIONNAME: "นักทรัพยากรบุคคล", POSITIONTYPE: "สายสนับสนุน" },
];

export const positionLines = [
  { LINEID: "L001", LINENAME: "สายงานผู้บริหาร" },
  { LINEID: "L002", LINENAME: "สายงานวิชาการ" },
  { LINEID: "L003", LINENAME: "สายงานสนับสนุน" },
  { LINEID: "L004", LINENAME: "สายงานวิชาชีพเฉพาะ" },
];