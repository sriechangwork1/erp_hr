// rp102/index.tsx
'use client';
import React, { useState, useCallback, useMemo } from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import Hr905Table from './Table'; // ตรวจสอบว่าชื่อไฟล์และ path ถูกต้อง
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
// import 'jspdf-autotable-font-loader/font/THSarabunNew'; // อย่าลืมติดตั้งและตั้งค่า Font

// สำหรับ Export Excel
import * as XLSX from 'xlsx';

// --- กำหนดประเภทข้อมูลสำหรับ FacultyData (จาก sys_faculty_202506192125.json) ---
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

// --- กำหนดประเภทข้อมูลสำหรับ StaffingData (จำลองขึ้นมา) ---
interface StaffingData {
  FACULTYID: string; // ผูกกับ FACULTYID ของ FacultyData
  staff_type_officer: number; // ข้าราชการ
  staff_type_university_employee: number; // พนักงานมหาวิทยาลัย
  staff_type_permanent_employee: number; // ลูกจ้างประจำ
  total_staff: number; // รวมทั้งหมด
}

// --- กำหนดประเภทข้อมูลสำหรับข้อมูลรวมที่จะแสดงในตาราง ---
interface CombinedStaffingData extends FacultyData, StaffingData {}

// ข้อมูล FacultyData (จาก sys_faculty_202506192125.json)
const initialFacultyData: FacultyData[] = [
    { "FACULTYID": "1", "FACULTYNAME": "สำนักงานอธิการบดี-กองบริหารงานทั่วไป", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001702", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "2", "FACULTYNAME": "สำนักงานอธิการบดี-กองนโยบายและแผน", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001703", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "3", "FACULTYNAME": "สำนักงานอธิการบดี-กองพัฒนานักศึกษา", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001704", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "4", "FACULTYNAME": "สำนักงานอธิการบดี-กองกลาง", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001705", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "5", "FACULTYNAME": "สำนักงานอธิการบดี-กองอาคารและสถานที่", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001706", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "6", "FACULTYNAME": "สำนักงานอธิการบดี-กองบริหารงานบุคคล", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001707", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "7", "FACULTYNAME": "สำนักงานอธิการบดี-กองวิเทศสัมพันธ์และสื่อสารองค์กร", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001708", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "8", "FACULTYNAME": "สำนักงานอธิการบดี-ศูนย์เทคโนโลยีสารสนเทศ", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001709", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "9", "FACULTYNAME": "สำนักงานอธิการบดี-หน่วยตรวจสอบภายใน", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001710", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "10", "FACULTYNAME": "สำนักงานอธิการบดี-งานนิติการ", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001711", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "11", "FACULTYNAME": "สำนักงานอธิการบดี-กองแผนงาน", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001712", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "12", "FACULTYNAME": "คณะครุศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001713", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "13", "FACULTYNAME": "คณะมนุษยศาสตร์และสังคมศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001714", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "14", "FACULTYNAME": "คณะวิทยาศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001715", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "15", "FACULTYNAME": "คณะวิทยาการจัดการ", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001716", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "16", "FACULTYNAME": "คณะเทคโนโลยีอุตสาหกรรม", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001717", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "17", "FACULTYNAME": "คณะเกษตรศาสตร์และเทคโนโลยี", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001718", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "18", "FACULTYNAME": "คณะนิติศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001719", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "19", "FACULTYNAME": "บัณฑิตวิทยาลัย", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001720", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "20", "FACULTYNAME": "วิทยาลัยการเมืองการปกครอง", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001721", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "21", "FACULTYNAME": "คณะเภสัชศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001722", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "22", "FACULTYNAME": "คณะวิศวกรรมศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001723", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "23", "FACULTYNAME": "คณะพยาบาลศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001724", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "24", "FACULTYNAME": "คณะการท่องเที่ยวและการโรงแรม", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001725", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "25", "FACULTYNAME": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ", "FACULTYNAMEENG": null, "FACULTYTYPEID": 2, "BUILDING": "26001726", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "26", "FACULTYNAME": "สำนักศิลปะและวัฒนธรรม", "FACULTYNAMEENG": null, "FACULTYTYPEID": 2, "BUILDING": "26001727", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "27", "FACULTYNAME": "สถาบันวิจัยและพัฒนา", "FACULTYNAMEENG": null, "FACULTYTYPEID": 2, "BUILDING": "26001728", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "28", "FACULTYNAME": "ศูนย์ภาษา", "FACULTYNAMEENG": null, "FACULTYTYPEID": 2, "BUILDING": "26001729", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "29", "FACULTYNAME": "โรงเรียนสาธิตมหาวิทยาลัยราชภัฏมหาสารคาม", "FACULTYNAMEENG": null, "FACULTYTYPEID": 3, "BUILDING": "26001730", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "30", "FACULTYNAME": "ศูนย์วิทยาศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 2, "BUILDING": "26001731", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "31", "FACULTYNAME": "หน่วยเรือนจำชั่วคราว", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001732", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "32", "FACULTYNAME": "สำนักงานอธิการบดี-กองพัฒนาระบบ", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001733", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "33", "FACULTYNAME": "สำนักงานอธิการบดี-กองงานบริหารงานทั่วไป", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001734", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "34", "FACULTYNAME": "สำนักงานอธิการบดี-งานทะเบียนและประเมินผล", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001735", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "35", "FACULTYNAME": "สำนักงานอธิการบดี-งานพัสดุ", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001736", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "36", "FACULTYNAME": "สำนักงานอธิการบดี-กองนโยบายและแผน", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001737", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "37", "FACULTYNAME": "สำนักงานอธิการบดี-กองคลัง", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001738", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "38", "FACULTYNAME": "สำนักงานอธิการบดี-กองงานบริหารงานทั่วไป", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001739", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "39", "FACULTYNAME": "สำนักงานอธิการบดี-กองคลังและพัสดุ", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001720", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "40", "FACULTYNAME": "มหาวิทยาลัยนครพนม", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" }
];

// ฟังก์ชันจำลองข้อมูลอัตรากำลัง
const generateStaffingData = (facultyId: string): StaffingData => {
  let officer = Math.floor(Math.random() * 50); // สุ่มข้าราชการ 0-49
  let universityEmployee = Math.floor(Math.random() * 70); // สุ่มพนักงานมหาวิทยาลัย 0-69
  let permanentEmployee = Math.floor(Math.random() * 30); // สุ่มลูกจ้างประจำ 0-29

  // เพิ่มความหลากหลายเล็กน้อยสำหรับบางหน่วยงาน
  if (['12', '13', '14', '15'].includes(facultyId)) { // คณะต่างๆ อาจมีอัตราเยอะขึ้น
    officer = Math.floor(Math.random() * 80) + 20; // 20-99
    universityEmployee = Math.floor(Math.random() * 100) + 30; // 30-129
  }
  if (['1', '6', '8'].includes(facultyId)) { // บางสำนักงานอาจมีข้าราชการ/ลูกจ้างประจำเยอะ
    officer = Math.floor(Math.random() * 60) + 10; // 10-69
    permanentEmployee = Math.floor(Math.random() * 40) + 10; // 10-49
  }

  const total = officer + universityEmployee + permanentEmployee;

  return {
    FACULTYID: facultyId,
    staff_type_officer: officer,
    staff_type_university_employee: universityEmployee,
    staff_type_permanent_employee: permanentEmployee,
    total_staff: total,
  };
};

const Hr905Page = () => {
  const { messages } = useIntl();
  const [facultyData] = useState<FacultyData[]>(initialFacultyData);
  const [filterFacultyName, setFilterFacultyName] = useState<string>('');
  const [filterFacultyId, setFilterFacultyId] = useState<string>('');
  const [filterFacultyTypeId, setFilterFacultyTypeId] = useState<string>('');

  // รวมข้อมูล FacultyData กับ StaffingData
  const combinedData: CombinedStaffingData[] = useMemo(() => {
    return facultyData.map(faculty => {
      const staffing = generateStaffingData(faculty.FACULTYID);
      return {
        ...faculty,
        ...staffing,
      };
    });
  }, [facultyData]);

  // สรุปข้อมูลสำหรับ Dashboard
  const summaryData = useMemo(() => {
    const totalUnits = combinedData.length;
    const totalAllStaff = combinedData.reduce((sum, item) => sum + item.total_staff, 0);
    const totalOfficers = combinedData.reduce((sum, item) => sum + item.staff_type_officer, 0);
    const totalUniversityEmployees = combinedData.reduce((sum, item) => sum + item.staff_type_university_employee, 0);
    const totalPermanentEmployees = combinedData.reduce((sum, item) => sum + item.staff_type_permanent_employee, 0);

    return {
      totalUnits,
      totalAllStaff,
      totalOfficers,
      totalUniversityEmployees,
      totalPermanentEmployees,
    };
  }, [combinedData]);

  // ฟังก์ชันสำหรับการดูรายละเอียด
  const handleView = useCallback((data: CombinedStaffingData) => {
    Swal.fire({
      title: 'รายละเอียดอัตรากำลังหน่วยงาน',
      html: `
        <p><strong>รหัสหน่วยงาน:</strong> ${data.FACULTYID}</p>
        <p><strong>ชื่อหน่วยงาน:</strong> ${data.FACULTYNAME}</p>
        <hr/>
        <p><strong>ข้าราชการ:</strong> ${data.staff_type_officer} คน</p>
        <p><strong>พนักงานมหาวิทยาลัย:</strong> ${data.staff_type_university_employee} คน</p>
        <p><strong>ลูกจ้างประจำ:</strong> ${data.staff_type_permanent_employee} คน</p>
        <p><strong>รวมอัตรากำลังทั้งหมด:</strong> ${data.total_staff} คน</p>
        <hr/>
        <p><strong>ประเภทหน่วยงาน ID:</strong> ${data.FACULTYTYPEID}</p>
        <p><strong>เบอร์โทรศัพท์:</strong> ${data.PHONE || '-'}</p>
        <p><strong>อีเมล:</strong> ${data.EMAIL || '-'}</p>
      `,
      icon: 'info',
      confirmButtonText: 'ปิด'
    });
  }, []);

  // กรองข้อมูลตามเงื่อนไขทั้งหมด
  const filteredData = useMemo(() => {
    let currentData = combinedData;

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

    return currentData;
  }, [combinedData, filterFacultyName, filterFacultyId, filterFacultyTypeId]);

  // Handle Copy Table Data
  const handleCopyTable = () => {
    let tableString = '';
    // Headers
    const headers = [
      'รหัสหน่วยงาน', 'ชื่อหน่วยงาน', 'ข้าราชการ', 'พนักงานมหาวิทยาลัย', 'ลูกจ้างประจำ', 'รวมทั้งหมด'
    ];
    tableString += headers.join('\t') + '\n';

    // Data Rows
    filteredData.forEach(row => {
      const rowValues = [
        row.FACULTYID,
        row.FACULTYNAME,
        row.staff_type_officer,
        row.staff_type_university_employee,
        row.staff_type_permanent_employee,
        row.total_staff,
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
    
    // doc.setFont('THSarabunNew');
    // doc.setR2L(false);

    const columns = [
      { header: 'รหัสหน่วยงาน', dataKey: 'FACULTYID' },
      { header: 'ชื่อหน่วยงาน', dataKey: 'FACULTYNAME' },
      { header: 'ข้าราชการ', dataKey: 'staff_type_officer' },
      { header: 'พนักงานมหาวิทยาลัย', dataKey: 'staff_type_university_employee' },
      { header: 'ลูกจ้างประจำ', dataKey: 'staff_type_permanent_employee' },
      { header: 'รวมทั้งหมด', dataKey: 'total_staff' },
    ];

    const rows = filteredData.map(row => ({
      FACULTYID: row.FACULTYID,
      FACULTYNAME: row.FACULTYNAME,
      staff_type_officer: row.staff_type_officer,
      staff_type_university_employee: row.staff_type_university_employee,
      staff_type_permanent_employee: row.staff_type_permanent_employee,
      total_staff: row.total_staff,
    }));

    (doc as any).autoTable({
      head: [columns.map(col => col.header)],
      //body: rows.map(row => columns.map(col => row[col.dataKey as keyof CombinedStaffingData])),
      startY: 20,
      styles: {
        font: 'THSarabunNew',
        fontSize: 8,
      },
      headStyles: {
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
      },
      didDrawPage: (data: any) => {
        doc.text("รายงานอัตรากำลังตามหน่วยงาน", data.settings.margin.left, 10);
      }
    });

    doc.save('รายงานอัตรากำลังตามหน่วยงาน.pdf');
  };

  // Handle Export to Excel
  const handleExportExcel = () => {
    const dataForExcel = filteredData.map(row => ({
      'รหัสหน่วยงาน': row.FACULTYID,
      'ชื่อหน่วยงาน': row.FACULTYNAME,
      'ข้าราชการ': row.staff_type_officer,
      'พนักงานมหาวิทยาลัย': row.staff_type_university_employee,
      'ลูกจ้างประจำ': row.staff_type_permanent_employee,
      'รวมทั้งหมด': row.total_staff,
    }));

    const ws = XLSX.utils.json_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "รายงานอัตรากำลังตามหน่วยงาน");
    XLSX.writeFile(wb, "รายงานอัตรากำลังตามหน่วยงาน.xlsx");
  };

  return (
    <AppCard
      contentStyle={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 8 }}
      title={<IntlMessages id="sidebar.rp01.02" />} 
    >
    <AppsContent>
      <AppInfoView />

      {/* Dashboard/Summary Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <AppCard sx={{ minWidth: 200, flexGrow: 1 }}>
          <Box sx={{ fontSize: 16, color: 'text.secondary', mb: 1 }}>
            รวมหน่วยงานที่มีอัตรากำลัง
          </Box>
          <Box sx={{ fontSize: 24, fontWeight: 'bold' }}>
            {summaryData.totalUnits} หน่วยงาน
          </Box>
        </AppCard>
        <AppCard sx={{ minWidth: 200, flexGrow: 1 }}>
          <Box sx={{ fontSize: 16, color: 'text.secondary', mb: 1 }}>
            รวมข้าราชการทั้งหมด
          </Box>
          <Box sx={{ fontSize: 24, fontWeight: 'bold', color: 'blue' }}>
            {summaryData.totalOfficers} คน
          </Box>
        </AppCard>
        <AppCard sx={{ minWidth: 200, flexGrow: 1 }}>
          <Box sx={{ fontSize: 16, color: 'text.secondary', mb: 1 }}>
            รวมพนักงานมหาวิทยาลัย
          </Box>
          <Box sx={{ fontSize: 24, fontWeight: 'bold', color: 'green' }}>
            {summaryData.totalUniversityEmployees} คน
          </Box>
        </AppCard>
        <AppCard sx={{ minWidth: 200, flexGrow: 1 }}>
          <Box sx={{ fontSize: 16, color: 'text.secondary', mb: 1 }}>
            รวมลูกจ้างประจำ
          </Box>
          <Box sx={{ fontSize: 24, fontWeight: 'bold', color: 'orange' }}>
            {summaryData.totalPermanentEmployees} คน
          </Box>
        </AppCard>
        <AppCard sx={{ minWidth: 200, flexGrow: 1 }}>
          <Box sx={{ fontSize: 16, color: 'text.secondary', mb: 1 }}>
            อัตรากำลังรวมทั้งหมด
          </Box>
          <Box sx={{ fontSize: 24, fontWeight: 'bold', color: 'red' }}>
            {summaryData.totalAllStaff} คน
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
      <Hr905Table
        data={filteredData} // ส่งข้อมูลที่ผ่านการกรองไปให้ตาราง
        onView={handleView}
      />
    </AppsContent>
    </AppCard>
  );
};

export default Hr905Page;