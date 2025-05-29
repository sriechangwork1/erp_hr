//hr204/table/index.tsx
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
import AppsContent from '@crema/components/AppsContainer/AppsContent'; // ยังไม่ได้ใช้งานแต่คงไว้
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง ---
interface Data {
  id: number;
  prefixname_name_th: string;
  prefixname_name_en: string;
  prefixname_abb_th: string;
  prefixname_abb_en: string;
  create_at?: string;
  update_at?: string;
  officer_id?: string;
  [key: string]: any;
}

// กำหนดประเภทสำหรับทิศทางการจัดเรียง
type Order = 'asc' | 'desc';

// --- กำหนดประเภทข้อมูลสำหรับแต่ละคอลัมน์ของตาราง ---
interface Column {
  id: keyof Data | 'actions'; // เพิ่ม 'actions'
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

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง (ย้ายไปใช้ใน Hr01Page หรือดึงจาก API แทน)
const initialAllRows: Data[] = [
  {
    id: 1,
    prefixname_name_th: 'เด็กชาย',
    prefixname_name_en: 'Master',
    prefixname_abb_th: 'ด.ช.',
    prefixname_abb_en: 'Mr.',
    create_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    update_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 2,
    prefixname_name_th: 'นาย',
    prefixname_name_en: 'Mr.',
    prefixname_abb_th: 'นาย',
    prefixname_abb_en: 'Mr.',
    create_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    update_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 3,
    prefixname_name_th: 'เด็กหญิง',
    prefixname_name_en: 'Miss',
    prefixname_abb_th: 'ด.ญ.',
    prefixname_abb_en: 'Miss',
    create_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    update_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 4,
    prefixname_name_th: 'นางสาว',
    prefixname_name_en: 'Miss',
    prefixname_abb_th: 'น.ส.',
    prefixname_abb_en: 'Miss',
    create_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    update_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 5,
    prefixname_name_th: 'นาง',
    prefixname_name_en: 'Mrs.',
    prefixname_abb_th: 'นาง',
    prefixname_abb_en: 'Mrs.',
    create_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    update_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 6,
    prefixname_name_th: 'พระ',
    prefixname_name_en: 'Phra',
    prefixname_abb_th: 'พระ',
    prefixname_abb_en: 'Phra',
    create_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    update_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 7,
    prefixname_name_th: 'เดชา',
    prefixname_name_en: 'Decha',
    prefixname_abb_th: 'เดชา',
    prefixname_abb_en: 'Dcha',
    create_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    update_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 8,
    prefixname_name_th: 'ท่านผู้หญิง',
    prefixname_name_en: 'Her Excellency',
    prefixname_abb_th: 'ทph.',
    prefixname_abb_en: 'H.E.',
    create_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    update_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 9,
    prefixname_name_th: 'ท่านผู้ชาย',
    prefixname_name_en: 'His Excellency',
    prefixname_abb_th: 'ทช.',
    prefixname_abb_en: 'H.E.',
    create_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    update_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 10,
    prefixname_name_th: 'พลเอก',
    prefixname_name_en: 'General',
    prefixname_abb_th: 'พล.อ.',
    prefixname_abb_en: 'Gen.',
    create_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    update_at: new Date().toLocaleDateString('th-TH', {
      year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok'
    }),
    officer_id: 'นายเจ้าหน้า บุคคล'
  }
];


type DataTableProps = {
  data: Data[]; // เปลี่ยนชื่อ prop จาก initialData เป็น data
  setTableData: React.Dispatch<React.SetStateAction<Data[]>>; // ยังคงเก็บไว้ในกรณีที่ TableItem ต้องการ update เอง
  onView: (data: Data) => void;
  onEdit: (data: Data) => void;
  onDelete: (id: number) => void;
}

const DataTable = ({ data, setTableData, onView, onEdit, onDelete }: DataTableProps) => { // รับ prop data แทน initialData
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const intl = useIntl();

  // ไม่จำเป็นต้องใช้ useEffect นี้แล้ว เพราะข้อมูลจะถูกส่งมาจาก prop 'data' โดยตรง
  // React.useEffect(() => {
  //   setTableData(initialAllRows);
  // }, []);

  const labeltext = React.useMemo(() => {
    const label = intl.formatMessage({ id: 'sidebar.hr01.01' });
    const words = label.split("HR101 ");
    return words[1] || '';
  }, [intl]);

  const columns: readonly Column[] = React.useMemo(
    () => [
      { id: 'id', label: 'รหัส' + labeltext, minWidth: 50, sortable: true },
      { id: 'prefixname_name_th', label: labeltext + ' (TH)', minWidth: 100, sortable: true },
      { id: 'prefixname_name_en', label: labeltext + ' (EN)', minWidth: 100, sortable: true },
      { id: 'prefixname_abb_th', label: 'ชื่อย่อ' + labeltext + 'ภาษาไทย', minWidth: 70, sortable: true },
      { id: 'prefixname_abb_en', label: 'ชื่อย่อ' + labeltext + 'ภาษาอังกฤษ', minWidth: 70, sortable: true },
      { id: 'create_at', label: 'วันที่ล่าสุด', minWidth: 50, sortable: true },
      { id: 'officer_id', label: 'ผู้บันทึก', minWidth: 50, sortable: true },
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

  const { messages } = useIntl();

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงค่าใน Search Bar
  const onSearchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  // กรองข้อมูลตาม searchQuery
  const filteredRows = React.useMemo(() => {
    if (!searchQuery) {
      return data; // ใช้ prop 'data' แทน initialData
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return data.filter((row) => // ใช้ prop 'data' แทน initialData
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [data, searchQuery]); // ให้ dependency array มี data และ searchQuery

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
            placeholder="ค้นหา"//{messages['common.searchHere'] as string}
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
            {stableSort(filteredRows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableItem
                  key={row.id}
                  data={row}
                  onView={() => onView(row)}
                  onEdit={() => onEdit(row)}
                  onDelete={() => onDelete(row.id)}
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