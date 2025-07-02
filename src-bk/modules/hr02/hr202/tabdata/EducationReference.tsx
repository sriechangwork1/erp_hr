// tabdata/EducationReference.tsx
'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppSelect from '@crema/components/AppSelect';
import Button from '@mui/material/Button'; // นำเข้า Button
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
// import AppMenu from '@crema/components/AppMenu'; // ไม่ได้ใช้แล้ว
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlinePersonalInjury } from "react-icons/md";
import SchoolIcon from '@mui/icons-material/School';
import VisibilityIcon from '@mui/icons-material/Visibility'; // เพิ่มไอคอนสำหรับปุ่ม "ดูรายละเอียด"

// Data Interface
interface Data {
  education_id: number;
  staff_id?: number;
  isced_code?: string;
  academic_degree_name?: string;
  academic_degree_abb?: string;
  degree?: string;
  major?: string;
  institution?: string;
  country?: string;
  graduation_date?: string;
  gpa?: number;
  create_at?: string;
  update_at?: string;
  officer_id?: string;
  academic_degree_status?: string;
  [key: string]: any;
}

// Staff AutoComplete Option Interface (ประกาศไว้เพื่อความชัดเจน)
interface StaffAutoCompleteOption {
  staff_id: number;
  prefixname_id: string;
  first_name_th: string;
  last_name_th: string;
}

// Mock Data (ยังคงอยู่เพื่อการทดสอบ)
const initialAllRows: Data[] = [
  {
    education_id: 1, staff_id: 1001, isced_code: '0203', academic_degree_name: 'วิทยาศาสตรบัณฑิต',
    academic_degree_abb: 'วท.บ.', degree: 'ปริญญาตรี', major: 'วิทยาการคอมพิวเตอร์',
    institution: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี', country: 'ไทย', graduation_date: '2015-05-15',
    gpa: 3.25, create_at: '2025-05-25', update_at: '2025-05-25', officer_id: 'นายเจ้าหน้าที่ บุคคล',
    academic_degree_status: 'Current'
  },
  {
    education_id: 2, staff_id: 1002, isced_code: '0413', academic_degree_name: 'บริหารธุรกิจมหาบัณฑิต',
    academic_degree_abb: 'บธ.ม.', degree: 'ปริญญาโท', major: 'การตลาดดิจิทัล',
    institution: 'มหาวิทยาลัยธรรมศาสตร์', country: 'ไทย', graduation_date: '2018-03-20',
    gpa: 3.75, create_at: '2025-05-25', update_at: '2025-05-25', officer_id: 'นายเจ้าหน้าที่ บุคคล',
    academic_degree_status: 'Current'
  },
  {
    education_id: 3, staff_id: 1003, isced_code: '1011', academic_degree_name: 'ปรัชญาดุษฎีบัณฑิต',
    academic_degree_abb: 'ปร.ด.', degree: 'ปริญญาเอก', major: 'วิศวกรรมไฟฟ้า',
    institution: 'Stanford University', country: 'สหรัฐอเมริกา', graduation_date: '2020-08-10',
    gpa: 3.90, create_at: '2025-05-25', update_at: '2025-05-25', officer_id: 'นายเจ้าหน้าที่ บุคคล',
    academic_degree_status: 'Current'
  },
  {
    education_id: 4, staff_id: 1004, isced_code: '0314', academic_degree_name: 'ศิลปศาสตรบัณฑิต',
    academic_degree_abb: 'ศศ.บ.', degree: 'ปริญญาตรี', major: 'ภาษาอังกฤษ',
    institution: 'มหาวิทยาลัยเชียงใหม่', country: 'ไทย', graduation_date: '2010-04-05',
    gpa: 3.10, create_at: '2025-05-25', update_at: '2025-05-25', officer_id: 'นายเจ้าหน้าที่ บุคคล',
    academic_degree_status: 'Past'
  },
  {
    education_id: 5, staff_id: 1005, isced_code: '0710', academic_degree_name: 'วิศวกรรมศาสตรมหาบัณฑิต',
    academic_degree_abb: 'วศ.ม.', degree: 'ปริญญาโท', major: 'วิศวกรรมโยธา',
    institution: 'Imperial College London', country: 'สหราชอาณาจักร', graduation_date: '2017-11-15',
    gpa: 3.80, create_at: '2025-05-25', update_at: '2025-05-25', officer_id: 'นายเจ้าหน้าที่ บุคคล',
    academic_degree_status: 'Current'
  },
  {
    education_id: 6, staff_id: 1006, isced_code: '0222', academic_degree_name: 'วิทยาศาสตรมหาบัณฑิต',
    academic_degree_abb: 'วท.ม.', degree: 'ปริญญาโท', major: 'เทคโนโลยีสารสนเทศ',
    institution: 'จุฬาลงกรณ์มหาวิทยาลัย', country: 'ไทย', graduation_date: '2019-10-25',
    gpa: 3.65, create_at: '2025-05-25', update_at: '2025-05-25', officer_id: 'นายเจ้าหน้าที่ บุคคล',
    academic_degree_status: 'Current'
  },
  {
    education_id: 7, staff_id: 1007, isced_code: '0514', academic_degree_name: 'นิติศาสตรบัณฑิต',
    academic_degree_abb: 'น.บ.', degree: 'ปริญญาตรี', major: 'นิติศาสตร์',
    institution: 'มหาวิทยาลัยรามคำแหง', country: 'ไทย', graduation_date: '2012-07-30',
    gpa: 2.85, create_at: '2025-05-25', update_at: '2025-05-25', officer_id: 'นายเจ้าหน้าที่ บุคคล',
    academic_degree_status: 'Past'
  }
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
  data: Data;
  onView: (data: Data) => void;
};

