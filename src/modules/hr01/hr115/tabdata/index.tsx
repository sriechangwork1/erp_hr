import IntlMessages from '@crema/helpers/IntlMessages';
import { Chip, Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';

import AppCard from '@crema/components/AppCard';
import Hr11201 from './hr11201';
import Hr11202 from './hr11202';


const Hr111Setting = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };
  return (
    <Box>
      <IntlMessages id="sidebar.hr01.15" />
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          '& .crMuiTab': {
            textTransform: 'capitalize',
            p: 2,
          },
        }}
      >
      <Tab
        className="crMuiTab"
        label={<Chip label="เชื้อชาติ" />}
        {...a11yProps(0)}
      />
      <Tab
        className="crMuiTab"
        label={<Chip label="สัญชาติ" />}
        {...a11yProps(1)}
      />
      </Tabs>
        <Box
          sx={{
            mt: 2,
          }}
        >
          {value === 0 && <Hr11201 />}
          {value === 1 && <Hr11202 />}
        </Box>
    </Box>
    
  );
};

export default Hr111Setting;
