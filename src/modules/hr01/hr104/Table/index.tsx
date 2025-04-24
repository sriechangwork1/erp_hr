import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableHeader from '@crema/components/AppTable/TableHeader';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableItem from './TableItem';
import AppTableContainer from '@crema/components/AppTableContainer';
import AppScrollbar from '@crema/components/AppScrollbar';
import { useIntl } from 'react-intl';

const dataDetail = [
  {
    id: 1,
    jobCode: 'J001',
    jobTitle: 'นักพัฒนาซอฟต์แวร์',
    jobDescription: 'พัฒนาและดูแลระบบเว็บแอปพลิเคชัน',
    lastUpdated: '2025-03-20',
    recordedBy: 'สมชาย อินทร์แก้ว',
    status: 'อนุมัติ',
  },
  {
    id: 2,
    jobCode: 'J002',
    jobTitle: 'นักออกแบบ UI/UX',
    jobDescription: 'ออกแบบส่วนติดต่อผู้ใช้และประสบการณ์การใช้งาน',
    lastUpdated: '2025-03-18',
    recordedBy: 'นภา สุขสันต์',
    status: 'รอดำเนินการ',
  },
  {
    id: 3,
    jobCode: 'J003',
    jobTitle: 'ผู้ดูแลระบบเครือข่าย',
    jobDescription: 'ดูแลและบำรุงรักษาระบบเครือข่ายขององค์กร',
    lastUpdated: '2025-03-19',
    recordedBy: 'วิชัย ทองดี',
    status: 'จ่ายเงิน',
  },
];

const labeltext =()=>{
  const intl = useIntl();
  const label = intl.formatMessage({ id: 'sidebar.hr01.04' });
  const words = label.split("HR104 ");
  let   labletext = words[1];
  return labletext;     
};                            

const DataTable = () => {

  return (
    <AppTableContainer>
      <AppScrollbar style={{ height: 300 }}>
        <Table>
          <TableHead>
            <TableHeader>
              <TableCell>รหัส{labeltext()}</TableCell>
              <TableCell>ชื่อ{labeltext()}</TableCell>
              <TableCell>รายละเอียด{labeltext()}</TableCell>
              <TableCell>วันที่ล่าสุด</TableCell>
              <TableCell>ผู้บันทึก</TableCell>
              <TableCell>สถานะ</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableHeader>
          </TableHead>
          <TableBody>
            {dataDetail.map((data) => (
              <TableItem data={data} key={data.id} />
            ))}
          </TableBody>
        </Table>
      </AppScrollbar>
    </AppTableContainer>
  );
};

export default DataTable;
