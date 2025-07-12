// crm/index.tsx
'use client';
import React,{ useState, useEffect, useMemo} from 'react';
import {
  AppBar,
  Toolbar,
  Grid,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import {
  PeopleOutlined,
  MaleOutlined,
  FemaleOutlined,
  WorkOutline,
  PersonAddOutlined,
  TrendingDownOutlined,
  EventBusyOutlined,
  AssessmentOutlined,
  SchoolOutlined,
  BusinessOutlined,
  EmojiEventsOutlined,
  AssignmentOutlined,
} from '@mui/icons-material';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart'; 
import AnalyticsIcon from '@mui/icons-material/Analytics'; 
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import AccountTreeIcon from '@mui/icons-material/AccountTree';


import AppCard from '@crema/components/AppCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell // Added PieChart components
} from 'recharts';

// Data Imports
import { faculties, departments, positions } from './data/org_data';
import { personnel } from './data/hr_profile_data';
import { leaveRequests } from './data/leave_data';
import { evaluations, developmentPlans } from './data/performance_data';
import { jobVacancies, applications, turnoverRates } from './data/recruitment_data';
import { trainings, trainingAttendances } from './data/training_data';

// Helper: Map title to icon component and color
const getIconAndColor = (title: string): { Icon: React.ElementType; color: string ,colorback:string} => {
    switch (title) {
    case 'จำนวนบุคลากรทั้งหมด':
      return { Icon: PeopleOutlined, color: '#2196f3', colorback: 'linear-gradient(135deg,rgb(184, 231, 245) 0%, #E3F2FD 100%)' }; // Light Blue to Very Light Blue
    case 'บุคลากรชาย':
      return { Icon: MaleOutlined, color: '#1976d2', colorback: 'linear-gradient(135deg, #B2EBF2 0%, #E0F7FA 100%)' }; // Light Cyan to Very Light Cyan
    case 'บุคลากรหญิง':
      return { Icon: FemaleOutlined, color: '#e91e63', colorback: 'linear-gradient(135deg, #F8BBD0 0%, #FCE4EC 100%)' }; // Light Pink to Very Light Pink
    case 'ตำแหน่งว่างที่เปิดรับ':
      return { Icon: WorkOutline, color: '#ff9800', colorback: 'linear-gradient(135deg, #FFE0B2 0%, #FFF3E0 100%)' }; // Light Orange to Very Light Orange
    case 'จำนวนผู้สมัครทั้งหมด':
      return { Icon: PersonAddOutlined, color: '#4caf50', colorback: 'linear-gradient(135deg, #C8E6C9 0%, #E8F5E9 100%)' }; // Light Green to Very Light Green
    case 'อัตราการลาออก (ล่าสุด)':
      return { Icon: TrendingDownOutlined, color: '#f44336', colorback: 'linear-gradient(135deg, #FFCDD2 0%,rgb(248, 196, 204) 100%)' }; // Light Red to Very Light Red
    case 'คำขอลาที่รอดำเนินการ':
      return { Icon: EventBusyOutlined, color: '#9c27b0', colorback: 'linear-gradient(135deg, #E1BEE7 0%, #F3E5F5 100%)' }; // Light Purple to Very Light Purple
    case 'คะแนนประเมินเฉลี่ย (ล่าสุด)':
      return { Icon: AssessmentOutlined, color: '#673ab7', colorback: 'linear-gradient(135deg, #D1C4E9 0%, #EDE7F6 100%)' }; // Light Deep Purple to Very Light Deep Purple
    case 'จำนวนหลักสูตรฝึกอบรม':
      return { Icon: EmojiEventsOutlined, color: '#00bcd4', colorback: 'linear-gradient(135deg, #B2EBF2 0%,rgb(186, 223, 228) 100%)' }; // Light Cyan to Very Light Cyan
    case 'ผู้เข้าร่วมอบรม (ไม่ซ้ำคน)':
      return { Icon: SchoolOutlined, color: '#3f51b5', colorback: 'linear-gradient(135deg,rgb(173, 184, 252) 0%, #E8EAF6 100%)' }; // Light Indigo to Very Light Indigo
    case 'อบรมสำเร็จแล้ว':
      return { Icon: AssignmentOutlined, color: '#8bc34a', colorback: 'linear-gradient(135deg, #DCEDC8 0%, #F1F8E9 100%)' }; // Light Light Green to Very Light Light Green
    case 'จำนวนคณะ/หน่วยงาน':
      return { Icon: BusinessOutlined, color: '#795548', colorback: 'linear-gradient(135deg,rgb(238, 204, 191) 0%,rgb(247, 221, 208) 100%)' }; // Light Brown to Very Light Brown
    case 'จำนวนแผนก/ภาควิชา':
      return { Icon: BusinessOutlined, color: '#607d8b', colorback: 'linear-gradient(135deg,rgb(176, 225, 245) 0%,rgb(169, 215, 247) 100%)' }; // Light Blue Grey to Very Light Blue Grey
    case 'จำนวนตำแหน่งงาน':
      return { Icon: WorkOutline, color: '#9e9e9e', colorback: 'linear-gradient(135deg, #E0E0E0 0%, #F5F5F5 100%)' }; // Light Grey to Very Light Grey
    default:
      return { Icon: PeopleOutlined, color: '#607d8b', colorback: 'linear-gradient(135deg,rgb(238, 230, 155) 0%,rgb(255, 252, 224) 100%)' }; // Default
  }
};

