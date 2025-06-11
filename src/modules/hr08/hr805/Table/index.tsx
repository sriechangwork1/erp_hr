//hr805/table/index.tsx
import * as React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableItem from './TableItem';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import { useIntl } from 'react-intl';
import AppSearchBar from '@crema/components/AppSearchBar';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลการฝึกอบรมการลาศึกษา ---
interface LeaveStudyTrainingData {
  training_id: number;
  staff_id: number;
  course_name: string;
  organizer: string;
  location: string;
  event_date: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// กำหนดประเภทสำหรับทิศทางการจัดเรียง
type Order = 'asc' | 'desc';

// --- กำหนดประเภทข้อมูลสำหรับแต่ละคอลัมน์ของตาราง ---
interface Column {
  id: keyof LeaveStudyTrainingData | 'actions'; // เปลี่ยนเป็น keyof LeaveStudyTrainingData
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  sortable?: boolean;
}

// ฟังก์ชันเปรียบเทียบสำหรับจัดเรียง
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// ฟังก์ชันรับ comparator ที่เหมาะสมกับการจัดเรียง
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

// ฟังก์ชันจัดเรียงข้อมูล
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
  data: LeaveStudyTrainingData[]; // เปลี่ยนเป็น LeaveStudyTrainingData[]
  setTableData: React.Dispatch<React.SetStateAction<LeaveStudyTrainingData[]>>; // เปลี่ยนเป็น LeaveStudyTrainingData[]
  onView: (data: LeaveStudyTrainingData) => void;
  onEdit: (data: LeaveStudyTrainingData) => void;
  onDelete: (id: number) => void;
}

const DataTable = ({ data, setTableData, onView, onEdit, onDelete }: DataTableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof LeaveStudyTrainingData>('training_id'); // เปลี่ยนเป็น training_id
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const intl = useIntl();

  const labeltext = React.useMemo(() => {
    const label = intl.formatMessage({ id: 'sidebar.hr08.05' }); // เปลี่ยน id
    const words = label.split("HR805 "); // เปลี่ยน HR106 เป็น HR107
    return words[1] || '';
  }, [intl]);

  const columns: readonly Column[] = React.useMemo(
    () => [
      { id: 'training_id', label: 'รหัสการฝึกอบรม', minWidth: 50, sortable: true },
      { id: 'staff_id', label: 'รหัสบุคลากร', minWidth: 80, sortable: true },
      { id: 'course_name', label: 'ชื่อหลักสูตร', minWidth: 150, sortable: true },
      { id: 'organizer', label: 'ผู้จัด', minWidth: 100, sortable: true },
      { id: 'location', label: 'สถานที่', minWidth: 100, sortable: true },
      { id: 'event_date', label: 'วันที่จัดกิจกรรม', minWidth: 120, sortable: true },
      { id: 'create_at', label: 'สร้างเมื่อ', minWidth: 100, sortable: true },
      { id: 'update_at', label: 'แก้ไขล่าสุด', minWidth: 100, sortable: true },
      { id: 'officer_id', label: 'ผู้บันทึก', minWidth: 80, sortable: true },
      { id: 'actions', label: 'Actions', minWidth: 100, align: 'right', sortable: false },
    ],
    [], 
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
    property: keyof LeaveStudyTrainingData, // เปลี่ยนเป็น keyof LeaveStudyTrainingData
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const { messages } = useIntl();

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงค่าใน Search Bar
  const onSearchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  // กรองข้อมูลตาม searchQuery
  const filteredRows = React.useMemo(() => {
    if (!searchQuery) {
      return data; 
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return data.filter((row) => 
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [data, searchQuery]); 

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <AppsHeader>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: 1,
          }}
        >
          <AppSearchBar
            iconPosition="right"
            overlap={false}
            onChange={onSearchCustomer}
            placeholder="ค้นหา"
          />
        </Box>
      </AppsHeader>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
                      onClick={(event) => handleRequestSort(event, column.id as keyof LeaveStudyTrainingData)} // เปลี่ยนเป็น keyof LeaveStudyTrainingData
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
            {stableSort(filteredRows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableItem
                  key={row.training_id} // เปลี่ยน key เป็น training_id
                  data={row}
                  onView={() => onView(row)}
                  onEdit={() => onEdit(row)}
                  onDelete={() => onDelete(row.training_id)} // เปลี่ยน onDelete เป็น training_id
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
export default DataTable;