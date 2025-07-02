import React from 'react';
import { MappedStaff } from '../interfaces/MappedStaff.interface';
import DataTable from './CrudTable';
import { Box, Typography } from '@mui/material';

interface ExistingMappingsTableProps {
  data: MappedStaff[];
}

const ExistingMappingsTable: React.FC<ExistingMappingsTableProps> = ({ data }) => {
  const columns = [
    { key: 'sourceStaff', header: 'รหัสบุคลากร (Staff)', render: (item: MappedStaff) => item.sourceStaff.staff_id },
    { key: 'sourceName', header: 'ชื่อ (Staff)', render: (item: MappedStaff) => `${item.sourceStaff.first_name_th} ${item.sourceStaff.last_name_th}` },
    { key: 'uocStaff', header: 'รหัสบุคลากร (UOC)', render: (item: MappedStaff) => item.uocStaff.ds2001_id },
    { key: 'uocName', header: 'ชื่อ (UOC)', render: (item: MappedStaff) => `${item.uocStaff.stf_fname} ${item.uocStaff.stf_lname}` },
    { key: 'mappedDate', header: 'วันที่จับคู่' },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" component="h3" sx={{ mb: 3, fontWeight: 'bold' }}>
        รายการที่จับคู่แล้ว
      </Typography>
      <DataTable
        data={data}
        columns={columns}
        idKey="id" // ใช้ id ของ MappedStaff เป็น key
      />
    </Box>
  );
};

export default ExistingMappingsTable;