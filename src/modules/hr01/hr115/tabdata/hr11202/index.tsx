//hr11202/index.tsx
'use client';
import React, { useState, useMemo } from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AppDialog from '@crema/components/AppDialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import Table from './Table'; // ใช้ Table ของ hr116

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง Nation ---
export interface Data {
  id: string; // nation_id (เป็น string)
  nation_name_th: string;
  nation_name_en: string;
  nation_abb_name: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง Nation
const initialAllRows: Data[] = [
   // Existing data (first few for context)
  { nationality_id: 'CL', nationality_name_th: 'ชิลี', nationality_name_en: 'Chilean', nationality_abb_name: 'CL', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'AF', nationality_name_th: 'อัฟกัน', nationality_name_en: 'Afghan', nationality_abb_name: 'AF', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'AL', nationality_name_th: 'แอลเบเนีย', nationality_name_en: 'Albanian', nationality_abb_name: 'AL', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'DZ', nationality_name_th: 'แอลจีเรีย', nationality_name_en: 'Algerian', nationality_abb_name: 'DZ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'AD', nationality_name_th: 'อันดอร์รา', nationality_name_en: 'Andorran', nationality_abb_name: 'AD', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'AO', nationality_name_th: 'แองโกลา', nationality_name_en: 'Angolan', nationality_abb_name: 'AO', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'AG', nationality_name_th: 'แอนติกาและบาร์บูดา', nationality_name_en: 'Antiguan and Barbudan', nationality_abb_name: 'AG', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'AR', nationality_name_th: 'อาร์เจนตินา', nationality_name_en: 'Argentine', nationality_abb_name: 'AR', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'AM', nationality_name_th: 'อาร์เมเนีย', nationality_name_en: 'Armenian', nationality_abb_name: 'AM', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'AU', nationality_name_th: 'ออสเตรเลีย', nationality_name_en: 'Australian', nationality_abb_name: 'AU', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'AT', nationality_name_th: 'ออสเตรีย', nationality_name_en: 'Austrian', nationality_abb_name: 'AT', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'AZ', nationality_name_th: 'อาเซอร์ไบจาน', nationality_name_en: 'Azerbaijani', nationality_abb_name: 'AZ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BS', nationality_name_th: 'บาฮามาส', nationality_name_en: 'Bahamian', nationality_abb_name: 'BS', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BH', nationality_name_th: 'บาห์เรน', nationality_name_en: 'Bahraini', nationality_abb_name: 'BH', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BD', nationality_name_th: 'บังกลาเทศ', nationality_name_en: 'Bangladeshi', nationality_abb_name: 'BD', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BB', nationality_name_th: 'บาร์เบโดส', nationality_name_en: 'Barbadian', nationality_abb_name: 'BB', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BY', nationality_name_th: 'เบลารุส', nationality_name_en: 'Belarusian', nationality_abb_name: 'BY', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BE', nationality_name_th: 'เบลเยียม', nationality_name_en: 'Belgian', nationality_abb_name: 'BE', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BZ', nationality_name_th: 'เบลีซ', nationality_name_en: 'Belizean', nationality_abb_name: 'BZ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BJ', nationality_name_th: 'เบนิน', nationality_name_en: 'Beninese', nationality_abb_name: 'BJ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BT', nationality_name_th: 'ภูฏาน', nationality_name_en: 'Bhutanese', nationality_abb_name: 'BT', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BO', nationality_name_th: 'โบลิเวีย', nationality_name_en: 'Bolivian', nationality_abb_name: 'BO', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BA', nationality_name_th: 'บอสเนียและเฮอร์เซโกวีนา', nationality_name_en: 'Bosnian and Herzegovinian', nationality_abb_name: 'BA', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BW', nationality_name_th: 'บอตสวานา', nationality_name_en: 'Botswanan', nationality_abb_name: 'BW', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BR', nationality_name_th: 'บราซิล', nationality_name_en: 'Brazilian', nationality_abb_name: 'BR', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BN', nationality_name_th: 'บรูไน', nationality_name_en: 'Bruneian', nationality_abb_name: 'BN', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BG', nationality_name_th: 'บัลแกเรีย', nationality_name_en: 'Bulgarian', nationality_abb_name: 'BG', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BF', nationality_name_th: 'บูร์กินาฟาโซ', nationality_name_en: 'Burkinabe', nationality_abb_name: 'BF', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'BI', nationality_name_th: 'บุรุนดี', nationality_name_en: 'Burundian', nationality_abb_name: 'BI', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'CV', nationality_name_th: 'กาบูเวร์ดี', nationality_name_en: 'Cape Verdean', nationality_abb_name: 'CV', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'KH', nationality_name_th: 'กัมพูชา', nationality_name_en: 'Cambodian', nationality_abb_name: 'KH', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'CM', nationality_name_th: 'แคเมอรูน', nationality_name_en: 'Cameroonian', nationality_abb_name: 'CM', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'CA', nationality_name_th: 'แคนาดา', nationality_name_en: 'Canadian', nationality_abb_name: 'CA', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'CF', nationality_name_th: 'สาธารณรัฐแอฟริกากลาง', nationality_name_en: 'Central African', nationality_abb_name: 'CF', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'TD', nationality_name_th: 'ชาด', nationality_name_en: 'Chadian', nationality_abb_name: 'TD', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'CN', nationality_name_th: 'จีน', nationality_name_en: 'Chinese', nationality_abb_name: 'CN', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'CO', nationality_name_th: 'โคลอมเบีย', nationality_name_en: 'Colombian', nationality_abb_name: 'CO', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'KM', nationality_name_th: 'คอโมโรส', nationality_name_en: 'Comoran', nationality_abb_name: 'KM', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'CD', nationality_name_th: 'คองโก (ประชาธิปไตย)', nationality_name_en: 'Congolese (Democratic)', nationality_abb_name: 'CD', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'CG', nationality_name_th: 'คองโก (สาธารณรัฐ)', nationality_name_en: 'Congolese (Republic)', nationality_abb_name: 'CG', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'CR', nationality_name_th: 'คอสตาริกา', nationality_name_en: 'Costa Rican', nationality_abb_name: 'CR', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'CI', nationality_name_th: 'โกตดิวัวร์', nationality_name_en: 'Ivorian', nationality_abb_name: 'CI', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'HR', nationality_name_th: 'โครเอเชีย', nationality_name_en: 'Croatian', nationality_abb_name: 'HR', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'CU', nationality_name_th: 'คิวบา', nationality_name_en: 'Cuban', nationality_abb_name: 'CU', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'CY', nationality_name_th: 'ไซปรัส', nationality_name_en: 'Cypriot', nationality_abb_name: 'CY', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'CZ', nationality_name_th: 'เช็ก', nationality_name_en: 'Czech', nationality_abb_name: 'CZ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'DK', nationality_name_th: 'เดนมาร์ก', nationality_name_en: 'Danish', nationality_abb_name: 'DK', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'DJ', nationality_name_th: 'จิบูตี', nationality_name_en: 'Djiboutian', nationality_abb_name: 'DJ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'DM', nationality_name_th: 'โดมินิกา', nationality_name_en: 'Dominican', nationality_abb_name: 'DM', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nationality_id: 'DO', nationality_name_th: 'โดมินิกัน', nationality_name_en: 'Dominican (Republic)', nationality_abb_name: 'DO', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  // Additional nationalities
  { nationality_id: 'EC', nationality_name_th: 'เอกวาดอร์', nationality_name_en: 'Ecuadorian', nationality_abb_name: 'EC', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'EG', nationality_name_th: 'อียิปต์', nationality_name_en: 'Egyptian', nationality_abb_name: 'EG', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SV', nationality_name_th: 'เอลซัลวาดอร์', nationality_name_en: 'Salvadoran', nationality_abb_name: 'SV', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'GQ', nationality_name_th: 'อิเควทอเรียลกินี', nationality_name_en: 'Equatorial Guinean', nationality_abb_name: 'GQ', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'ER', nationality_name_th: 'เอริเทรีย', nationality_name_en: 'Eritrean', nationality_abb_name: 'ER', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'EE', nationality_name_th: 'เอสโตเนีย', nationality_name_en: 'Estonian', nationality_abb_name: 'EE', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SZ', nationality_name_th: 'เอสวาตินี', nationality_name_en: 'Swazi', nationality_abb_name: 'SZ', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'ET', nationality_name_th: 'เอธิโอเปีย', nationality_name_en: 'Ethiopian', nationality_abb_name: 'ET', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'FJ', nationality_name_th: 'ฟิจิ', nationality_name_en: 'Fijian', nationality_abb_name: 'FJ', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'FI', nationality_name_th: 'ฟินแลนด์', nationality_name_en: 'Finnish', nationality_abb_name: 'FI', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'FR', nationality_name_th: 'ฝรั่งเศส', nationality_name_en: 'French', nationality_abb_name: 'FR', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'GA', nationality_name_th: 'กาบอง', nationality_name_en: 'Gabonese', nationality_abb_name: 'GA', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'GM', nationality_name_th: 'แกมเบีย', nationality_name_en: 'Gambian', nationality_abb_name: 'GM', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'GE', nationality_name_th: 'จอร์เจีย', nationality_name_en: 'Georgian', nationality_abb_name: 'GE', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'DE', nationality_name_th: 'เยอรมัน', nationality_name_en: 'German', nationality_abb_name: 'DE', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'GH', nationality_name_th: 'กานา', nationality_name_en: 'Ghanaian', nationality_abb_name: 'GH', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'GR', nationality_name_th: 'กรีซ', nationality_name_en: 'Greek', nationality_abb_name: 'GR', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'GD', nationality_name_th: 'เกรเนดา', nationality_name_en: 'Grenadian', nationality_abb_name: 'GD', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'GT', nationality_name_th: 'กัวเตมาลา', nationality_name_en: 'Guatemalan', nationality_abb_name: 'GT', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'GN', nationality_name_th: 'กินี', nationality_name_en: 'Guinean', nationality_abb_name: 'GN', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'GW', nationality_name_th: 'กินี-บิสเซา', nationality_name_en: 'Guinea-Bissau', nationality_abb_name: 'GW', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'GY', nationality_name_th: 'กายอานา', nationality_name_en: 'Guyanese', nationality_abb_name: 'GY', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'HT', nationality_name_th: 'เฮติ', nationality_name_en: 'Haitian', nationality_abb_name: 'HT', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'HN', nationality_name_th: 'ฮอนดูรัส', nationality_name_en: 'Honduran', nationality_abb_name: 'HN', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'HU', nationality_name_th: 'ฮังการี', nationality_name_en: 'Hungarian', nationality_abb_name: 'HU', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'IS', nationality_name_th: 'ไอซ์แลนด์', nationality_name_en: 'Icelandic', nationality_abb_name: 'IS', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'IN', nationality_name_th: 'อินเดีย', nationality_name_en: 'Indian', nationality_abb_name: 'IN', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'ID', nationality_name_th: 'อินโดนีเซีย', nationality_name_en: 'Indonesian', nationality_abb_name: 'ID', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'IR', nationality_name_th: 'อิหร่าน', nationality_name_en: 'Iranian', nationality_abb_name: 'IR', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'IQ', nationality_name_th: 'อิรัก', nationality_name_en: 'Iraqi', nationality_abb_name: 'IQ', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'IE', nationality_name_th: 'ไอร์แลนด์', nationality_name_en: 'Irish', nationality_abb_name: 'IE', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'IL', nationality_name_th: 'อิสราเอล', nationality_name_en: 'Israeli', nationality_abb_name: 'IL', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'IT', nationality_name_th: 'อิตาลี', nationality_name_en: 'Italian', nationality_abb_name: 'IT', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'JM', nationality_name_th: 'จาเมกา', nationality_name_en: 'Jamaican', nationality_abb_name: 'JM', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'JP', nationality_name_th: 'ญี่ปุ่น', nationality_name_en: 'Japanese', nationality_abb_name: 'JP', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'JO', nationality_name_th: 'จอร์แดน', nationality_name_en: 'Jordanian', nationality_abb_name: 'JO', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'KZ', nationality_name_th: 'คาซัคสถาน', nationality_name_en: 'Kazakhstani', nationality_abb_name: 'KZ', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'KE', nationality_name_th: 'เคนยา', nationality_name_en: 'Kenyan', nationality_abb_name: 'KE', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'KI', nationality_name_th: 'คิริบาส', nationality_name_en: 'Kiribati', nationality_abb_name: 'KI', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'KP', nationality_name_th: 'เกาหลีเหนือ', nationality_name_en: 'North Korean', nationality_abb_name: 'KP', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'KR', nationality_name_th: 'เกาหลีใต้', nationality_name_en: 'South Korean', nationality_abb_name: 'KR', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'KW', nationality_name_th: 'คูเวต', nationality_name_en: 'Kuwaiti', nationality_abb_name: 'KW', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'KG', nationality_name_th: 'คีร์กีซสถาน', nationality_name_en: 'Kyrgyzstani', nationality_abb_name: 'KG', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'LA', nationality_name_th: 'ลาว', nationality_name_en: 'Laotian', nationality_abb_name: 'LA', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'LV', nationality_name_th: 'ลัตเวีย', nationality_name_en: 'Latvian', nationality_abb_name: 'LV', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'LB', nationality_name_th: 'เลบานอน', nationality_name_en: 'Lebanese', nationality_abb_name: 'LB', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'LS', nationality_name_th: 'เลโซโท', nationality_name_en: 'Basotho', nationality_abb_name: 'LS', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'LR', nationality_name_th: 'ไลบีเรีย', nationality_name_en: 'Liberian', nationality_abb_name: 'LR', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'LY', nationality_name_th: 'ลิเบีย', nationality_name_en: 'Libyan', nationality_abb_name: 'LY', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'LI', nationality_name_th: 'ลิกเตนสไตน์', nationality_name_en: 'Liechtensteiner', nationality_abb_name: 'LI', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'LT', nationality_name_th: 'ลิทัวเนีย', nationality_name_en: 'Lithuanian', nationality_abb_name: 'LT', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'LU', nationality_name_th: 'ลักเซมเบิร์ก', nationality_name_en: 'Luxembourger', nationality_abb_name: 'LU', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MG', nationality_name_th: 'มาดากัสการ์', nationality_name_en: 'Malagasy', nationality_abb_name: 'MG', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MW', nationality_name_th: 'มาลาวี', nationality_name_en: 'Malawian', nationality_abb_name: 'MW', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MY', nationality_name_th: 'มาเลเซีย', nationality_name_en: 'Malaysian', nationality_abb_name: 'MY', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MV', nationality_name_th: 'มัลดีฟส์', nationality_name_en: 'Maldivian', nationality_abb_name: 'MV', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'ML', nationality_name_th: 'มาลี', nationality_name_en: 'Malian', nationality_abb_name: 'ML', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MT', nationality_name_th: 'มอลตา', nationality_name_en: 'Maltese', nationality_abb_name: 'MT', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MH', nationality_name_th: 'หมู่เกาะมาร์แชลล์', nationality_name_en: 'Marshallese', nationality_abb_name: 'MH', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MR', nationality_name_th: 'มอริเตเนีย', nationality_name_en: 'Mauritanian', nationality_abb_name: 'MR', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MU', nationality_name_th: 'มอริเชียส', nationality_name_en: 'Mauritian', nationality_abb_name: 'MU', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MX', nationality_name_th: 'เม็กซิโก', nationality_name_en: 'Mexican', nationality_abb_name: 'MX', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'FM', nationality_name_th: 'ไมโครนีเซีย', nationality_name_en: 'Micronesian', nationality_abb_name: 'FM', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MD', nationality_name_th: 'มอลโดวา', nationality_name_en: 'Moldovan', nationality_abb_name: 'MD', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MC', nationality_name_th: 'โมนาโก', nationality_name_en: 'Monegasque', nationality_abb_name: 'MC', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MN', nationality_name_th: 'มองโกเลีย', nationality_name_en: 'Mongolian', nationality_abb_name: 'MN', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'ME', nationality_name_th: 'มอนเตเนโกร', nationality_name_en: 'Montenegrin', nationality_abb_name: 'ME', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MA', nationality_name_th: 'โมร็อกโก', nationality_name_en: 'Moroccan', nationality_abb_name: 'MA', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MZ', nationality_name_th: 'โมซัมบิก', nationality_name_en: 'Mozambican', nationality_abb_name: 'MZ', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MM', nationality_name_th: 'พม่า', nationality_name_en: 'Burmese', nationality_abb_name: 'MM', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'NA', nationality_name_th: 'นามิเบีย', nationality_name_en: 'Namibian', nationality_abb_name: 'NA', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'NR', nationality_name_th: 'นาอูรู', nationality_name_en: 'Nauruan', nationality_abb_name: 'NR', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'NP', nationality_name_th: 'เนปาล', nationality_name_en: 'Nepalese', nationality_abb_name: 'NP', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'NL', nationality_name_th: 'เนเธอร์แลนด์', nationality_name_en: 'Dutch', nationality_abb_name: 'NL', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'NZ', nationality_name_th: 'นิวซีแลนด์', nationality_name_en: 'New Zealander', nationality_abb_name: 'NZ', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'NI', nationality_name_th: 'นิการากัว', nationality_name_en: 'Nicaraguan', nationality_abb_name: 'NI', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'NE', nationality_name_th: 'ไนเจอร์', nationality_name_en: 'Nigerien', nationality_abb_name: 'NE', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'NG', nationality_name_th: 'ไนจีเรีย', nationality_name_en: 'Nigerian', nationality_abb_name: 'NG', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'MK', nationality_name_th: 'มาซิโดเนียเหนือ', nationality_name_en: 'North Macedonian', nationality_abb_name: 'MK', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'NO', nationality_name_th: 'นอร์เวย์', nationality_name_en: 'Norwegian', nationality_abb_name: 'NO', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'OM', nationality_name_th: 'โอมาน', nationality_name_en: 'Omani', nationality_abb_name: 'OM', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'PK', nationality_name_th: 'ปากีสถาน', nationality_name_en: 'Pakistani', nationality_abb_name: 'PK', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'PW', nationality_name_th: 'ปาเลา', nationality_name_en: 'Palauan', nationality_abb_name: 'PW', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'PS', nationality_name_th: 'ปาเลสไตน์', nationality_name_en: 'Palestinian', nationality_abb_name: 'PS', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'PA', nationality_name_th: 'ปานามา', nationality_name_en: 'Panamanian', nationality_abb_name: 'PA', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'PG', nationality_name_th: 'ปาปัวนิวกินี', nationality_name_en: 'Papua New Guinean', nationality_abb_name: 'PG', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'PY', nationality_name_th: 'ปารากวัย', nationality_name_en: 'Paraguayan', nationality_abb_name: 'PY', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'PE', nationality_name_th: 'เปรู', nationality_name_en: 'Peruvian', nationality_abb_name: 'PE', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'PH', nationality_name_th: 'ฟิลิปปินส์', nationality_name_en: 'Filipino', nationality_abb_name: 'PH', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'PL', nationality_name_th: 'โปแลนด์', nationality_name_en: 'Polish', nationality_abb_name: 'PL', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'PT', nationality_name_th: 'โปรตุเกส', nationality_name_en: 'Portuguese', nationality_abb_name: 'PT', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'QA', nationality_name_th: 'กาตาร์', nationality_name_en: 'Qatari', nationality_abb_name: 'QA', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'RO', nationality_name_th: 'โรมาเนีย', nationality_name_en: 'Romanian', nationality_abb_name: 'RO', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'RU', nationality_name_th: 'รัสเซีย', nationality_name_en: 'Russian', nationality_abb_name: 'RU', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'RW', nationality_name_th: 'รวันดา', nationality_name_en: 'Rwandan', nationality_abb_name: 'RW', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'KN', nationality_name_th: 'เซนต์คิตส์และเนวิส', nationality_name_en: 'Saint Kitts and Nevis', nationality_abb_name: 'KN', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'LC', nationality_name_th: 'เซนต์ลูเซีย', nationality_name_en: 'Saint Lucian', nationality_abb_name: 'LC', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'VC', nationality_name_th: 'เซนต์วินเซนต์และเกรนาดีนส์', nationality_name_en: 'Saint Vincent and the Grenadines', nationality_abb_name: 'VC', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'WS', nationality_name_th: 'ซามัว', nationality_name_en: 'Samoan', nationality_abb_name: 'WS', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SM', nationality_name_th: 'ซานมารีโน', nationality_name_en: 'Sammarinese', nationality_abb_name: 'SM', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'ST', nationality_name_th: 'เซาตูเมและปรินซิปี', nationality_name_en: 'Sao Tomean', nationality_abb_name: 'ST', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SA', nationality_name_th: 'ซาอุดีอาระเบีย', nationality_name_en: 'Saudi Arabian', nationality_abb_name: 'SA', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SN', nationality_name_th: 'เซเนกัล', nationality_name_en: 'Senegalese', nationality_abb_name: 'SN', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'RS', nationality_name_th: 'เซอร์เบีย', nationality_name_en: 'Serbian', nationality_abb_name: 'RS', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SC', nationality_name_th: 'เซเชลส์', nationality_name_en: 'Seychellois', nationality_abb_name: 'SC', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SL', nationality_name_th: 'เซียร์ราลีโอน', nationality_name_en: 'Sierra Leonean', nationality_abb_name: 'SL', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SG', nationality_name_th: 'สิงคโปร์', nationality_name_en: 'Singaporean', nationality_abb_name: 'SG', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SK', nationality_name_th: 'สโลวาเกีย', nationality_name_en: 'Slovak', nationality_abb_name: 'SK', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SI', nationality_name_th: 'สโลวีเนีย', nationality_name_en: 'Slovenian', nationality_abb_name: 'SI', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SB', nationality_name_th: 'หมู่เกาะโซโลมอน', nationality_name_en: 'Solomon Islander', nationality_abb_name: 'SB', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SO', nationality_name_th: 'โซมาเลีย', nationality_name_en: 'Somali', nationality_abb_name: 'SO', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'ZA', nationality_name_th: 'แอฟริกาใต้', nationality_name_en: 'South African', nationality_abb_name: 'ZA', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SS', nationality_name_th: 'ซูดานใต้', nationality_name_en: 'South Sudanese', nationality_abb_name: 'SS', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'ES', nationality_name_th: 'สเปน', nationality_name_en: 'Spanish', nationality_abb_name: 'ES', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'LK', nationality_name_th: 'ศรีลังกา', nationality_name_en: 'Sri Lankan', nationality_abb_name: 'LK', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SD', nationality_name_th: 'ซูดาน', nationality_name_en: 'Sudanese', nationality_abb_name: 'SD', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SR', nationality_name_th: 'ซูรินาเม', nationality_name_en: 'Surinamese', nationality_abb_name: 'SR', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SE', nationality_name_th: 'สวีเดน', nationality_name_en: 'Swedish', nationality_abb_name: 'SE', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'CH', nationality_name_th: 'สวิตเซอร์แลนด์', nationality_name_en: 'Swiss', nationality_abb_name: 'CH', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'SY', nationality_name_th: 'ซีเรีย', nationality_name_en: 'Syrian', nationality_abb_name: 'SY', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'TJ', nationality_name_th: 'ทาจิกิสถาน', nationality_name_en: 'Tajikistani', nationality_abb_name: 'TJ', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'TZ', nationality_name_th: 'แทนซาเนีย', nationality_name_en: 'Tanzanian', nationality_abb_name: 'TZ', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'TH', nationality_name_th: 'ไทย', nationality_name_en: 'Thai', nationality_abb_name: 'TH', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'TL', nationality_name_th: 'ติมอร์-เลสเต', nationality_name_en: 'Timorese', nationality_abb_name: 'TL', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'TG', nationality_name_th: 'โตโก', nationality_name_en: 'Togolese', nationality_abb_name: 'TG', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'TO', nationality_name_th: 'ตองกา', nationality_name_en: 'Tongan', nationality_abb_name: 'TO', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'TT', nationality_name_th: 'ตรินิแดดและโตเบโก', nationality_name_en: 'Trinidadian and Tobagonian', nationality_abb_name: 'TT', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'TN', nationality_name_th: 'ตูนิเซีย', nationality_name_en: 'Tunisian', nationality_abb_name: 'TN', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'TR', nationality_name_th: 'ตุรกี', nationality_name_en: 'Turkish', nationality_abb_name: 'TR', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'TM', nationality_name_th: 'เติร์กเมนิสถาน', nationality_name_en: 'Turkmen', nationality_abb_name: 'TM', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'TV', nationality_name_th: 'ตูวาลู', nationality_name_en: 'Tuvaluan', nationality_abb_name: 'TV', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'UG', nationality_name_th: 'ยูกันดา', nationality_name_en: 'Ugandan', nationality_abb_name: 'UG', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'UA', nationality_name_th: 'ยูเครน', nationality_name_en: 'Ukrainian', nationality_abb_name: 'UA', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'AE', nationality_name_th: 'สหรัฐอาหรับเอมิเรตส์', nationality_name_en: 'Emirati', nationality_abb_name: 'AE', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'GB', nationality_name_th: 'สหราชอาณาจักร', nationality_name_en: 'British', nationality_abb_name: 'GB', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'US', nationality_name_th: 'สหรัฐอเมริกา', nationality_name_en: 'American', nationality_abb_name: 'US', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'UY', nationality_name_th: 'อุรุกวัย', nationality_name_en: 'Uruguayan', nationality_abb_name: 'UY', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'UZ', nationality_name_th: 'อุซเบกิสถาน', nationality_name_en: 'Uzbekistani', nationality_abb_name: 'UZ', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'VU', nationality_name_th: 'วานูอาตู', nationality_name_en: 'Vanuatuan', nationality_abb_name: 'VU', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'VA', nationality_name_th: 'นครวาติกัน', nationality_name_en: 'Vatican', nationality_abb_name: 'VA', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'VE', nationality_name_th: 'เวเนซุเอลา', nationality_name_en: 'Venezuelan', nationality_abb_name: 'VE', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'VN', nationality_name_th: 'เวียดนาม', nationality_name_en: 'Vietnamese', nationality_abb_name: 'VN', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'YE', nationality_name_th: 'เยเมน', nationality_name_en: 'Yemeni', nationality_abb_name: 'YE', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'ZM', nationality_name_th: 'แซมเบีย', nationality_name_en: 'Zambian', nationality_abb_name: 'ZM', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },
  { nationality_id: 'ZW', nationality_name_th: 'ซิมบับเว', nationality_name_en: 'Zimbabwean', nationality_abb_name: 'ZW', create_at: '2025-06-07', update_at: '2025-06-07', officer_id: 6800001 },

].map(item => ({ // เปลี่ยนชื่อ nation_id เป็น id
  id: item.nationality_id,
  nation_name_th: item.nationality_name_th,
  nation_name_en: item.nationality_name_en,
  nation_abb_name: item.nationality_abb_name,
  create_at: item.create_at,
  update_at: item.update_at,
  officer_id: item.officer_id,
}));


const Hr01Page = () => { 
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = useState<Data | null>(null);
  const [tableData, setTableData] = useState<Data[]>(initialAllRows);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labelText = useMemo(() => {
    const label = intl.formatMessage({ id: 'sidebar.hr01.1502' }); // สมมติว่าใช้ id นี้
    const words = label.split("HR11202 "); // ตัวอย่างการตัด HR115 ออก
    return words.length > 1 ? words[1] : label;
  }, [intl]);

  const dialogTitle = useMemo(() => {
    if (dialogMode === 'add') return "เพิ่ม" + labelText;
    if (dialogMode === 'edit') return "แก้ไข" + labelText;
    if (dialogMode === 'view') return "รายละเอียด" + labelText;
    return "";
  }, [dialogMode, labelText]);

  // ฟังก์ชันสำหรับสร้างวันที่ปัจจุบันในรูปแบบที่กำหนด
  const getFormattedDate = () => {
    return new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' });
  };

  const onOpenAddTask = () => {
    setDialogMode('add');
    setCurrentData({
      id: '', // nation_id จะถูกกำหนดเมื่อบันทึก
      nation_name_th: '',
      nation_name_en: '',
      nation_abb_name: '',
      create_at: getFormattedDate(),
      update_at: getFormattedDate(),
      officer_id: 6800001 // ค่าเริ่มต้นผู้บันทึก
    });
    setAddTaskOpen(true);
    setErrors({}); // เคลียร์ข้อผิดพลาดเมื่อเปิด Dialog
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
    setCurrentData(null);
    setErrors({}); // เคลียร์ข้อผิดพลาดเมื่อปิด Dialog
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentData(prevData => ({
      ...prevData!,
      [name]: name === 'officer_id' ? parseInt(value, 10) || 0 : value
    }));
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // ฟังก์ชันสำหรับตรวจสอบข้อมูล
  const validateData = () => {
    const newErrors: { [key: string]: string } = {};
    if (!currentData?.id) {
      newErrors.id = 'กรุณากรอกรหัสเชื้อชาติ';
    }
    if (!currentData?.nation_name_th) {
      newErrors.nation_name_th = 'กรุณากรอกชื่อเชื้อชาติ (TH)';
    }
    if (!currentData?.nation_name_en) {
      newErrors.nation_name_en = 'กรุณากรอกชื่อเชื้อชาติ (EN)';
    }
    if (!currentData?.nation_abb_name) {
      newErrors.nation_abb_name = 'กรุณากรอกชื่อเชื้อชาติ (ตัวย่อ)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveData = () => {
    if (!validateData()) {
      Swal.fire({
        icon: 'warning',
        title: 'คำเตือน!',
        text: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    if (dialogMode === 'add') {
      // ตรวจสอบว่ารหัสซ้ำหรือไม่
      if (tableData.some(d => d.id === currentData!.id)) {
        Swal.fire('ข้อผิดพลาด!', 'รหัสเชื้อชาตินี้มีอยู่แล้ว', 'error');
        return;
      }
      const newData: Data = {
        ...currentData!,
        create_at: getFormattedDate(),
        update_at: getFormattedDate(),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      setTableData(prevData =>
        prevData.map(data =>
          data.id === currentData!.id ? {
            ...currentData!,
            update_at: getFormattedDate()
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: Data) => {
    setDialogMode('view');
    setCurrentData(data);
    setErrors({});
    setAddTaskOpen(true);
  };

  const handleEditData = (data: Data) => {
    setDialogMode('edit');
    setCurrentData(data);
    setErrors({});
    setAddTaskOpen(true);
  };

  const handleDeleteData = async (id: string) => { // id เป็น string
    const result = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณต้องการลบข้อมูลนี้ใช่ไหม?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก'
    });
    if (result.isConfirmed) {
      setTableData(prevData => prevData.filter(data => data.id !== id));
      Swal.fire(
        'ลบแล้ว!',
        'ข้อมูลของคุณถูกลบเรียบร้อยแล้ว',
        'success'
      );
    }
  };

  return (
    <AppCard
      contentStyle={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 8 }}
      title={<IntlMessages id="sidebar.hr01.1502" />}
      action={
        <Button
          variant="outlined"
          color="primary"
          sx={{
            padding: '3px 10px',
            borderRadius: 30,
            '& .MuiSvgIcon-root': {
              fontSize: 20,
            },
          }}
          startIcon={<AddIcon />}
          onClick={onOpenAddTask}
        >
          เพิ่ม{labelText}
        </Button>
      }
    >
      <Table
        data={tableData}
        onView={handleViewData}
        onEdit={handleEditData}
        onDelete={handleDeleteData}
      />
      <AppDialog
        dividers
        maxWidth="md"
        open={isAddTaskOpen}
        onClose={onCloseAddTask}
        title={dialogTitle}
      >
        <Box>
          <TextField
            label={"รหัส" + labelText}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.id || ''}
            name="id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view' || dialogMode === 'edit'} // รหัสเพิ่มได้อย่างเดียว แก้ไขไม่ได้
            error={!!errors.id}
            helperText={errors.id}
          />
          <TextField
            fullWidth
            label={"ชื่อ" + labelText + " (TH)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.nation_name_th || ''}
            name="nation_name_th"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.nation_name_th}
            helperText={errors.nation_name_th}
          />
          <TextField
            fullWidth
            label={"ชื่อ" + labelText + " (EN)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.nation_name_en || ''}
            name="nation_name_en"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.nation_name_en}
            helperText={errors.nation_name_en}
          />
          <TextField
            fullWidth
            label={"ชื่อ" + labelText + " (ตัวย่อ)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.nation_abb_name || ''}
            name="nation_abb_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.nation_abb_name}
            helperText={errors.nation_abb_name}
          />
          <TextField
            fullWidth
            label={"ผู้บันทึกข้อมูล"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.officer_id || ''}
            name="officer_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={onCloseAddTask} color="secondary">
              {dialogMode === 'view' ? 'ปิด' : 'ยกเลิก'}
            </Button>
            {dialogMode !== 'view' && (
              <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleSaveData}>
                บันทึก
              </Button>
            )}
          </Box>
        </Box>
      </AppDialog>
    </AppCard>
  );
};

export default Hr01Page;