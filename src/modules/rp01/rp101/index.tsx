// rp101/index.tsx
'use client';
import React, { useState, useCallback, useMemo } from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import Rp101Table from './Table'; // ตรวจสอบว่าชื่อไฟล์และ path ถูกต้อง
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';

// สำหรับ Export PDF
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// *** สำคัญมากสำหรับภาษาไทย: ตั้งค่า Font ***
// import 'jspdf-autotable-font-loader/font/THSarabunNew'; // อย่าลืมติดตั้งและตั้งค่า Font

// สำหรับ Export Excel
import * as XLSX from 'xlsx';

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง ---
interface FacultyData {
  FACULTYID: string;
  FACULTYNAME: string;
  FACULTYNAMEENG: string | null;
  FACULTYTYPEID: number;
  BUILDING: string | null;
  SUBDISTRICT: string | null;
  DISTRICT: string | null;
  PROVINCE: string | null;
  POSTCODE: number;
  PHONE: string | null;
  FAX: string | null;
  PHONEIN: string | null;
  EMAIL: string | null;
  FACSTATUS: string | null;
  REMARK: string | null;
  STAFFID: string | null;
  CREATEDATE: string | null;
  BUDGETTYPEID: string | null;
  GROUPID: string | null;
  REF_FAC: string | null;
}

