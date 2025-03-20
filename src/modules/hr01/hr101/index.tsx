'use client';
import React from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppSelect from '@crema/components/AppSelect';
import Table from './Table';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AppDialog from '@crema/components/AppDialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Hr02Page = () => {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);

  const onOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };
  return (
    <AppCard
      contentStyle={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 8 }}
      title={<IntlMessages id="sidebar.hr01.01" />}
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
        เพิ่มประเภทบุคลากร
      </Button>
      }
    >
      <Table/>
      <AppDialog
        dividers
        maxWidth="md"
        open={isAddTaskOpen}
        onClose={onCloseAddTask}
        title="เพิ่มประเภทบุคลากร"
      >
        <Box>
          <TextField
            label="รหัสประเภทบุคลากร"
            variant="outlined"
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="ชื่อประเภทบุคลากร"
            variant="outlined"
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="รายละเอียดประเภทบุคลากร"
            variant="outlined"
            margin="normal"
            size="small"
            multiline
            rows={3}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={onCloseAddTask} color="secondary">
              ยกเลิก
            </Button>
            <Button variant="contained" color="primary" sx={{ ml: 2 }}>
              บันทึก
            </Button>
          </Box>
        </Box>
      </AppDialog>

    </AppCard>
  );
};

export default Hr02Page;
