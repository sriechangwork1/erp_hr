// rp101/table/index.tsx
import * as React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Rp101TableItem from './TableItem'; // ตรวจสอบชื่อและ path
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import { useIntl } from 'react-intl';
import AppSearchBar from '@crema/components/AppSearchBar';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง ---
interface FacultyData {
  FACULTYID: string;
  FACULTYNAME: string;
  FACULTYNAMEENG: string | null;
  FACULTYTYPEID: number;
  BUILDING: string | null;
  SUBDISTRICT: string | null;
  DISTRICT: string | null;
  PROVINCE: string | null;
  POSTCODE: number;
  PHONE: string | null;
  FAX: string | null;
  PHONEIN: string | null;
  EMAIL: string | null;
  FACSTATUS: string | null;
  REMARK: string | null;
  STAFFID: string | null;
  CREATEDATE: string | null;
  BUDGETTYPEID: string | null;
  GROUPID: string | null;
  REF_FAC: string | null;
}

type Order = 'asc' | 'desc';

interface Column {
  id: keyof FacultyData | 'actions';
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
  a: { [key in Key]: number | string | boolean | undefined | null }, // เพิ่ม null เป็นไปได้
  b: { [key in Key]: number | string | boolean | undefined | null },
) => number {
  return order === 'desc'
    ?
    (a, b) => {
        const valA = a[orderBy] === null || a[orderBy] === undefined ? '' : String(a[orderBy]);
        const valB = b[orderBy] === null || b[orderBy] === undefined ? '' : String(b[orderBy]);
        return descendingComparator(valA, valB, '0' as any); // ต้องเทียบ String ด้วย String
    }
    : (a, b) => {
        const valA = a[orderBy] === null || a[orderBy] === undefined ? '' : String(a[orderBy]);
        const valB = b[orderBy] === null || b[orderBy] === undefined ? '' : String(b[orderBy]);
        return -descendingComparator(valA, valB, '0' as any);
    };
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
  data: FacultyData[]; // ข้อมูลที่ถูกกรองจาก parent
  onView: (data: FacultyData) => void;
}

const Rp101Table = ({ data, onView }: DataTableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof FacultyData>('FACULTYID');
  const [searchQuery, setSearchQuery] = React.useState<string>(''); // Search Bar ภายในตาราง

  const { messages } = useIntl();

  const columns: readonly Column[] = React.useMemo(
    () => [
      { id: 'FACULTYID', label: 'รหัสหน่วยงาน', minWidth: 100, sortable: true },
      { id: 'FACULTYNAME', label: 'ชื่อหน่วยงาน', minWidth: 250, sortable: true },
      { id: 'FACULTYNAMEENG', label: 'ชื่อหน่วยงาน (ENG)', minWidth: 150, sortable: true },
      { id: 'FACULTYTYPEID', label: 'ประเภทหน่วยงาน ID', minWidth: 100, sortable: true, align: 'center' },
      { id: 'BUILDING', label: 'อาคาร', minWidth: 100, sortable: true },
      { id: 'PHONE', label: 'เบอร์โทรศัพท์', minWidth: 120, sortable: true },
      { id: 'EMAIL', label: 'อีเมล', minWidth: 150, sortable: true },
     /* { id: 'REF_FAC', label: 'รหัสอ้างอิง', minWidth: 100, sortable: true },
      { id: 'actions', label: 'Actions', minWidth: 80, align: 'right', sortable: false },*/
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
    property: keyof FacultyData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงค่าใน Search Bar ภายในตาราง
  const onSearchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  // กรองข้อมูลตาม searchQuery ภายในตาราง (จากข้อมูลที่ได้รับมา)
  const filteredRows = React.useMemo(() => {
    if (!searchQuery) {
      return data; // ถ้าไม่มี search query ก็คืนข้อมูลที่ได้รับมาทั้งหมด
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return data.filter((row) =>
      // ค้นหาในทุก property ที่เป็น string หรือแปลงเป็น string ได้
      Object.values(row).some((value) =>
        String(value || '').toLowerCase().includes(lowerCaseQuery) // ใช้ String(value || '') เพื่อป้องกัน null/undefined
      )
    );
  }, [data, searchQuery]); // data เป็น dependency เพราะจะกรองจาก data ที่ได้รับ

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
            placeholder="ค้นหา (ในผลลัพธ์ที่กรองแล้ว)"
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
                      onClick={(event) => handleRequestSort(event, column.id as keyof FacultyData)}
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
                <Rp101TableItem
                  key={row.FACULTYID} // ใช้ FACULTYID เป็น key
                  data={row}
                  onView={() => onView(row)}
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
export default Rp101Table;