// Mock Data for Dashboard Summary Cards
const mockDashboardSummary = {
  requisitions: 150,
  pendingQuotations: 25,
  purchaseOrders: 80,
  pendingReceipts: 15,
  activeGuarantees: 45,
  newVendors: 5,
  totalContractValue: 12500000,
  savingsLastMonth: 120000,
  // Data for Donut Chart - Example procurement methods distribution
  procurementMethods: [
    { name: 'ข้าราชการ', value: 300, color: '#FFD700' },
    { name: 'พนักงานมหาวิทยาลัย', value: 150, color: '#F6C6C7' },
    { name: 'ลูกจ้างประจำ', value: 100, color: '#92CEA8' },
    { name: 'ลูกจ้างชั่วคราว', value: 50, color: '#8BD2EC' },
  ]
};



// Component จำลองสำหรับ Card แสดงข้อมูลสรุป
const StatCard: React.FC<{ title: string; value: string | number; description?: string }> = ({
  title,
  value,
  description,
}) => {
  const { Icon, color,colorback } = getIconAndColor(title);
  return (
    <AppCard
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '20px',
        margin: '10px 0',
        borderRadius: '12px', //add new 
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)', //add new
        background:colorback, //'linear-gradient(135deg, #fff3e0 0%,' + colorback + ' 100%)'  //add new
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Icon sx={{ fontSize: 40, color: color, marginRight: '15px' }} />
        <Typography
          variant="h6"
          sx={{
            margin: 0,
            color: '#333',
            //fontFamily: Fonts.PRIMARY,
            flexGrow: 1,
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          margin: '10px 0',
          color: color,
          //fontFamily: Fonts.PRIMARY,
        }}
      >
        {value}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.9em',
            color: '#666',
            marginTop: '5px',
            //fontFamily: Fonts.PRIMARY,
          }}
        >
          {description}
        </Typography>
      )}
    </AppCard>
  );
};


