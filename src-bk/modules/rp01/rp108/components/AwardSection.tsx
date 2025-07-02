// src/pages/hr911/components/AwardSection.tsx
import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Gp7StaffData, AwardRecord } from '../types';
import Gp7Section from './Gp7Section';

interface AwardSectionProps {
  data: Gp7StaffData;
}

const AwardSection: React.FC<AwardSectionProps> = ({ data }) => {
  return (
    <Gp7Section title="5. ประวัติการได้รับเครื่องราชอิสริยาภรณ์">
      {data.awardHistory && data.awardHistory.length > 0 ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ลำดับ</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ชื่อเครื่องราชฯ</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>วันที่ได้รับ</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>อ้างอิงราชกิจจานุเบกษา</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.awardHistory.map((award: AwardRecord, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{award.awardName}</TableCell>
                <TableCell>{award.awardDate}</TableCell>
                <TableCell>{award.gazetteRef}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>ไม่มีข้อมูลประวัติการได้รับเครื่องราชอิสริยาภรณ์</Typography>
      )}
    </Gp7Section>
  );
};

export default AwardSection;