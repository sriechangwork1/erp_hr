// src/pages/hr911/components/TrainingSection.tsx
import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Gp7StaffData, TrainingRecord } from '../types';
import Gp7Section from './Gp7Section';

interface TrainingSectionProps {
  data: Gp7StaffData;
}

const TrainingSection: React.FC<TrainingSectionProps> = ({ data }) => {
  return (
    <Gp7Section title="4. ประวัติการฝึกอบรม/ดูงาน">
      {data.trainingHistory && data.trainingHistory.length > 0 ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ลำดับ</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>หลักสูตร</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>จากวันที่</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ถึงวันที่</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>สถาบัน/หน่วยงาน</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>จำนวนชั่วโมง</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.trainingHistory.map((train: TrainingRecord, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{train.courseName}</TableCell>
                <TableCell>{train.startDate}</TableCell>
                <TableCell>{train.endDate}</TableCell>
                <TableCell>{train.institution}</TableCell>
                <TableCell align="right">{train.hours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>ไม่มีข้อมูลประวัติการฝึกอบรม/ดูงาน</Typography>
      )}
    </Gp7Section>
  );
};

export default TrainingSection;