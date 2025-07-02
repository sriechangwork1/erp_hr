import React from 'react';
import { Button, Box } from '@mui/material';

interface ActionButtonsProps {
  onSave: () => void;
  onClear: () => void;
  saveDisabled?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSave, onClear, saveDisabled = false }) => {
  return (
    <Box display="flex" justifyContent="flex-end" sx={{ mt: 4, mb: 4, gap: 2 }}>
      <Button
        variant="contained"
        color="success" // สีเขียว
        onClick={onSave}
        disabled={saveDisabled}
        sx={{ px: 4, py: 1.5 }}
      >
        บันทึกการจับคู่
      </Button>
      <Button
        variant="outlined"
        color="error" // สีแดง
        onClick={onClear}
        sx={{ px: 4, py: 1.5 }}
      >
        ล้างข้อมูล
      </Button>
    </Box>
  );
};

export default ActionButtons;