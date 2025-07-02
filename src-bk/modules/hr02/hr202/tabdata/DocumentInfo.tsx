//tabdata/DocumentInfo.tsx
'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AppDialog from '@crema/components/AppDialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import TableMui from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import AppSearchBar from '@crema/components/AppSearchBar';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip'; // สำหรับแสดง document_path เป็นลิงก์
import { MdInsertDriveFile, MdPersonOutline, MdLink } from "react-icons/md"; // ไอคอนสำหรับเอกสาร
import VisibilityIcon from '@mui/icons-material/Visibility';

// Data Interface for Document Data
interface DocumentData {
  document_id: number;
  staff_id?: number;
  document_name?: string;
  document_type?: string;
  document_path?: string;
  create_at?: string;
  update_at?: string;
  officer_id?: number;
  [key: string]: any;
}

// Staff Detail for display (สามารถนำมาจากแหล่งข้อมูลกลางได้ในอนาคต)
const staffDetailForTableDisplay = [
  { staff_id: 1001, prefixname_id: 'นาย', first_name_th: 'สมชาย', last_name_th: 'วงศ์สวัสดิ์' },
  { staff_id: 1002, prefixname_id: 'นางสาว', first_name_th: 'สมหญิง', last_name_th: 'ศรีสุข' },
  { staff_id: 1003, prefixname_id: 'นาย', first_name_th: 'นายเทสดี', last_name_th: 'มีรวย' },
  { staff_id: 1004, prefixname_id: 'นางสาว', first_name_th: 'นงลักษณ์', last_name_th: 'แก้วมณี' },
  { staff_id: 1005, prefixname_id: 'นาย', first_name_th: 'สุเทพ', last_name_th: 'อินทร์พรหม' },
  { staff_id: 1006, prefixname_id: 'นาย', first_name_th: 'สุดใจ', last_name_th: 'อิ่มเอม' },
  { staff_id: 1007, prefixname_id: 'นาย', first_name_th: 'สุดสาคร', last_name_th: 'ใจดี' },
  { staff_id: 1008, prefixname_id: 'นางสาว', first_name_th: 'สีดา', last_name_th: 'สีใจ' },
  { staff_id: 1009, prefixname_id: 'นาย', first_name_th: 'กฤกนก', last_name_th: 'กกกนิส' },
  { staff_id: 1010, prefixname_id: 'นาย', first_name_th: 'สุกสา', last_name_th: 'สุพล' },
  { staff_id: 701, prefixname_id: 'นาย', first_name_th: 'ผู้บันทึก', last_name_th: 'หนึ่ง' },
  { staff_id: 702, prefixname_id: 'นาง', first_name_th: 'ผู้บันทึก', last_name_th: 'สอง' },
  { staff_id: 703, prefixname_id: 'นางสาว', first_name_th: 'ผู้บันทึก', last_name_th: 'สาม' },
];

// Mock Data for Document Information
const initialAllRows: DocumentData[] = [
  { document_id: 1, staff_id: 1001, document_name: 'สัญญาจ้างงานปี 2565', document_type: 'สัญญาจ้าง', document_path: '/documents/contracts/401_contract_2565.pdf', create_at: '2022-05-15', update_at: '2023-06-10', officer_id: 701 },
  { document_id: 2, staff_id: 1002, document_name: 'ใบประกาศนียบัตรปริญญาโท', document_type: 'หลักฐานการศึกษา', document_path: '/documents/certificates/402_master_degree.pdf', create_at: '2023-01-20', update_at: '2023-05-15', officer_id: 702 },
  { document_id: 3, staff_id: 1003, document_name: 'ผลการตรวจสุขภาพประจำปี 2566', document_type: 'เอกสารสุขภาพ', document_path: '/documents/health/403_health_check_2566.pdf', create_at: '2023-03-10', update_at: '2023-06-20', officer_id: 703 },
  { document_id: 4, staff_id: 1004, document_name: 'สำเนาทะเบียนบ้าน', document_type: 'เอกสารส่วนตัว', document_path: '/documents/personal/404_house_registration.pdf', create_at: '2022-11-05', update_at: '2023-04-18', officer_id: 701 },
  { document_id: 5, staff_id: 1005, document_name: 'ใบอนุญาตประกอบวิชาชีพวิศวกรรม', document_type: 'ใบอนุญาต', document_path: '/documents/licenses/405_engineering_license.pdf', create_at: '2023-02-28', update_at: '2023-06-25', officer_id: 702 },
  { document_id: 6, staff_id: 1006, document_name: 'สลิปเงินเดือน มิถุนายน 2566', document_type: 'เอกสารการเงิน', document_path: '/documents/finance/406_payroll_256606.pdf', create_at: '2023-06-05', update_at: '2023-06-30', officer_id: 703 },
  { document_id: 7, staff_id: 1007, document_name: 'ประวัติย่อ (CV) อัปเดต 2566', document_type: 'ประวัติส่วนตัว', document_path: '/documents/resumes/407_cv_2566.pdf', create_at: '2023-01-15', update_at: '2023-05-20', officer_id: 701 },
  { document_id: 8, staff_id: 1008, document_name: 'ใบรับรองการทำงานปี 2565', document_type: 'ใบรับรอง', document_path: '/documents/certificates/408_employment_cert_2565.pdf', create_at: '2022-12-20', update_at: '2023-06-15', officer_id: 702 },
  { document_id: 9, staff_id: 1009, document_name: 'สำเนาบัตรประชาชน', document_type: 'เอกสารประจำตัว', document_path: '/documents/identification/409_id_card.pdf', create_at: '2023-04-01', update_at: '2023-06-28', officer_id: 703 },
  { document_id: 10, staff_id: 1010, document_name: 'ผลประเมินงานประจำปี 2565', document_type: 'เอกสารประเมิน', document_path: '/documents/evaluations/410_performance_2565.pdf', create_at: '2022-10-10', update_at: '2023-05-30', officer_id: 701 }
];


