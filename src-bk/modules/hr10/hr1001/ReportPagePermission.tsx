//hr1001/ReportPagePermission.tsx
import React from 'react';
import {
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
} from '@mui/material';
import { ReportPage } from './types';

interface ReportPagePermissionProps {
  reportPages: ReportPage[];
  selectedReportPageIds: string[];
  onToggleReportPage: (reportPageId: string) => void;
  onSavePermissions: () => void;
  isSaving: boolean;
  selectedGroupName: string; // Add prop to display selected group name
}

const ReportPagePermission: React.FC<ReportPagePermissionProps> = ({
  reportPages,
  selectedReportPageIds,
  onToggleReportPage,
  onSavePermissions,
  isSaving,
  selectedGroupName,
}) => {
  return (
    <Paper elevation={1} sx={{ p: 2, height: '100%', overflow: 'auto' }}>
      <Typography variant="h3" gutterBottom>
        กำหนดสิทธิ์สำหรับ: {selectedGroupName || 'โปรดเลือกกลุ่มผู้ใช้งาน'}
      </Typography>
      {selectedGroupName ? (
        <FormGroup>
          {reportPages.map((page) => (
            <FormControlLabel
              key={page.id}
              control={
                <Checkbox
                  checked={selectedReportPageIds.includes(page.id)}
                  onChange={() => onToggleReportPage(page.id)}
                  name={page.id}
                />
              }
              label={page.name}
            />
          ))}
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              onClick={onSavePermissions}
              disabled={isSaving}
            >
              {isSaving ? 'กำลังบันทึก...' : 'บันทึกสิทธิ์'}
            </Button>
          </Box>
        </FormGroup>
      ) : (
        <Typography variant="body1" color="text.secondary">
          เลือกกลุ่มผู้ใช้งานจากรายการด้านซ้ายเพื่อกำหนดสิทธิ์.
        </Typography>
      )}
    </Paper>
  );
};

export default ReportPagePermission;