import IntlMessages from '@crema/helpers/IntlMessages';
import { Chip, Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import Hr10301 from './hr10301';
import Hr10302 from './hr10302';
import Hr10303 from './hr10303';
import Hr10304 from './hr10303';
import Hr10305 from './hr10303';
import Hr10306 from './hr10303';
import AppCard from '@crema/components/AppCard';

const Hr103Setting = () => {
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
    <AppCard title="ข้อมูลตำแหน่ง">
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
        label={<Chip label="ตำแหน่งสายงาน" />}
        {...a11yProps(0)}
      />
      <Tab
        className="crMuiTab"
        label={<Chip label="รายชื่อสายงาน ตามข้อมูล อว" />}
        {...a11yProps(1)}
      />
      <Tab
        className="crMuiTab"
        label={<Chip label="ระดับตำแหน่ง" />}
        {...a11yProps(2)}
      />
      <Tab
        className="crMuiTab"
        label={<Chip label="ตำแหน่งทางวิชาการ" />}
        {...a11yProps(3)}
      />
      <Tab
        className="crMuiTab"
        label={<Chip label="ตำแหน่งสูงขึ้นทางสายสนับสนุน" />}
        {...a11yProps(4)}
      />
      <Tab
        className="crMuiTab"
        label={<Chip label="ตำแหน่งบริหาร" />}
        {...a11yProps(5)}
      />
      </Tabs>
        <Box
          sx={{
            mt: 4,
          }}
        >
          {value === 0 && <Hr10301 />}
          {value === 1 && <Hr10302 />}
          {value === 2 && <Hr10303 />}
          {value === 3 && <Hr10304 />}
          {value === 4 && <Hr10305 />}
          {value === 5 && <Hr10306 />}
        </Box>
    </AppCard>
  );
};

export default Hr103Setting;