const TableCellWrapper = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  whiteSpace: 'nowrap',
  '&:first-of-type': {
    paddingLeft: 20,
  },
  '&:last-of-type': {
    paddingRight: 20,
  },
}));

type TableItemProps = {
  data: DocumentData;
  onView: (data: DocumentData) => void;
};

const TableItem = ({ data, onView }: TableItemProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TableRow hover key={data.document_id} className="item-hover">
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.document_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? (
          <Skeleton width={150} />
        ) : (
          (() => {
            const staff = staffDetailForTableDisplay.find(s => s.staff_id === data.staff_id);
            return staff
              ? `${staff.prefixname_id} ${staff.first_name_th} ${staff.last_name_th}`
              : `ไม่พบข้อมูลพนักงาน (ID: ${data.staff_id})`;
          })()
        )}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={200} /> : data.document_name} <MdInsertDriveFile />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={120} /> : data.document_type}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={150} /> :
          (data.document_path ? (
            <Chip
              label="ดูเอกสาร"
              component="a"
              href={data.document_path}
              target="_blank"
              clickable
              color="primary"
              size="small"
              icon={<MdLink />}
            />
          ) : 'ไม่มีเอกสาร')}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={80} /> : data.officer_id} <MdPersonOutline />
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton variant="circular" width={30} height={30} /> :
          <Button
            variant="outlined"
            size="small"
            onClick={() => onView(data)}
            startIcon={<VisibilityIcon />}
          >
            รายละเอียด
          </Button>
        }
      </TableCellWrapper>
    </TableRow>
  );
};

type Order = 'asc' | 'desc';

interface Column {
  id: keyof DocumentData | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  sortable?: boolean;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | boolean | undefined },
  b: { [key in Key]: number | string | boolean | undefined },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

type DataTableProps = {
  data: DocumentData[];
  onView: (data: DocumentData) => void;
  selectedStaffId: number | null;
}