// ข้อมูลเริ่มต้นจากไฟล์ sys_faculty_202506192125.json
const initialFacultyData: FacultyData[] = [
  {
    "FACULTYID": "1",
    "FACULTYNAME": "สำนักงานอธิการบดี-กองบริหารงานทั่วไป",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001702",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "2",
    "FACULTYNAME": "สำนักงานอธิการบดี-กองนโยบายและแผน",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001703",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "3",
    "FACULTYNAME": "สำนักงานอธิการบดี-กองพัฒนานักศึกษา",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001704",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "4",
    "FACULTYNAME": "สำนักงานอธิการบดี-กองกลาง",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001705",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "5",
    "FACULTYNAME": "สำนักงานอธิการบดี-กองอาคารและสถานที่",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001706",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "6",
    "FACULTYNAME": "สำนักงานอธิการบดี-กองบริหารงานบุคคล",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001707",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "7",
    "FACULTYNAME": "สำนักงานอธิการบดี-กองวิเทศสัมพันธ์และสื่อสารองค์กร",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001708",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "8",
    "FACULTYNAME": "สำนักงานอธิการบดี-ศูนย์เทคโนโลยีสารสนเทศ",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001709",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "9",
    "FACULTYNAME": "สำนักงานอธิการบดี-หน่วยตรวจสอบภายใน",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001710",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "10",
    "FACULTYNAME": "สำนักงานอธิการบดี-งานนิติการ",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001711",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "11",
    "FACULTYNAME": "สำนักงานอธิการบดี-กองแผนงาน",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001712",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "12",
    "FACULTYNAME": "คณะครุศาสตร์",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 1,
    "BUILDING": "26001713",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "13",
    "FACULTYNAME": "คณะมนุษยศาสตร์และสังคมศาสตร์",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 1,
    "BUILDING": "26001714",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "14",
    "FACULTYNAME": "คณะวิทยาศาสตร์",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 1,
    "BUILDING": "26001715",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "15",
    "FACULTYNAME": "คณะวิทยาการจัดการ",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 1,
    "BUILDING": "26001716",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "16",
    "FACULTYNAME": "คณะเทคโนโลยีอุตสาหกรรม",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 1,
    "BUILDING": "26001717",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "17",
    "FACULTYNAME": "คณะเกษตรศาสตร์และเทคโนโลยี",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 1,
    "BUILDING": "26001718",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "18",
    "FACULTYNAME": "คณะนิติศาสตร์",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 1,
    "BUILDING": "26001719",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "19",
    "FACULTYNAME": "บัณฑิตวิทยาลัย",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 1,
    "BUILDING": "26001720",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "20",
    "FACULTYNAME": "วิทยาลัยการเมืองการปกครอง",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 1,
    "BUILDING": "26001721",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "21",
    "FACULTYNAME": "คณะเภสัชศาสตร์",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 1,
    "BUILDING": "26001722",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "22",
    "FACULTYNAME": "คณะวิศวกรรมศาสตร์",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 1,
    "BUILDING": "26001723",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "23",
    "FACULTYNAME": "คณะพยาบาลศาสตร์",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 1,
    "BUILDING": "26001724",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "24",
    "FACULTYNAME": "คณะการท่องเที่ยวและการโรงแรม",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 1,
    "BUILDING": "26001725",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "25",
    "FACULTYNAME": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 2,
    "BUILDING": "26001726",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "26",
    "FACULTYNAME": "สำนักศิลปะและวัฒนธรรม",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 2,
    "BUILDING": "26001727",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "27",
    "FACULTYNAME": "สถาบันวิจัยและพัฒนา",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 2,
    "BUILDING": "26001728",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "28",
    "FACULTYNAME": "ศูนย์ภาษา",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 2,
    "BUILDING": "26001729",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "29",
    "FACULTYNAME": "โรงเรียนสาธิตมหาวิทยาลัยราชภัฏมหาสารคาม",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 3,
    "BUILDING": "26001730",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "30",
    "FACULTYNAME": "ศูนย์วิทยาศาสตร์",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 2,
    "BUILDING": "26001731",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "31",
    "FACULTYNAME": "หน่วยเรือนจำชั่วคราว",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001732",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "32",
    "FACULTYNAME": "สำนักงานอธิการบดี-กองพัฒนาระบบ",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001733",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "33",
    "FACULTYNAME": "สำนักงานอธิการบดี-กองงานบริหารงานทั่วไป",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001734",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "34",
    "FACULTYNAME": "สำนักงานอธิการบดี-งานทะเบียนและประเมินผล",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001735",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "35",
    "FACULTYNAME": "สำนักงานอธิการบดี-งานพัสดุ",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001736",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "36",
    "FACULTYNAME": "สำนักงานอธิการบดี-กองนโยบายและแผน",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001737",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "37",
    "FACULTYNAME": "สำนักงานอธิการบดี-กองคลัง",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001738",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "38",
    "FACULTYNAME": "สำนักงานอธิการบดี-กองงานบริหารงานทั่วไป",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001739",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "39",
    "FACULTYNAME": "สำนักงานอธิการบดี-กองคลังและพัสดุ",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": "26001720",
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  },
  {
    "FACULTYID": "40",
    "FACULTYNAME": "มหาวิทยาลัยนครพนม",
    "FACULTYNAMEENG": null,
    "FACULTYTYPEID": 0,
    "BUILDING": null,
    "SUBDISTRICT": null,
    "DISTRICT": null,
    "PROVINCE": null,
    "POSTCODE": 0,
    "PHONE": null,
    "FAX": null,
    "PHONEIN": null,
    "EMAIL": null,
    "FACSTATUS": null,
    "REMARK": null,
    "STAFFID": null,
    "CREATEDATE": null,
    "BUDGETTYPEID": null,
    "GROUPID": null,
    "REF_FAC": "00320"
  }
];


