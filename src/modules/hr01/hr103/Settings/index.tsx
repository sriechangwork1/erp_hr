import IntlMessages from '@crema/helpers/IntlMessages';
import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import hr10301 from './hr10301';
import hr10302 from './hr10302';
import hr10303 from './hr10303';
import AppCard from '@crema/components/AppCard';
import { InvoiceSettingType, InvoiceSettingItem } from '@crema/types/models/invoice';

type Props = {
  defaultSettings: InvoiceSettingType;
  onUpdateSettings: (key: string, newSettings: InvoiceSettingItem) => void;
};

const InvoiceSettings = ({ defaultSettings, onUpdateSettings }: Props) => {
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
            p: 0,
          },
        }}
      >
        <Tab className="crMuiTab" label="ตำแหน่งสายงาน" {...a11yProps(0)} />
        <Tab className="crMuiTab" label="รายชื่อสายงาน ตามข้อมูล อว" {...a11yProps(1)} />
        <Tab className="crMuiTab" label="ระดับตำแหน่ง" {...a11yProps(2)} />
        <Tab className="crMuiTab" label="ตำแหน่งทางวิชาการ" {...a11yProps(2)} />
        <Tab className="crMuiTab" label="ตำแหน่งสูงขึ้นทางสายสนับสนุน" {...a11yProps(2)} />
        <Tab className="crMuiTab" label="ตำแหน่งบริหาร " {...a11yProps(2)} />
        1.1.1.1.3.4	ตำแหน่งทางวิชาการ
      </Tabs>
      {defaultSettings?.general && (
        <Box
          sx={{
            mt: 4,
          }}
        >
          {value === 0 && <hr10301 settings={defaultSettings?.general} onUpdateSettings={onUpdateSettings} />}
          {value === 1 && <hr10302 settings={defaultSettings?.invoicing} onUpdateSettings={onUpdateSettings} />}
          {value === 2 && <hr10303 settings={defaultSettings?.accounting} onUpdateSettings={onUpdateSettings} />}
        </Box>
      )}
    </AppCard>
  );
};

export default InvoiceSettings;
