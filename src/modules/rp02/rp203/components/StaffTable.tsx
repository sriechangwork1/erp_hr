import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Box,
  Tooltip,
  // ลบ CircularProgress ออก
} from '@mui/material';
import { StaffData } from '../types/StaffData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Mock CustomIntlMessages และ useIntl เพื่อให้โค้ดทำงานได้สมบูรณ์ในตัวอย่างนี้
// หากคุณมีไฟล์ IntlMessages จริงๆ ให้ใช้ของจริงแทน
const CustomIntlMessages: React.FC<{ id: string; defaultMessage: string }> = ({ defaultMessage }) => <>{defaultMessage}</>;

const useIntl = () => ({
  messages: {
    common_search: 'ค้นหา',
    common_filter: 'ตัวกรอง',
    common_no_data: 'ไม่มีข้อมูลที่ตรงกับเงื่อนไข',
    table_rows_per_page: 'จำนวนแถวต่อหน้า:',
    edit: 'แก้ไข',
    delete: 'ลบ',
    verify: 'ตรวจสอบ',
    citizen_id: 'เลขบัตรประชาชน',
    full_name: 'ชื่อ-นามสกุล',
    academic_year: 'ปีการศึกษา',
    semester: 'ภาคเรียน',
    appointed_date: 'วันที่บรรจุ',
    retired_date: 'วันที่เกษียณ',
    status: 'สถานะ',
    actions: 'การดำเนินการ',
    verified: 'ยืนยันแล้ว',
    pending: 'รอดำเนินการ',
    rejected: 'ถูกปฏิเสธ',
    birth_date: 'วันเกิด',
    phone_number: 'เบอร์โทรศัพท์',
    email: 'อีเมล',
    staff_type: 'ประเภทบุคลากร',
    // ลบ loading_data ออก
  },
});

interface StaffTableProps {
  data: StaffData[];
  onEdit: (staff: StaffData) => void;
  onDelete: (id: number) => void;
  onVerify: (id: number) => void;
  // ลบ isLoading: boolean; ออก
}

const StaffTable: React.FC<StaffTableProps> = ({ data, onEdit, onDelete, onVerify /* ลบ isLoading ออก */ }) => {
  const { messages } = useIntl();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getStatusDisplay = (status: 'verified' | 'pending' | 'rejected') => {
    switch (status) {
      case 'verified':
        return (
          <Tooltip title={messages.verified}>
            <CheckCircleIcon color="success" />
          </Tooltip>
        );
      case 'pending':
        return (
          <Tooltip title={messages.pending}>
            <CheckCircleOutlineIcon color="warning" />
          </Tooltip>
        );
      case 'rejected':
        return (
          <Tooltip title={messages.rejected}>
            <CancelOutlinedIcon color="error" />
          </Tooltip>
        );
      default:
        return status;
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* ลบเงื่อนไข isLoading ออก แล้วแสดง TableContainer ตรงๆ */}
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell><CustomIntlMessages id="citizen_id" defaultMessage="เลขบัตรประชาชน" /></TableCell>
              <TableCell><CustomIntlMessages id="full_name" defaultMessage="ชื่อ-นามสกุล" /></TableCell>
              <TableCell><CustomIntlMessages id="academic_year" defaultMessage="ปีการศึกษา" /></TableCell>
              <TableCell><CustomIntlMessages id="semester" defaultMessage="ภาคเรียน" /></TableCell>
              <TableCell><CustomIntlMessages id="appointed_date" defaultMessage="วันที่บรรจุ" /></TableCell>
              <TableCell><CustomIntlMessages id="retired_date" defaultMessage="วันที่เกษียณ" /></TableCell>
              <TableCell><CustomIntlMessages id="status" defaultMessage="สถานะ" /></TableCell>
              <TableCell align="center"><CustomIntlMessages id="actions" defaultMessage="การดำเนินการ" /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.ds2001_id}>
                <TableCell>{row.citizen_id}</TableCell>
                <TableCell>{`${row.stf_fname} ${row.stf_mname ? row.stf_mname + ' ' : ''}${row.stf_lname}`}</TableCell>
                <TableCell>{row.academic_year}</TableCell>
                <TableCell>{row.semester}</TableCell>
                <TableCell>{row.appointed_date}</TableCell>
                <TableCell>{row.retired_date}</TableCell>
                <TableCell>{getStatusDisplay(row.verification_status)}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Tooltip title={messages.edit}>
                      <Button variant="contained" size="small" onClick={() => onEdit(row)} sx={{ minWidth: 'auto', p: '6px' }}>
                        <EditIcon fontSize="small" />
                      </Button>
                    </Tooltip>
                    {row.verification_status !== 'verified' && (
                      <Tooltip title={messages.verify}>
                        <Button variant="outlined" size="small" onClick={() => onVerify(row.ds2001_id)} sx={{ minWidth: 'auto', p: '6px' }}>
                          <CheckCircleOutlineIcon fontSize="small" />
                        </Button>
                      </Tooltip>
                    )}
                    <Tooltip title={messages.delete}>
                      <Button variant="outlined" size="small" color="error" onClick={() => onDelete(row.ds2001_id)} sx={{ minWidth: 'auto', p: '6px' }}>
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CustomIntlMessages id="common_no_data" defaultMessage="ไม่มีข้อมูลที่ตรงกับเงื่อนไข" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={<CustomIntlMessages id="table_rows_per_page" defaultMessage="จำนวนแถวต่อหน้า:" />}
      />
    </Paper>
  );
};

export default StaffTable;