const DataTable = ({ data, onView, selectedStaffId }: DataTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof DocumentData>('document_id');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const intl = useIntl();
  const labeltext = useMemo(() => {
    const label = intl.formatMessage({ id: 'sidebar.hr02.10' }); // สมมติว่ามี ID สำหรับเมนูนี้ (อ้างอิงจาก Document Info)
    return label;
  }, [intl]);

  const columns: readonly Column[] = useMemo(
    () => [
      { id: 'document_id', label: 'รหัสเอกสาร', minWidth: 100, sortable: true },
      { id: 'staff_id', label: 'ชื่อบุคลากร', minWidth: 150, sortable: true },
      { id: 'document_name', label: 'ชื่อเอกสาร', minWidth: 250, sortable: true },
      { id: 'document_type', label: 'ประเภทเอกสาร', minWidth: 120, sortable: true },
      { id: 'document_path', label: 'ไฟล์เอกสาร', minWidth: 150, align: 'center', sortable: false },
      { id: 'officer_id', label: 'ผู้บันทึก', minWidth: 80, sortable: true },
      { id: 'actions', label: 'Actions', minWidth: 50, align: 'right', sortable: false },
    ],
    [labeltext]
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DocumentData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onSearchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const filteredRows = useMemo(() => {
    let currentFilteredData = data;
    // Filter by searchQuery
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentFilteredData = currentFilteredData.filter((row) => {
        // Search in document_id, document_name, document_type, document_path, officer_id
        const rowMatches =
          String(row.document_id).toLowerCase().includes(lowerCaseQuery) ||
          (row.document_name && String(row.document_name).toLowerCase().includes(lowerCaseQuery)) ||
          (row.document_type && String(row.document_type).toLowerCase().includes(lowerCaseQuery)) ||
          (row.document_path && String(row.document_path).toLowerCase().includes(lowerCaseQuery)) ||
          (row.officer_id && String(row.officer_id).toLowerCase().includes(lowerCaseQuery));

        // Search in staffDetailForTableDisplay (prefixname_id, first_name_th, last_name_th)
        const staff = staffDetailForTableDisplay.find(s => s.staff_id === row.staff_id);
        const staffMatches = staff
          ? (staff.prefixname_id && String(staff.prefixname_id).toLowerCase().includes(lowerCaseQuery)) ||
            (staff.first_name_th && String(staff.first_name_th).toLowerCase().includes(lowerCaseQuery)) ||
            (staff.last_name_th && String(staff.last_name_th).toLowerCase().includes(lowerCaseQuery))
          : false;

        return rowMatches || staffMatches;
      });
    }

    // Filter by selectedStaffId
    if (selectedStaffId !== null) {
      currentFilteredData = currentFilteredData.filter(row => row.staff_id === selectedStaffId);
    }

    return stableSort(currentFilteredData, getComparator(order, orderBy));
  }, [data, searchQuery, selectedStaffId, order, orderBy]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <AppsHeader>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 1, }} >
          <AppSearchBar iconPosition="right" overlap={false} onChange={onSearchCustomer} placeholder="ค้นหา" />
        </Box>
      </AppsHeader>
      <TableContainer sx={{ maxHeight: 440 }}>
        <TableMui stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id as string}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, column.id as keyof DocumentData)}
                    >
                      {column.label}
                      {orderBy === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableItem key={row.document_id} data={row} onView={onView} />
              ))}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  ไม่พบข้อมูลเอกสารสำหรับบุคลากรคนนี้
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableMui>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

// Main DocumentInfo Component
interface DocumentInfoProps {
  selectedStaffIdProp: number | null;
}

const DocumentInfo: React.FC<DocumentInfoProps> = ({ selectedStaffIdProp }) => {
  const [currentViewTask, setCurrentViewTask] = useState<DocumentData | null>(null);
  const [openViewTask, setOpenViewTask] = useState<boolean>(false);

  const onViewTask = (data: DocumentData) => {
    setCurrentViewTask(data);
    setOpenViewTask(true);
  };
  const onCloseViewTask = () => {
    setOpenViewTask(false);
    setCurrentViewTask(null);
  };

  return (
    <AppCard>
      <DataTable data={initialAllRows} onView={onViewTask} selectedStaffId={selectedStaffIdProp} />

      <AppDialog
        maxWidth="lg"
        dividers
        open={openViewTask}
        onClose={onCloseViewTask}
        title={<IntlMessages id="common.documentInfoDetail" defaultMessage="รายละเอียดข้อมูลเอกสาร" />}
      >
        <Box sx={{ width: '100%', padding: '20px' }}>
          <TextField
            fullWidth
            label="รหัสเอกสาร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.document_id || ''}
            name="document_id"
            disabled
          />
          <TextField
            fullWidth
            label="รหัสบุคลากร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.staff_id || ''}
            name="staff_id"
            disabled
          />
          <TextField
            fullWidth
            label="ชื่อบุคลากร"
            variant="outlined"
            margin="normal"
            size="small"
            value={
              (() => {
                const staff = staffDetailForTableDisplay.find(s => s.staff_id === currentViewTask?.staff_id);
                return staff
                  ? `${staff.prefixname_id} ${staff.first_name_th} ${staff.last_name_th}`
                  : `ไม่พบข้อมูลพนักงาน (ID: ${currentViewTask?.staff_id})`;
              })()
            }
            name="staff_name"
            disabled
          />
          <TextField
            fullWidth
            label="ชื่อเอกสาร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.document_name || ''}
            name="document_name"
            disabled
          />
          <TextField
            fullWidth
            label="ประเภทเอกสาร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.document_type || ''}
            name="document_type"
            disabled
          />
          <TextField
            fullWidth
            label="ที่อยู่ไฟล์เอกสาร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.document_path || ''}
            name="document_path"
            disabled
          />
          <TextField
            fullWidth
            label="ผู้บันทึกข้อมูล"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.officer_id || ''}
            name="officer_id"
            disabled
          />
           <TextField
            fullWidth
            label="สร้างเมื่อ"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentViewTask?.create_at || ''}
            name="create_at"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
           <TextField
            fullWidth
            label="อัปเดตเมื่อ"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentViewTask?.update_at || ''}
            name="update_at"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={onCloseViewTask} color="secondary">
              ปิด
            </Button>
          </Box>
        </Box>
      </AppDialog>
    </AppCard>
  );
};

export default DocumentInfo;