// Component จำลองสำหรับ Table (แสดงเป็นแค่ List)
const TablePlaceholder: React.FC<{ title: string; data: any[] }> = ({ title, data }) => (
  <AppCard
    sx={{
      padding: '20px',
      margin: '0',
    }}
  >
    <Typography variant="h6" sx={{ margin: '0 0 15px 0', color: '#333', 
      //fontFamily: Fonts.PRIMARY 
      }}>
      {title}
    </Typography>
    <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
      {data.length > 0 ? (
        <Table className="table" stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              {Object.keys(data[0]).map((key) => (
                <TableCell
                  key={key}
                  component="th"
                  scope="col"
                  sx={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left', 
                    //fontFamily: Fonts.PRIMARY 
                  }}
                >
                  {key}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, 5).map((row, index) => (
              <TableRow key={index} hover>
                {Object.values(row).map((val: any, idx) => (
                  <TableCell
                    key={idx}
                    sx={{ padding: '8px', borderBottom: '1px solid #eee', 
                      //fontFamily: Fonts.PRIMARY 
                    }}
                  >
                    {typeof val === 'boolean' ? (val ? 'Yes' : 'No') : val}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography sx={{ 
          //fontFamily: Fonts.PRIMARY
        }}>ไม่มีข้อมูล</Typography>
      )}
    </Box>
    {data.length > 5 && (
      <Typography variant="body2" sx={{ fontSize: '0.9em', color: '#888', marginTop: '10px', 
      //fontFamily: Fonts.PRIMARY 
      }}>
        * แสดงข้อมูล {data.slice(0, 5).length} รายการจากทั้งหมด {data.length} รายการ
      </Typography>
    )}
  </AppCard>
);

const HRDashboard: React.FC = () => {
  // 1. คำนวณข้อมูลสำหรับภาพรวมบุคลากร
  const totalPersonnel = personnel.length;
  const malePersonnel = personnel.filter((p) => p.GENDER === 'ชาย').length;
  const femalePersonnel = personnel.filter((p) => p.GENDER === 'หญิง').length;
  const personnelByType = personnel.reduce((acc, p) => {
    acc[p.PERSONNELTYPE] = (acc[p.PERSONNELTYPE] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  // แปลงข้อมูล personnelByType ให้อยู่ในรูปแบบที่ Recharts ต้องการ
  const personnelByTypeData = Object.entries(personnelByType).map(([name, value]) => ({ name, value }));

  // 2. คำนวณข้อมูลสำหรับอัตรากำลังคน
  const openVacancies = jobVacancies.filter((v) => v.STATUS === 'เปิดรับสมัคร').length;
  const totalApplicants = applications.length;
  const latestTurnoverRate = turnoverRates.length > 0 ? turnoverRates[turnoverRates.length - 1].TURNOVER_RATE : 0;

  // 3. คำนวณข้อมูลการลา
  const pendingLeaveRequests = leaveRequests.filter((req) => req.STATUS === 'รออนุมัติ').length;
  const leaveSummary = leaveRequests.reduce((acc, req) => {
    acc[req.LEAVETYPE] = (acc[req.LEAVETYPE] || 0) + req.DAYS;
    return acc;
  }, {} as Record<string, number>);
  // แปลงข้อมูล leaveSummary ให้อยู่ในรูปแบบที่ Recharts ต้องการ
  const leaveSummaryData = Object.entries(leaveSummary).map(([name, value]) => ({ name, value }));

  // 4. คำนวณข้อมูลการประเมินผลการปฏิบัติงาน
  const totalScores = evaluations.reduce((sum, evalItem) => sum + evalItem.SCORE, 0);
  const averageScore = evaluations.length > 0 ? (totalScores / evaluations.length).toFixed(2) : 'N/A';
  const gradeCounts = evaluations.reduce((acc, evalItem) => {
    acc[evalItem.GRADE] = (acc[evalItem.GRADE] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  // แปลงข้อมูล gradeCounts ให้อยู่ในรูปแบบที่ Recharts ต้องการ
  const gradeCountsData = Object.entries(gradeCounts).map(([name, value]) => ({ name, value }));


  // 5. คำนวณข้อมูลการฝึกอบรม
  const totalTrainings = trainings.length;
  const uniqueAttendees = new Set(trainingAttendances.map((att) => att.PERSONNELID)).size;
  const completedTrainings = trainingAttendances.filter((att) => att.ATTENDED).length;

  // 6. คำนวณข้อมูลโครงสร้างองค์กร
  const totalFaculties = faculties.length;
  const totalDepartments = departments.length;
  const totalPositions = positions.length;

  // Data for the Procurement Stages Bar Chart
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const stafftypeStageData = useMemo(() => ([
    { name: 'ข้าราชการ', 'จำนวน': mockDashboardSummary.requisitions, color: '#FFF3D7' },
    { name: 'พนักงานมหาวิทยาลัย', 'จำนวน': mockDashboardSummary.pendingQuotations, color: '#FCEE9E' },
    { name: 'ลูกจ้างประจำ', 'จำนวน': mockDashboardSummary.purchaseOrders, color: '#F6C6C7' },
    { name: 'ลูกจ้างชั่วคราว', 'จำนวน': mockDashboardSummary.pendingReceipts, color: '#92CEA8' },
  ]), []);

 
  return (
    <Box sx={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f7f6' }}>
      <AppBar position="static" sx={{ backgroundColor: '#FFD700', color: '#000', borderRadius: '8px 8px 0 0' }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', mb: 2, color: '#333',textAlign: 'center' }}>
            <SpaceDashboardIcon sx={{ mr: 1 }} /> Dashboard ระบบบริหารงานบุคคล
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Overview Section */}
      <Box component="section" sx={{ marginBottom: '40px' ,mt:3}}>
        <Typography
          variant="h5"
          sx={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px',
            display: 'flex', alignItems: 'center', mb: 3,
          }}
        >
         <DashboardIcon sx={{ mr: 1 }} />  ภาพรวมบุคลากร
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard title="จำนวนบุคลากรทั้งหมด" value={totalPersonnel} description="จำนวนพนักงานและเจ้าหน้าที่ทั้งหมด" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard
              title="บุคลากรชาย"
              value={malePersonnel}
              description={`คิดเป็น ${(malePersonnel / totalPersonnel * 100).toFixed(1)}%`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard
              title="บุคลากรหญิง"
              value={femalePersonnel}
              description={`คิดเป็น ${(femalePersonnel / totalPersonnel * 100).toFixed(1)}%`}
            />
          </Grid>
          {Object.entries(personnelByType).map(([type, count]) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={type} >
              <StatCard title={`บุคลากรประเภท ${type}`}
               value={count} 
               description={`จากทั้งหมด ${totalPersonnel} คน`} 
               />
            </Grid>
          ))}
        </Grid>
      </Box>



        {/* Charts Section */}
<Grid container spacing={isMobile ? 2 : 4} sx={{ mb: 4 }}>
<Grid item xs={12} md={6}>
<Box component="section" sx={{marginBottom: '40px' }}>

   <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3, color: '#333' }}>
              <TableChartIcon sx={{ mr: 1 }} /> ภาพรวมบุคลากร ตามประเภท
            </Typography>
            <Paper elevation={2} sx={{ p: isMobile ? 2 : 3, borderRadius: '12px', height: isMobile ? '300px' : '400px' }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stafftypeStageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis
                            dataKey="name"
                            interval={0}
                            tick={{ fill: '#555', textAnchor: 'end' }}
                            height={60}
                            />
                    <YAxis tick={{ fill: '#555' }} />
                    <Tooltip
                      cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                      contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderColor: '#e0e0e0' }}
                      labelStyle={{ fontWeight: 'bold', color: '#333' }}
                      itemStyle={{ color: '#333' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '10px' }} />
                    <Bar dataKey="จำนวน" fill="#FFD700" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Paper>

</Box>
</Grid>

<Grid item xs={12} md={6}>
<Box component="section" sx={{marginBottom: '40px' }}>
    <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3, color: '#333' }}>
              <AnalyticsIcon sx={{ mr: 1 }} /> บุคลากรตามประเภท
            </Typography>
            <Paper elevation={2} sx={{ p: isMobile ? 2 : 3, borderRadius: '12px', height: isMobile ? '300px' : '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockDashboardSummary.procurementMethods}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockDashboardSummary.procurementMethods.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderColor: '#e0e0e0' }}
                      labelStyle={{ fontWeight: 'bold', color: '#333' }}
                      itemStyle={{ color: '#333' }}
                      formatter={(value: number, name: string) => [`${value} รายการ`, name]}
                    />
                    <Legend wrapperStyle={{ paddingTop: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Paper>
</Box>
</Grid>
</Grid>


      {/* Recruitment & Turnover Section */}
      <Box component="section" sx={{ marginBottom: '40px' }}>
        <Typography
          variant="h5"
          sx={{borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px', 
           display: 'flex', alignItems: 'center', mb: 3, color: '#333'
          }}
        >
          <PeopleIcon sx={{ mr:1 }} />
          อัตรากำลังและการสรรหา
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard title="ตำแหน่งว่างที่เปิดรับ" value={openVacancies} description="จำนวนตำแหน่งที่กำลังเปิดรับสมัคร" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard title="จำนวนผู้สมัครทั้งหมด" value={totalApplicants} description="รวมทุกตำแหน่งที่เปิดรับ" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard
              title="อัตราการลาออก (ล่าสุด)"
              value={`${latestTurnoverRate}%`}
              description={`ข้อมูล ณ ${turnoverRates.length > 0 ? turnoverRates[turnoverRates.length - 1].YEAR_MONTH : '-'}`}
            />
          </Grid>
        </Grid>
        {/* **ลบ ChartPlaceholder ออก** */}
        {/* <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          <Grid item xs={12} md={6}>
            <ChartPlaceholder title="กราฟอัตราการลาออกรายเดือน" />
          </Grid> */}
          <Grid item xs={12} md={6} sx={{pt:5}}>
            <TablePlaceholder title="รายการตำแหน่งว่าง" data={jobVacancies.filter((v) => v.STATUS === 'เปิดรับสมัคร')} />
          </Grid>
        {/* </Grid> */}
      </Box>

      {/* Leave Management Section */}
      <Box component="section" sx={{ marginBottom: '40px' }}>
        <Typography
          variant="h5"
          sx={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px', 
          display: 'flex', alignItems: 'center', mb: 3,
          }}
        >
          <AccessTimeFilledIcon sx={{mr:1}}/>
          การบริหารจัดการการลา
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard title="คำขอลาที่รอดำเนินการ" value={pendingLeaveRequests} description="จำนวนคำขอที่รอการอนุมัติ" />
          </Grid>
          {Object.entries(leaveSummary).map(([type, days]) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={type}>
              <StatCard title={`จำนวนวัน${type}`} value={`${days} วัน`} description="รวมทุกคำขอที่อนุมัติ/รออนุมัติ" />
            </Grid>
          ))}
        </Grid>
        {/* **ลบ ChartPlaceholder ออก** */}
        {/* <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          <Grid item xs={12} md={6}>
            <ChartPlaceholder title="กราฟสถิติประเภทการลา" />
          </Grid> */}
          <Grid item xs={12} md={6} sx={{pt:5}}>
            <TablePlaceholder title="รายการคำขอลาล่าสุด" data={leaveRequests.slice(0, 5)} />
          </Grid>
        {/* </Grid> */}
      </Box>

      {/* Performance Evaluation Section */}
      <Box component="section" sx={{ marginBottom: '40px' }}>
        <Typography
          variant="h5"
          sx={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px', 
             display: 'flex', alignItems: 'center', mb: 3,
            }}
        >
          <AssessmentIcon sx={{mr:1}}/>
          การประเมินผลการปฏิบัติงาน
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard
              title="คะแนนประเมินเฉลี่ย (ล่าสุด)"
              value={averageScore}
              description={`จากบุคลากร ${evaluations.length} คน`}
            />
          </Grid>
          {Object.entries(gradeCounts).map(([grade, count]) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={grade}>
              <StatCard title={`จำนวน (เกรด ${grade})`} value={count} description="จำนวนบุคลากรที่ได้เกรดนี้" />
            </Grid>
          ))}
        </Grid>
        {/* **ลบ ChartPlaceholder ออก** */}
        {/* <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          <Grid item xs={12} md={6}>
            <ChartPlaceholder title="กราฟการกระจายเกรดการประเมิน" />
          </Grid> */}
          <Grid item xs={12} md={6} sx={{pt:5}}>
            <TablePlaceholder title="รายการประเมินล่าสุด" data={evaluations} />
          </Grid>
        {/* </Grid> */}
      </Box>

      {/* Training & Development Section */}
      <Box component="section" sx={{ marginBottom: '40px' }}>
        <Typography
          variant="h5"
          sx={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px', 
            display: 'flex', alignItems: 'center', mb: 3,
           }}
        >

          <ModelTrainingIcon sx={{mr:1}}/>
          การฝึกอบรมและพัฒนา
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard title="จำนวนหลักสูตรฝึกอบรม" value={totalTrainings} description="หลักสูตรที่จัดขึ้นในปีนี้" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard title="ผู้เข้าร่วมอบรม (ไม่ซ้ำคน)" value={uniqueAttendees} description="จำนวนบุคลากรที่เข้าร่วมอบรม" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard
              title="อบรมสำเร็จแล้ว"
              value={completedTrainings}
              description="จำนวนครั้งที่บุคลากรเข้าร่วมอบรมสำเร็จ"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          <Grid item xs={12} md={6}>
            <TablePlaceholder title="หลักสูตรฝึกอบรมที่กำลังจะมาถึง" data={trainings} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TablePlaceholder
              title="แผนพัฒนาบุคลากร (IDP) ที่รอดำเนินการ"
              data={developmentPlans.filter((dp) => dp.STATUS !== 'สำเร็จ')}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Organization Structure Section */}
      <Box component="section" sx={{ marginBottom: '40px' }}>
        <Typography
          variant="h5"
          sx={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px', 
            display: 'flex', alignItems: 'center', mb: 3,
            }}
        >
         
          <AccountTreeIcon sx={{mr:1}}/>
          โครงสร้างองค์กร
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard title="จำนวนคณะ/หน่วยงาน" value={totalFaculties} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard title="จำนวนแผนก/ภาควิชา" value={totalDepartments} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <StatCard title="จำนวนตำแหน่งงาน" value={totalPositions} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          <Grid item xs={12} md={6}>
            <TablePlaceholder title="รายชื่อคณะ/หน่วยงาน" data={faculties} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TablePlaceholder title="รายชื่อตำแหน่งงาน" data={positions} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HRDashboard;


 
 