// แยก staffDetail สำหรับแสดงในตารางออกจาก staffDetail สำหรับ Autocomplete เพื่อให้ชัดเจน
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
  { staff_id: 1011, prefixname_id: 'นางสาว', first_name_th: 'สมใจ', last_name_th: 'ใสจม' },
  { staff_id: 1012, prefixname_id: 'นางสาว', first_name_th: 'หฤทัย', last_name_th: 'ใจตรง' }
];

const TableItem = ({ data, onView }: TableItemProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TableRow hover key={data.education_id} className="item-hover">
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.education_id}
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
        {isLoading ? <Skeleton width={150} /> : data.academic_degree_name}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : data.degree}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={120} /> : data.major}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ?
          <Skeleton width={200} /> : data.institution} <SchoolIcon fontSize="small" />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ?
          <Skeleton width={120} /> : data.graduation_date} <MdCalendarMonth />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ?
          <Skeleton width={80} /> : data.gpa?.toFixed(2)}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ?
          <Skeleton width={100} /> : data.academic_degree_status}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ?
          <Skeleton width={80} /> : data.officer_id} <MdOutlinePersonalInjury />
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ?
          <Skeleton variant="circular" width={30} height={30} /> :
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
  id: keyof Data | 'actions';
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
  data: Data[];
  onView: (data: Data) => void;
  selectedStaffId: number | null;
}

const DataTable = ({ data, onView, selectedStaffId }: DataTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('education_id');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const intl = useIntl();
  const labeltext = useMemo(() => {
    const label = intl.formatMessage({ id: 'sidebar.hr02.03' });
    const words = label.split("EducationReference ");
    return words[1];
  }, [intl]);

  const columns: readonly Column[] = useMemo(
    () => [
      { id: 'education_id', label: 'รหัส', minWidth: 50, sortable: true },
      { id: 'staff_id', label: 'ชื่อบุคลากร', minWidth: 150, sortable: true },
      { id: 'academic_degree_name', label: 'ชื่อปริญญา', minWidth: 150, sortable: true },
      { id: 'degree', label: 'ระดับการศึกษา', minWidth: 100, sortable: true },
      { id: 'major', label: 'สาขา', minWidth: 120, sortable: true },
      { id: 'institution', label: 'สถานศึกษา', minWidth: 200, sortable: true },
      { id: 'graduation_date', label: 'วันที่สำเร็จการศึกษา', minWidth: 120, sortable: true },
      { id: 'gpa', label: 'GPA', minWidth: 80, sortable: true },
      { id: 'academic_degree_status', label: 'สถานะ', minWidth: 100, sortable: true },
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
    property: keyof Data,
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
      currentFilteredData = currentFilteredData.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
    // Filter by selectedStaffId
    if (selectedStaffId !== null) {
      currentFilteredData = currentFilteredData.filter(row => row.staff_id === selectedStaffId);
    }
    return currentFilteredData;
  }, [data, searchQuery, selectedStaffId]);

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
                      onClick={(event) => handleRequestSort(event, column.id as keyof Data)}
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
                <TableItem key={row.education_id} data={row} onView={onView} />
              ))}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  ไม่พบข้อมูลการศึกษาสำหรับบุคลากรคนนี้
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

// Main EducationReference Component
interface EducationReferenceProps {
  selectedStaffIdProp: number | null;
}

const EducationReference: React.FC<EducationReferenceProps> = ({ selectedStaffIdProp }) => {
  const [currentViewTask, setCurrentViewTask] = useState<Data | null>(null);
  const [openViewTask, setOpenViewTask] = useState<boolean>(false);

  const onViewTask = (data: Data) => {
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
        title={<IntlMessages id="common.educationDetail" defaultMessage="รายละเอียดข้อมูลการศึกษา" />}
      >
        <Box sx={{ width: '100%', padding: '20px' }}>
          <TextField
            fullWidth
            label="รหัสการศึกษา"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.education_id || ''}
            name="education_id"
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
            label="รหัส ISCED"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.isced_code || ''}
            name="isced_code"
            disabled
          />
          <TextField
            fullWidth
            label="ชื่อปริญญา"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.academic_degree_name || ''}
            name="academic_degree_name"
            disabled
          />
          <TextField
            fullWidth
            label="ชื่อย่อปริญญา"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.academic_degree_abb || ''}
            name="academic_degree_abb"
            disabled
          />
          <TextField
            fullWidth
            label="ระดับการศึกษา"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.degree || ''}
            name="degree"
            disabled
          />
          <TextField
            fullWidth
            label="สาขา"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.major || ''}
            name="major"
            disabled
          />
          <TextField
            fullWidth
            label="สถาบัน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.institution || ''}
            name="institution"
            disabled
          />
          <TextField
            fullWidth
            label="ประเทศ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.country || ''}
            name="country"
            disabled
          />
          <TextField
            fullWidth
            label="วันที่สำเร็จการศึกษา"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentViewTask?.graduation_date || ''}
            name="graduation_date"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="ผลการเรียนเฉลี่ย (GPA)"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.gpa || ''}
            name="gpa"
            type="number"
            inputProps={{ step: "0.01" }}
            disabled
          />
          <TextField
            fullWidth
            label="สถานะวุฒิการศึกษา"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.academic_degree_status || ''}
            name="academic_degree_status"
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

export default EducationReference;
