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

const Hr06Page = () => {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);

  const onOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const labeltext =()=>{
    const intl = useIntl();
    const label = intl.formatMessage({ id: 'sidebar.hr01.06' });
    const words = label.split("HR106 ");
    let   labletext = words[1];
    return labletext;    
  };
 

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };
  return (
    <AppCard
      contentStyle={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 8 }}
      title={<IntlMessages id="sidebar.hr01.06" />}
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
        เพิ่ม{labeltext()}
      </Button>
      }
    >
      <Table/>
      <AppDialog
        dividers
        maxWidth="md"
        open={isAddTaskOpen}
        onClose={onCloseAddTask}
        title={"เพิ่ม"+labeltext()}
      >
        <Box>
          <TextField
            label={"รหัส"+labeltext()}
            variant="outlined"
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label={"ชื่อ"+labeltext()}
            variant="outlined"
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label={"รายละเอียด"+labeltext()}
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

export default Hr06Page;
