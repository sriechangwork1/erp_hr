export interface StaffData {
  ds2001_id: number;
  academic_year: string;
  semester: string;
  univ_id: string;
  citizen_id: string;
  prefix_name_id: string;
  stf_fname: string;
  stf_mname: string;
  stf_lname: string;
  stf_fname_en: string;
  stf_mname_en: string;
  stf_lname_en: string;
  gender_id: string;
  birthday: string;
  homeadd: string;
  moo: string;
  street: string;
  sub_district_id: string;
  telephone: string;
  email: string;
  zipcode: string;
  nationality_id: string;
  stafftype_id: string;
  time_contact_id: string;
  budget_id: string;
  substafftype_id: string;
  admin_position_id: string;
  academicstanding_id: string;
  positionlevel_id: string;
  position_id: string;
  position_type_id: string;
  class_id: string;
  class_code: string;
  faculty_id: string;
  department_id: string;
  division_id: string;
  section_id: string;
  work_status_id: string;
  tax_status_id: string;
  salary: string;
  pos_no: string;
  appointed_date: string;
  retired_date: string;
  status_id: string;
  verification_status: 'verified' | 'pending' | 'rejected'; // สถานะการตรวจสอบ
}

// ข้อมูลบุคลากรจำลอง (จากข้อมูลที่คุณให้มา)
export const allStaffData: StaffData[] = [
  {
    "ds2001_id": 1, "academic_year": "2567", "semester": "2", "univ_id": "2600", "citizen_id": "3659900046195", "prefix_name_id": "3", "stf_fname": "ธวัชชัย", "stf_mname": "", "stf_lname": "ศุภดิษฐ์", "stf_fname_en": "Tawadchai", "stf_mname_en": "", "stf_lname_en": "Suppadit", "gender_id": "1", "birthday": "1968-06-04", "homeadd": "91/136", "moo": "2", "street": "วัดเปรมประชากร", "sub_district_id": "130111", "telephone": "0811234567", "email": "stawadchai@gmail.com", "zipcode": "12120", "nationality_id": "TH", "stafftype_id": "1", "time_contact_id": "1", "budget_id": "1", "substafftype_id": "1", "admin_position_id": "0", "academicstanding_id": "-", "positionlevel_id": "4", "position_id": "211", "position_type_id": "1", "class_id": "1", "class_code": "1", "faculty_id": "65", "department_id": "165", "division_id": "0", "section_id": "0", "work_status_id": "1", "tax_status_id": "1", "salary": "0", "pos_no": "1", "appointed_date": "2013-05-01", "retired_date": "2028-09-30", "status_id": "1", "verification_status": "verified"
  },
  {
    "ds2001_id": 2, "academic_year": "2567", "semester": "2", "univ_id": "2600", "citizen_id": "1659900018501", "prefix_name_id": "3", "stf_fname": "พิเชษฐ", "stf_mname": "", "stf_lname": "วิริยะ", "stf_fname_en": "Pichet", "stf_mname_en": "", "stf_lname_en": "Wiriya", "gender_id": "1", "birthday": "1972-03-24", "homeadd": "91", "moo": "1", "street": "ราชพฤกษ์", "sub_district_id": "100401", "telephone": "0822345678", "email": "pichet.wiriya@hotmail.com", "zipcode": "10160", "nationality_id": "TH", "stafftype_id": "1", "time_contact_id": "1", "budget_id": "1", "substafftype_id": "1", "admin_position_id": "0", "academicstanding_id": "-", "positionlevel_id": "4", "position_id": "211", "position_type_id": "1", "class_id": "1", "class_code": "1", "faculty_id": "65", "department_id": "165", "division_id": "0", "section_id": "0", "work_status_id": "1", "tax_status_id": "1", "salary": "0", "pos_no": "2", "appointed_date": "2013-05-01", "retired_date": "2032-09-30", "status_id": "1", "verification_status": "verified"
  },
  {
    "ds2001_id": 3, "academic_year": "2568", "semester": "2", "univ_id": "2600", "citizen_id": "3659900046196", "prefix_name_id": "3", "stf_fname": "สมชาย", "stf_mname": "", "stf_lname": "ใจดี", "stf_fname_en": "Somchai", "stf_mname_en": "", "stf_lname_en": "Jaidee", "gender_id": "1", "birthday": "1970-01-01", "homeadd": "123", "moo": "5", "street": "สุขุมวิท", "sub_district_id": "101101", "telephone": "0813334444", "email": "somchai@example.com", "zipcode": "10110", "nationality_id": "TH", "stafftype_id": "1", "time_contact_id": "1", "budget_id": "1", "substafftype_id": "1", "admin_position_id": "0", "academicstanding_id": "-", "positionlevel_id": "4", "position_id": "211", "position_type_id": "1", "class_id": "1", "class_code": "1", "faculty_id": "65", "department_id": "165", "division_id": "0", "section_id": "0", "work_status_id": "1", "tax_status_id": "1", "salary": "0", "pos_no": "3", "appointed_date": "2015-03-10", "retired_date": "2030-01-01", "status_id": "1", "verification_status": "pending"
  },
  {
    "ds2001_id": 4, "academic_year": "2569", "semester": "1", "univ_id": "2601", "citizen_id": "4567890123456", "prefix_name_id": "2", "stf_fname": "มาลี", "stf_mname": "", "stf_lname": "งามยิ่ง", "stf_fname_en": "Malee", "stf_mname_en": "", "stf_lname_en": "Namyind", "gender_id": "2", "birthday": "1980-05-15", "homeadd": "45", "moo": "3", "street": "พระราม 9", "sub_district_id": "103101", "telephone": "0987654321", "email": "malee@example.com", "zipcode": "10310", "nationality_id": "TH", "stafftype_id": "2", "time_contact_id": "2", "budget_id": "2", "substafftype_id": "2", "admin_position_id": "0", "academicstanding_id": "-", "positionlevel_id": "3", "position_id": "212", "position_type_id": "2", "class_id": "2", "class_code": "2", "faculty_id": "66", "department_id": "166", "division_id": "0", "section_id": "0", "work_status_id": "1", "tax_status_id": "1", "salary": "0", "pos_no": "4", "appointed_date": "2018-07-20", "retired_date": "2040-05-15", "status_id": "1", "verification_status": "verified"
  },
  {
    "ds2001_id": 5, "academic_year": "2570", "semester": "2", "univ_id": "2600", "citizen_id": "1489900092222", "prefix_name_id": "4", "stf_fname": "มะลิวัลย์", "stf_mname": "", "stf_lname": "สิงห์เสือ", "stf_fname_en": "Maliwan", "stf_mname_en": "", "stf_lname_en": "Singsuea", "gender_id": "2", "birthday": "1989-02-19", "homeadd": "91", "moo": "9", "street": "-", "sub_district_id": "480113", "telephone": "0998765432", "email": "-", "zipcode": "48000", "nationality_id": "TH", "stafftype_id": "5", "time_contact_id": "4", "budget_id": "1", "substafftype_id": "2", "admin_position_id": "0", "academicstanding_id": "-", "positionlevel_id": "3", "position_id": "220", "position_type_id": "3", "class_id": "3", "class_code": "3", "faculty_id": "65", "department_id": "165", "division_id": "0", "section_id": "0", "work_status_id": "1", "tax_status_id": "1", "salary": "0", "pos_no": "5", "appointed_date": "2020-01-01", "retired_date": "2049-02-19", "status_id": "1", "verification_status": "rejected"
  },
  {
    "ds2001_id": 6, "academic_year": "2567", "semester": "1", "univ_id": "2601", "citizen_id": "1234567890123", "prefix_name_id": "1", "stf_fname": "นายแดง", "stf_mname": "", "stf_lname": "ดำ", "stf_fname_en": "Daeng", "stf_mname_en": "", "stf_lname_en": "Dum", "gender_id": "1", "birthday": "1975-08-20", "homeadd": "789", "moo": "10", "street": "พหลโยธิน", "sub_district_id": "102201", "telephone": "0834567890", "email": "daeng.dum@example.com", "zipcode": "10220", "nationality_id": "TH", "stafftype_id": "1", "time_contact_id": "1", "budget_id": "1", "substafftype_id": "1", "admin_position_id": "0", "academicstanding_id": "-", "positionlevel_id": "4", "position_id": "211", "position_type_id": "1", "class_id": "1", "class_code": "1", "faculty_id": "65", "department_id": "165", "division_id": "0", "section_id": "0", "work_status_id": "1", "tax_status_id": "1", "salary": "0", "pos_no": "6", "appointed_date": "2010-01-01", "retired_date": "2035-08-20", "status_id": "1", "verification_status": "verified"
  },
  {
    "ds2001_id": 7, "academic_year": "2568", "semester": "1", "univ_id": "2602", "citizen_id": "9876543210987", "prefix_name_id": "2", "stf_fname": "นางเขียว", "stf_mname": "", "stf_lname": "ขาว", "stf_fname_en": "Khiao", "stf_mname_en": "", "stf_lname_en": "Khao", "gender_id": "2", "birthday": "1985-11-01", "homeadd": "101", "moo": "1", "street": "ลาดพร้าว", "sub_district_id": "103102", "telephone": "0845678901", "email": "khiao.khao@example.com", "zipcode": "10310", "nationality_id": "TH", "stafftype_id": "2", "time_contact_id": "2", "budget_id": "2", "substafftype_id": "2", "admin_position_id": "0", "academicstanding_id": "-", "positionlevel_id": "3", "position_id": "212", "position_type_id": "2", "class_id": "2", "class_code": "2", "faculty_id": "66", "department_id": "166", "division_id": "0", "section_id": "0", "work_status_id": "1", "tax_status_id": "1", "salary": "0", "pos_no": "7", "appointed_date": "2019-04-15", "retired_date": "2045-11-01", "status_id": "1", "verification_status": "pending"
  },
  {
    "ds2001_id": 8, "academic_year": "2569", "semester": "2", "univ_id": "2600", "citizen_id": "1122334455667", "prefix_name_id": "3", "stf_fname": "นายฟ้า", "stf_mname": "", "stf_lname": "ใส", "stf_fname_en": "Fah", "stf_mname_en": "", "stf_lname_en": "Sai", "gender_id": "1", "birthday": "1990-03-03", "homeadd": "202", "moo": "3", "street": "รัชดาภิเษก", "sub_district_id": "103201", "telephone": "0856789012", "email": "fah.sai@example.com", "zipcode": "10320", "nationality_id": "TH", "stafftype_id": "1", "time_contact_id": "1", "budget_id": "1", "substafftype_id": "1", "admin_position_id": "0", "academicstanding_id": "-", "positionlevel_id": "4", "position_id": "211", "position_type_id": "1", "class_id": "1", "class_code": "1", "faculty_id": "65", "department_id": "165", "division_id": "0", "section_id": "0", "work_status_id": "1", "tax_status_id": "1", "salary": "0", "pos_no": "8", "appointed_date": "2021-09-01", "retired_date": "2050-03-03", "status_id": "1", "verification_status": "verified"
  },
  {
    "ds2001_id": 9, "academic_year": "2570", "semester": "2", "univ_id": "2600", "citizen_id": "9988776655443", "prefix_name_id": "4", "stf_fname": "นางสาวม่วง", "stf_mname": "", "stf_lname": "ทอง", "stf_fname_en": "Muang", "stf_mname_en": "", "stf_lname_en": "Thong", "gender_id": "2", "birthday": "1995-12-25", "homeadd": "303", "moo": "5", "street": "เพชรบุรี", "sub_district_id": "104101", "telephone": "0867890123", "email": "muang.thong@example.com", "zipcode": "10410", "nationality_id": "TH", "stafftype_id": "5", "time_contact_id": "4", "budget_id": "1", "substafftype_id": "2", "admin_position_id": "0", "academicstanding_id": "-", "positionlevel_id": "3", "position_id": "220", "position_type_id": "3", "class_id": "3", "class_code": "3", "faculty_id": "65", "department_id": "165", "division_id": "0", "section_id": "0", "work_status_id": "1", "tax_status_id": "1", "salary": "0", "pos_no": "9", "appointed_date": "2023-02-10", "retired_date": "2055-12-25", "status_id": "1", "verification_status": "rejected"
  },
  {
    "ds2001_id": 10, "academic_year": "2567", "semester": "1", "univ_id": "2600", "citizen_id": "1000000000010", "prefix_name_id": "3", "stf_fname": "สมศักดิ์", "stf_mname": "", "stf_lname": "เก่งมาก", "stf_fname_en": "Somsak", "stf_mname_en": "", "stf_lname_en": "Kengmak", "gender_id": "1", "birthday": "1978-07-11", "homeadd": "10", "moo": "1", "street": "ประชาชื่น", "sub_district_id": "101201", "telephone": "0871234567", "email": "somsak.k@example.com", "zipcode": "10120", "nationality_id": "TH", "stafftype_id": "1", "time_contact_id": "1", "budget_id": "1", "substafftype_id": "1", "admin_position_id": "0", "academicstanding_id": "-", "positionlevel_id": "4", "position_id": "211", "position_type_id": "1", "class_id": "1", "class_code": "1", "faculty_id": "65", "department_id": "165", "division_id": "0", "section_id": "0", "work_status_id": "1", "tax_status_id": "1", "salary": "0", "pos_no": "10", "appointed_date": "2012-08-01", "retired_date": "2038-07-11", "status_id": "1", "verification_status": "verified"
  },
  {
    "ds2001_id": 11, "academic_year": "2567", "semester": "2", "univ_id": "2600", "citizen_id": "1000000000011", "prefix_name_id": "2", "stf_fname": "สมศรี", "stf_mname": "", "stf_lname": "รวยมาก", "stf_fname_en": "Somsri", "stf_mname_en": "", "stf_lname_en": "Ruaymak", "gender_id": "2", "birthday": "1982-01-20", "homeadd": "20", "moo": "2", "street": "รามอินทรา", "sub_district_id": "102301", "telephone": "0882345678", "email": "somsri.r@example.com", "zipcode": "10230", "nationality_id": "TH", "stafftype_id": "2", "time_contact_id": "2", "budget_id": "2", "substafftype_id": "2", "admin_position_id": "0", "academicstanding_id": "-", "positionlevel_id": "3", "position_id": "212", "position_type_id": "2", "class_id": "2", "class_code": "2", "faculty_id": "66", "department_id": "166", "division_id": "0", "section_id": "0", "work_status_id": "1", "tax_status_id": "1", "salary": "0", "pos_no": "11", "appointed_date": "2016-03-01", "retired_date": "2042-01-20", "status_id": "1", "verification_status": "verified"
  },
  {
    "ds2001_id": 12, "academic_year": "2568", "semester": "1", "univ_id": "2600", "citizen_id": "1000000000012", "prefix_name_id": "3", "stf_fname": "สุชาติ", "stf_mname": "", "stf_lname": "มีสุข", "stf_fname_en": "Suchart", "stf_mname_en": "", "stf_lname_en": "Meesuk", "gender_id": "1", "birthday": "1975-04-05", "homeadd": "30", "moo": "3", "street": "พหลโยธิน", "sub_district_id": "102401", "telephone": "0893456789", "email": "suchart.m@example.com", "zipcode": "10240", "nationality_id": "TH", "stafftype_id": "1", "time_contact_id": "1", "budget_id": "1", "substafftype_id": "1", "admin_position_id": "0", "academicstanding_id": "-", "positionlevel_id": "4", "position_id": "211", "position_type_id": "1", "class_id": "1", "class_code": "1", "faculty_id": "65", "department_id": "165", "division_id": "0", "section_id": "0", "work_status_id": "1", "tax_status_id": "1", "salary": "0", "pos_no": "12", "appointed_date": "2010-09-15", "retired_date": "2035-04-05", "status_id": "1", "verification_status": "pending"
  },
  {
    "ds2001_id": 13, "academic_year": "2568", "semester": "2", "univ_id": "2600", "citizen_id": "1000000000013", "prefix_name_id": "2", "stf_fname": "สุชาดา", "stf_mname": "", "stf_lname": "โชคดี", "stf_fname_en": "Suchada", "stf_mname_en": "", "stf_lname_en": "Chokdee", "gender_id": "2", "birthday": "1990-06-10", "homeadd": "40", "moo": "4", "street": "ลาดพร้าว", "sub_district_id": "103102", "telephone": "0904567890", "email": "suchada.c@example.com", "zipcode": "10310", "nationality_id": "TH", "stafftype_id": "2", "time_contact_id": "2", "budget_id": "2", "substafftype_id": "2", "admin_position_id": "0", "academicstanding_id": "-", "positionlevel_id": "3", "position_id": "212", "position_type_id": "2", "class_id": "2", "class_code": "2", "faculty_id": "66", "department_id": "166", "division_id": "0", "section_id": "0", "work_status_id": "1", "tax_status_id": "1", "salary": "0", "pos_no": "13", "appointed_date": "2018-11-20", "retired_date": "2050-06-10", "status_id": "1", "verification_status": "verified"
  },
  {
    "ds2001_id": 14, "academic_year": "2569", "semester": "1", "univ_id": "2600", "citizen_id": "1000000000014", "prefix_name_id": "3", "stf_fname": "วีระ", "stf_mname": "", "stf_lname": "รุ่งเรือง", "stf_fname_en": "Weera", "stf_mname_en": "", "stf_lname_en": "Rungruang", "gender_id": "1", "birthday": "1970-09-01", "homeadd": "50", "moo": "5", "street": "สุขุมวิท", "sub_district_id": "101101", "telephone": "0915678901", "email": "weera.r@example.com", "zipcode": "10110", "nationality_id": "TH", "stafftype_id": "1", "time_contact_id": "1", "budget_id": "1", "substafftype_id": "1", "admin_position_id": "0", "academicstanding_id": "-", "positionlevel_id": "4", "position_id": "211", "position_type_id": "1", "class_id": "1", "class_code": "1", "faculty_id": "65", "department_id": "165", "division_id": "0", "section_id": "0", "work_status_id": "1", "tax_status_id": "1", "salary": "0", "pos_no": "14", "appointed_date": "2013-02-28", "retired_date": "2030-09-01", "status_id": "1", "verification_status": "pending"
  },
  {
    "ds2001_id": 15, "academic_year": "2569", "semester": "2", "univ_id": "2600", "citizen_id": "1000000000015", "prefix_name_id": "2", "stf_fname": "วิไล", "stf_mname": "", "stf_lname": "พูนสุข", "stf_fname_en": "Wilai", "stf_mname_en": "", "stf_lname_en": "Poonsuk", "gender_id": "2", "birthday": "1988-10-10", "homeadd": "60", "moo": "6", "street": "พระราม 9", "sub_district_id": "103101", "telephone": "0926789012", "email": "wilai.p@example.com", "zipcode": "10310", "nationality_id": "TH", "stafftype_id": "2", "time_contact_id": "2", "budget_id": "2", "substafftype_id": "2", "admin_position_id": "0", "academicstanding_id": "-", "positionlevel_id": "3", "position_id": "212", "position_type_id": "2", "class_id": "2", "class_code": "2", "faculty_id": "66", "department_id": "166", "division_id": "0", "section_id": "0", "work_status_id": "1", "tax_status_id": "1", "salary": "0", "pos_no": "15", "appointed_date": "2020-05-01", "retired_date": "2048-10-10", "status_id": "1", "verification_status": "verified"
  }
];