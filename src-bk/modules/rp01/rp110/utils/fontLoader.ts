// utils/fontLoader.ts
import { jsPDF } from 'jspdf';

// REPLACE THIS WITH YOUR ACTUAL BASE64 FONT STRING
const THSARABUN_FONT_BASE64 = 'YOUR_BASE64_ENCODED_THSARABUNNEW_FONT_STRING_HERE';

export const addFont = (doc: jsPDF & { addFileToVFS: Function, addFont: Function }) => { // <--- แก้ไข Type ตรงนี้
  if (!doc.existsFileInVFS('THSarabunNew.ttf')) {
    doc.addFileToVFS('THSarabunNew.ttf', THSARABUN_FONT_BASE64);
    doc.addFont('THSarabunNew.ttf', 'THSarabunNew', 'normal');
    doc.addFont('THSarabunNew.ttf', 'THSarabunNew', 'bold');
  }
};