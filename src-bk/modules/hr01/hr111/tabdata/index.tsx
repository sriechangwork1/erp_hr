import IntlMessages from '@crema/helpers/IntlMessages';
import { Chip, Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';

import AppCard from '@crema/components/AppCard';
import Hr11101 from './hr11101';
import Hr11102 from './hr11102';
import Hr11103 from './hr11103';
import Hr11104 from './hr11104';

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
      <IntlMessages id="sidebar.hr01.11" />
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
        label={<Chip label="ตำบล" />}
        {...a11yProps(0)}
      />
      <Tab
        className="crMuiTab"
        label={<Chip label="อำเภอ" />}
        {...a11yProps(1)}
      />
      <Tab
        className="crMuiTab"
        label={<Chip label="จังหวัด" />}
        {...a11yProps(2)}
      />
      <Tab
        className="crMuiTab"
        label={<Chip label="ประเทศ" />}
        {...a11yProps(3)}
      />
      </Tabs>
        <Box
          sx={{
            mt: 2,
          }}
        >
          {value === 0 && <Hr11101 />}
          {value === 1 && <Hr11102 />}
          {value === 2 && <Hr11103 />}
          {value === 3 && <Hr11104 />}
        </Box>
    </Box>
    
  );
};

export default Hr111Setting;
