// src/pages/hr911/components/ServiceHistorySection.tsx
import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Gp7StaffData, HistoricalPosition } from '../types';
import Gp7Section from './Gp7Section';

interface ServiceHistorySectionProps {
  data: Gp7StaffData;
}

const ServiceHistorySection: React.FC<ServiceHistorySectionProps> = ({ data }) => {
  return (
    <Gp7Section title="2. ประวัติการดำรงตำแหน่งและเงินเดือน">
      {data.historicalPositions && data.historicalPositions.length > 0 ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ลำดับ</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ตำแหน่ง</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ระดับ/ประเภท</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>หน่วยงาน</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>วันที่เริ่ม</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>วันที่สิ้นสุด</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>เงินเดือน (บาท)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.historicalPositions.map((pos: HistoricalPosition, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{pos.positionName}</TableCell>
                <TableCell>{pos.level}</TableCell>
                <TableCell>{pos.facultyName}</TableCell>
                <TableCell>{pos.startDate}</TableCell>
                <TableCell>{pos.endDate}</TableCell>
                <TableCell align="right">{pos.salary.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>ไม่มีข้อมูลประวัติการดำรงตำแหน่ง</Typography>
      )}
    </Gp7Section>
  );
};

export default ServiceHistorySection;