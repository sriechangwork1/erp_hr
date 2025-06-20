// rp109/table/index.tsx
import React from 'react';
import AppTableContainer from '@crema/components/AppTableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, Button, CircularProgress } from '@mui/material';
import TableItem from './TableItem';
import { GroupedAdminPositionRow } from '../types';

interface AdministrativePositionsTableProps {
  groupedData: GroupedAdminPositionRow[];
  isLoading: boolean;
  handleExportToPdf: () => void;
  handleExportToExcel: () => void;
}

const AdministrativePositionsTable: React.FC<AdministrativePositionsTableProps> = ({
  groupedData,
  isLoading,
  handleExportToPdf,
  handleExportToExcel,
}) => {
  return (
    <AppTableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
        <Button variant="contained" onClick={handleExportToPdf} disabled={groupedData.length === 0 || isLoading}>
          ส่งออก PDF
        </Button>
        <Button variant="contained" onClick={handleExportToExcel} disabled={groupedData.length === 0 || isLoading}>
          ส่งออก Excel
        </Button>
      </Box>
      <Table stickyHeader className="table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>ลำดับ</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>ชื่อ-สกุล</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>ตำแหน่งบริหาร</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>ตำแหน่งวิชาการ</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>ประเภทบุคลากร</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>เพศ</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>วันที่บรรจุ</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>สถานะ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <CircularProgress />
                <Box sx={{ mt: 1 }}>กำลังโหลดข้อมูล...</Box>
              </TableCell>
            </TableRow>
          ) : groupedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                ไม่พบข้อมูลบุคลากรในตำแหน่งบริหารตามเงื่อนไขที่เลือก
              </TableCell>
            </TableRow>
          ) : (
            groupedData.map((row) => {
              if (row.type === 'faculty_header') {
                return (
                  <TableRow key={row.groupKey} sx={{ backgroundColor: '#e0e0e0' }}>
                    <TableCell colSpan={8} sx={{ fontWeight: 'bold', fontSize: 14 }}>
                      หน่วยงาน: {row.facultyName}
                    </TableCell>
                  </TableRow>
                );
              } else if (row.type === 'admin_position_header') {
                return (
                  <TableRow key={row.groupKey} sx={{ backgroundColor: '#eeeeee' }}>
                    <TableCell colSpan={8} sx={{ fontWeight: 'bold', fontSize: 13, pl: 4 }}>
                      &gt;&gt; ตำแหน่ง: {row.adminPositionName}
                    </TableCell>
                  </TableRow>
                );
              } else if (row.type === 'staff_detail' && row.staffDetail) {
                return (
                  <TableItem
                    key={row.groupKey}
                    data={row.staffDetail}
                    index={groupedData.findIndex(d => d.groupKey === row.groupKey && d.type === 'staff_detail')} // Use overall index for numbering
                    isLoading={isLoading}
                  />
                );
              } else if (row.type === 'admin_position_total') {
                return (
                  <TableRow key={row.groupKey} sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell colSpan={5} align="right" sx={{ fontWeight: 'bold' }}>
                      รวมตำแหน่ง {row.adminPositionName}:
                    </TableCell>
                    <TableCell colSpan={3} align="left" sx={{ fontWeight: 'bold' }}>
                      {row.totalCount} คน (ชาย: {row.maleCount}, หญิง: {row.femaleCount})
                    </TableCell>
                  </TableRow>
                );
              } else if (row.type === 'faculty_total') {
                return (
                  <TableRow key={row.groupKey} sx={{ backgroundColor: '#e0e0e0' }}>
                    <TableCell colSpan={5} align="right" sx={{ fontWeight: 'bold', borderTop: '2px solid #ccc' }}>
                      รวมหน่วยงาน {row.facultyName}:
                    </TableCell>
                    <TableCell colSpan={3} align="left" sx={{ fontWeight: 'bold', borderTop: '2px solid #ccc' }}>
                      {row.totalCount} คน (ชาย: {row.maleCount}, หญิง: {row.femaleCount})
                    </TableCell>
                  </TableRow>
                );
              } else if (row.type === 'grand_total') {
                return (
                  <TableRow key={row.groupKey} sx={{ backgroundColor: '#c0c0c0' }}>
                    <TableCell colSpan={5} align="right" sx={{ fontWeight: 'bold', fontSize: 15, borderTop: '3px double #333' }}>
                      รวมทั้งหมด:
                    </TableCell>
                    <TableCell colSpan={3} align="left" sx={{ fontWeight: 'bold', fontSize: 15, borderTop: '3px double #333' }}>
                      {row.totalCount} คน (ชาย: {row.maleCount}, หญิง: {row.femaleCount})
                    </TableCell>
                  </TableRow>
                );
              }
              return null;
            })
          )}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default AdministrativePositionsTable;