const Rp101Page = () => {
  const { messages } = useIntl();
  const [facultyData] = useState<FacultyData[]>(initialFacultyData);
  const [filterFacultyName, setFilterFacultyName] = useState<string>('');
  const [filterFacultyId, setFilterFacultyId] = useState<string>('');
  const [filterFacultyTypeId, setFilterFacultyTypeId] = useState<string>('');
  const [filterRefFac, setFilterRefFac] = useState<string>('');


  // สรุปข้อมูลสำหรับ Dashboard
  const summaryData = useMemo(() => {
    const totalFaculties = facultyData.length;
    // ตัวอย่างการนับ: จำนวนหน่วยงานที่มีเบอร์โทรศัพท์
    const facultiesWithPhone = facultyData.filter(item => item.PHONE && item.PHONE !== '').length;
    // ตัวอย่างการนับ: จำนวนหน่วยงานที่มี FACULTYTYPEID เป็น 1 (คณะ)
    const facultiesIsType1 = facultyData.filter(item => item.FACULTYTYPEID === 1).length;

    return {
      totalFaculties,
      facultiesWithPhone,
      facultiesIsType1,
    };
  }, [facultyData]);

  // ฟังก์ชันสำหรับการดูรายละเอียด
  const handleView = useCallback((data: FacultyData) => {
    Swal.fire({
      title: 'รายละเอียดหน่วยงาน',
      html: `
        <p><strong>รหัสหน่วยงาน:</strong> ${data.FACULTYID}</p>
        <p><strong>ชื่อหน่วยงาน:</strong> ${data.FACULTYNAME}</p>
        <p><strong>ชื่อหน่วยงาน (ENG):</strong> ${data.FACULTYNAMEENG || '-'}</p>
        <p><strong>ประเภทหน่วยงาน ID:</strong> ${data.FACULTYTYPEID}</p>
        <p><strong>อาคาร:</strong> ${data.BUILDING || '-'}</p>
        <p><strong>เบอร์โทรศัพท์:</strong> ${data.PHONE || '-'}</p>
        <p><strong>อีเมล:</strong> ${data.EMAIL || '-'}</p>
        <p><strong>รหัสอ้างอิง:</strong> ${data.REF_FAC || '-'}</p>
        <p><strong>สถานะหน่วยงาน:</strong> ${data.FACSTATUS || '-'}</p>
        <p><strong>วันที่สร้าง:</strong> ${data.CREATEDATE || '-'}</p>
        <p><strong>รหัสเจ้าหน้าที่:</strong> ${data.STAFFID || '-'}</p>
      `,
      icon: 'info',
      confirmButtonText: 'ปิด'
    });
  }, []);

  // กรองข้อมูลตามเงื่อนไขทั้งหมด
  const filteredData = useMemo(() => {
    let currentData = facultyData;

    if (filterFacultyName) {
      const lowerCaseFilter = filterFacultyName.toLowerCase();
      currentData = currentData.filter(item =>
        item.FACULTYNAME.toLowerCase().includes(lowerCaseFilter)
      );
    }

    if (filterFacultyId) {
      currentData = currentData.filter(item =>
        String(item.FACULTYID).includes(filterFacultyId)
      );
    }

    if (filterFacultyTypeId) {
      currentData = currentData.filter(item =>
        String(item.FACULTYTYPEID).includes(filterFacultyTypeId)
      );
    }

    if (filterRefFac) {
      currentData = currentData.filter(item =>
        String(item.REF_FAC || '').includes(filterRefFac)
      );
    }

    return currentData;
  }, [facultyData, filterFacultyName, filterFacultyId, filterFacultyTypeId, filterRefFac]);

  // Handle Copy Table Data
  const handleCopyTable = () => {
    let tableString = '';
    // Headers
    const headers = [
      'รหัสหน่วยงาน', 'ชื่อหน่วยงาน', 'ชื่อหน่วยงาน (ENG)', 'ประเภทหน่วยงาน ID',
      'อาคาร', 'เบอร์โทรศัพท์', 'อีเมล', 'รหัสอ้างอิง', 'สถานะ', 'วันที่สร้าง', 'รหัสเจ้าหน้าที่'
    ];
    tableString += headers.join('\t') + '\n';

    // Data Rows
    filteredData.forEach(row => { // ใช้ filteredData
      const rowValues = [
        row.FACULTYID,
        row.FACULTYNAME,
        row.FACULTYNAMEENG || '-',
        row.FACULTYTYPEID,
        row.BUILDING || '-',
        row.PHONE || '-',
        row.EMAIL || '-',
        row.REF_FAC || '-',
        row.FACSTATUS || '-',
        row.CREATEDATE || '-',
        row.STAFFID || '-',
      ];
      tableString += rowValues.join('\t') + '\n';
    });

    navigator.clipboard.writeText(tableString)
      .then(() => {
        Swal.fire('คัดลอกสำเร็จ!', 'ข้อมูลตารางถูกคัดลอกไปยังคลิปบอร์ดแล้ว', 'success');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        Swal.fire('คัดลอกไม่สำเร็จ!', 'ไม่สามารถคัดลอกข้อมูลตารางได้', 'error');
      });
  };

  // Handle Export to PDF
  const handleExportPdf = () => {
    const doc = new jsPDF();
    
    // *** สำคัญสำหรับภาษาไทย: ตั้งค่า Font ***
    // doc.setFont('THSarabunNew'); // ยกเลิกคอมเมนต์บรรทัดนี้ถ้าคุณตั้งค่า Font เรียบร้อยแล้ว
    // doc.setR2L(false); // สำหรับภาษาไทยส่วนใหญ่ไม่จำเป็น แต่ถ้ามีปัญหาเรื่องทิศทางข้อความลองใช้ดู

    const columns = [
      { header: 'รหัสหน่วยงาน', dataKey: 'FACULTYID' },
      { header: 'ชื่อหน่วยงาน', dataKey: 'FACULTYNAME' },
      { header: 'ชื่อหน่วยงาน (ENG)', dataKey: 'FACULTYNAMEENG' },
      { header: 'ประเภทหน่วยงาน ID', dataKey: 'FACULTYTYPEID' },
      { header: 'อาคาร', dataKey: 'BUILDING' },
      { header: 'เบอร์โทรศัพท์', dataKey: 'PHONE' },
      { header: 'อีเมล', dataKey: 'EMAIL' },
      /*{ header: 'รหัสอ้างอิง', dataKey: 'REF_FAC' },
      { header: 'สถานะ', dataKey: 'FACSTATUS' },
      { header: 'วันที่สร้าง', dataKey: 'CREATEDATE' },
      { header: 'รหัสเจ้าหน้าที่', dataKey: 'STAFFID' },*/
    ];

    const rows = filteredData.map(row => ({ // ใช้ filteredData
      FACULTYID: row.FACULTYID,
      FACULTYNAME: row.FACULTYNAME,
      FACULTYNAMEENG: row.FACULTYNAMEENG || '-',
      FACULTYTYPEID: row.FACULTYTYPEID,
      BUILDING: row.BUILDING || '-',
      PHONE: row.PHONE || '-',
      EMAIL: row.EMAIL || '-',
      REF_FAC: row.REF_FAC || '-',
      FACSTATUS: row.FACSTATUS || '-',
      CREATEDATE: row.CREATEDATE || '-',
      STAFFID: row.STAFFID || '-',
    }));

    (doc as any).autoTable({
      head: [columns.map(col => col.header)],
      //body: rows.map(row => columns.map(col => row[col.dataKey as keyof FacultyData])),
      startY: 20,
      styles: {
        font: 'THSarabunNew', // ชี้ไปที่ชื่อ Font ที่คุณเพิ่มเข้าไป
        fontSize: 8,
      },
      headStyles: {
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
      },
      didDrawPage: (data: any) => {
        doc.text("รายงานรายชื่อหน่วยงาน", data.settings.margin.left, 10);
      }
    });

    doc.save('รายงานรายชื่อหน่วยงาน.pdf');
  };

  // Handle Export to Excel
  const handleExportExcel = () => {
    const dataForExcel = filteredData.map(row => ({ // ใช้ filteredData
      'รหัสหน่วยงาน': row.FACULTYID,
      'ชื่อหน่วยงาน': row.FACULTYNAME,
      'ชื่อหน่วยงาน (ENG)': row.FACULTYNAMEENG || '-',
      'ประเภทหน่วยงาน ID': row.FACULTYTYPEID,
      'อาคาร': row.BUILDING || '-',
      'เบอร์โทรศัพท์': row.PHONE || '-',
      'อีเมล': row.EMAIL || '-',
    /*  'รหัสอ้างอิง': row.REF_FAC || '-',
      'สถานะ': row.FACSTATUS || '-',
      'วันที่สร้าง': row.CREATEDATE || '-',
      'รหัสเจ้าหน้าที่': row.STAFFID || '-',*/
    }));

    const ws = XLSX.utils.json_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "รายงานรายชื่อหน่วยงาน");
    XLSX.writeFile(wb, "รายงานรายชื่อหน่วยงาน.xlsx");
  };

  return (
    <AppCard
      contentStyle={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 8 }}
      title={<IntlMessages id="sidebar.rp01.01" />} 
    >
    <AppsContent>
      <AppInfoView />

      {/* Dashboard/Summary Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <AppCard sx={{ minWidth: 200, flexGrow: 1 }}>
          <Box sx={{ fontSize: 16, color: 'text.secondary', mb: 1 }}>
            รวมหน่วยงานทั้งหมด
          </Box>
          <Box sx={{ fontSize: 24, fontWeight: 'bold' }}>
            {summaryData.totalFaculties} รายการ
          </Box>
        </AppCard>
        <AppCard sx={{ minWidth: 200, flexGrow: 1 }}>
          <Box sx={{ fontSize: 16, color: 'text.secondary', mb: 1 }}>
            หน่วยงานที่มีเบอร์โทร
          </Box>
          <Box sx={{ fontSize: 24, fontWeight: 'bold', color: 'green' }}>
            {summaryData.facultiesWithPhone} รายการ
          </Box>
        </AppCard>
        <AppCard sx={{ minWidth: 200, flexGrow: 1 }}>
          <Box sx={{ fontSize: 16, color: 'text.secondary', mb: 1 }}>
            ประเภทคณะ (ID 1)
          </Box>
          <Box sx={{ fontSize: 24, fontWeight: 'bold', color: 'orange' }}>
            {summaryData.facultiesIsType1} รายการ
          </Box>
        </AppCard>
      </Box>

      {/* Filter and Export Buttons */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {/* Filter by Faculty Name */}
          <TextField
            label="ชื่อหน่วยงาน"
            value={filterFacultyName}
            onChange={(e) => setFilterFacultyName(e.target.value)}
            sx={{ minWidth: 200 }}
          />
          {/* Filter by Faculty ID */}
          <TextField
            label="รหัสหน่วยงาน"
            value={filterFacultyId}
            onChange={(e) => setFilterFacultyId(e.target.value)}
            sx={{ minWidth: 150 }}
          />
          {/* Filter by Faculty Type ID */}
          <TextField
            label="ประเภทหน่วยงาน ID"
            value={filterFacultyTypeId}
            onChange={(e) => setFilterFacultyTypeId(e.target.value)}
            sx={{ minWidth: 150 }}
          />
          {/* Filter by REF_FAC */}
          <TextField
            label="รหัสอ้างอิง"
            value={filterRefFac}
            onChange={(e) => setFilterRefFac(e.target.value)}
            sx={{ minWidth: 150 }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={handleCopyTable}>
            คัดลอกตาราง
          </Button>
          <Button variant="outlined" onClick={handleExportPdf}>
            ส่งออก PDF
          </Button>
          <Button variant="outlined" onClick={handleExportExcel}>
            ส่งออก Excel
          </Button>
        </Box>
      </Box>

      {/* Table Component */}
      <Rp101Table
        data={filteredData} // ส่งข้อมูลที่ผ่านการกรองไปให้ตาราง
        onView={handleView}
      />
    </AppsContent>
    </AppCard>
  );
};

export default Rp101Page;