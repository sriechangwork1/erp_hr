// crm/index.tsx
// import React from 'react';
// import {
//   Grid,
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from '@mui/material';
// import {
//   PeopleOutlined,
//   MaleOutlined,
//   FemaleOutlined,
//   WorkOutline,
//   PersonAddOutlined,
//   TrendingDownOutlined,
//   EventBusyOutlined,
//   AssessmentOutlined,
//   SchoolOutlined,
//   BusinessOutlined,
//   EmojiEventsOutlined,
//   AssignmentOutlined,
// } from '@mui/icons-material';

// import { useGetDataApi } from '@crema/hooks/APIHooks';
// import type { CRMType } from '@crema/types/models/dashboards/CRM';

// import AppCard from '@crema/components/AppCard';
// import { Fonts } from '@crema/constants/AppEnums';

// // Data Imports
// import { faculties, departments, positions } from './data/org_data';
// import { personnel } from './data/hr_profile_data';
// import { leaveRequests } from './data/leave_data';
// import { evaluations, developmentPlans } from './data/performance_data';
// import { jobVacancies, applications, turnoverRates } from './data/recruitment_data';
// import { trainings, trainingAttendances } from './data/training_data';

// // Helper: Map title to icon component and color
// const getIconAndColor = (title: string): { Icon: React.ElementType; color: string } => {
//   switch (title) {
//     case 'จำนวนบุคลากรทั้งหมด':
//       return { Icon: PeopleOutlined, color: '#2196f3' }; // Blue
//     case 'บุคลากรชาย':
//       return { Icon: MaleOutlined, color: '#1976d2' }; // Darker Blue
//     case 'บุคลากรหญิง':
//       return { Icon: FemaleOutlined, color: '#e91e63' }; // Pink
//     case 'ตำแหน่งว่างที่เปิดรับ':
//       return { Icon: WorkOutline, color: '#ff9800' }; // Orange
//     case 'จำนวนผู้สมัครทั้งหมด':
//       return { Icon: PersonAddOutlined, color: '#4caf50' }; // Green
//     case 'อัตราการลาออก (ล่าสุด)':
//       return { Icon: TrendingDownOutlined, color: '#f44336' }; // Red
//     case 'คำขอลาที่รอดำเนินการ':
//       return { Icon: EventBusyOutlined, color: '#9c27b0' }; // Purple
//     case 'คะแนนประเมินเฉลี่ย (ล่าสุด)':
//       return { Icon: AssessmentOutlined, color: '#673ab7' }; // Deep Purple
//     case 'จำนวนหลักสูตรฝึกอบรม':
//       return { Icon: EmojiEventsOutlined, color: '#00bcd4' }; // Cyan
//     case 'ผู้เข้าร่วมอบรม (ไม่ซ้ำคน)':
//       return { Icon: SchoolOutlined, color: '#3f51b5' }; // Indigo
//     case 'อบรมสำเร็จแล้ว':
//       return { Icon: AssignmentOutlined, color: '#8bc34a' }; // Light Green
//     case 'จำนวนคณะ/หน่วยงาน':
//       return { Icon: BusinessOutlined, color: '#795548' }; // Brown
//     case 'จำนวนแผนก/ภาควิชา':
//       return { Icon: BusinessOutlined, color: '#607d8b' }; // Blue Grey
//     case 'จำนวนตำแหน่งงาน':
//       return { Icon: WorkOutline, color: '#9e9e9e' }; // Grey
//     default:
//       return { Icon: PeopleOutlined, color: '#607d8b' }; // Default icon and color
//   }
// };

// // Component จำลองสำหรับ Card แสดงข้อมูลสรุป
// const StatCard: React.FC<{ title: string; value: string | number; description?: string }> = ({
//   title,
//   value,
//   description,
// }) => {
//   const { Icon, color } = getIconAndColor(title);
//   return (
//     <AppCard
//       sx={{
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         padding: '20px',
//         margin: '10px 0',
//       }}
//     >
//       <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//         <Icon sx={{ fontSize: 40, color: color, marginRight: '15px' }} />
//         <Typography
//           variant="h6"
//           sx={{
//             margin: 0,
//             color: '#333',
//             fontFamily: Fonts.PRIMARY,
//             flexGrow: 1,
//           }}
//         >
//           {title}
//         </Typography>
//       </Box>
//       <Typography
//         variant="h4"
//         sx={{
//           fontWeight: 'bold',
//           margin: '10px 0',
//           color: color,
//           fontFamily: Fonts.PRIMARY,
//         }}
//       >
//         {value}
//       </Typography>
//       {description && (
//         <Typography
//           variant="body2"
//           sx={{
//             fontSize: '0.9em',
//             color: '#666',
//             marginTop: '5px',
//             fontFamily: Fonts.PRIMARY,
//           }}
//         >
//           {description}
//         </Typography>
//       )}
//     </AppCard>
//   );
// };

// // Component จำลองสำหรับ Chart (แสดงเป็นแค่ Box)
// const ChartPlaceholder: React.FC<{ title: string; height?: string }> = ({ title, height = '250px' }) => (
//   <AppCard
//     sx={{
//       height: height,
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       color: '#888',
//     }}
//   >
//     <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: Fonts.PRIMARY }}>
//       {title} (Chart Placeholder)
//     </Typography>
//   </AppCard>
// );

// // Component จำลองสำหรับ Table (แสดงเป็นแค่ List)
// const TablePlaceholder: React.FC<{ title: string; data: any[] }> = ({ title, data }) => (
//   <AppCard
//     sx={{
//       padding: '20px',
//       margin: '0',
//     }}
//   >
//     <Typography variant="h6" sx={{ margin: '0 0 15px 0', color: '#333', fontFamily: Fonts.PRIMARY }}>
//       {title}
//     </Typography>
//     <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
//       {data.length > 0 ? (
//         <Table className="table" stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//               {Object.keys(data[0]).map((key) => (
//                 <TableCell
//                   key={key}
//                   component="th"
//                   scope="col"
//                   sx={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left', fontFamily: Fonts.PRIMARY }}
//                 >
//                   {key}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.slice(0, 5).map((row, index) => (
//               <TableRow key={index} hover>
//                 {Object.values(row).map((val: any, idx) => (
//                   <TableCell
//                     key={idx}
//                     sx={{ padding: '8px', borderBottom: '1px solid #eee', fontFamily: Fonts.PRIMARY }}
//                   >
//                     {typeof val === 'boolean' ? (val ? 'Yes' : 'No') : val}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       ) : (
//         <Typography sx={{ fontFamily: Fonts.PRIMARY }}>ไม่มีข้อมูล</Typography>
//       )}
//     </Box>
//     {data.length > 5 && (
//       <Typography variant="body2" sx={{ fontSize: '0.9em', color: '#888', marginTop: '10px', fontFamily: Fonts.PRIMARY }}>
//         * แสดงข้อมูล {data.slice(0, 5).length} รายการจากทั้งหมด {data.length} รายการ
//       </Typography>
//     )}
//   </AppCard>
// );

// const HRDashboard: React.FC = () => {
//   // 1. คำนวณข้อมูลสำหรับภาพรวมบุคลากร
//   const totalPersonnel = personnel.length;
//   const malePersonnel = personnel.filter((p) => p.GENDER === 'ชาย').length;
//   const femalePersonnel = personnel.filter((p) => p.GENDER === 'หญิง').length;
//   const personnelByType = personnel.reduce((acc, p) => {
//     acc[p.PERSONNELTYPE] = (acc[p.PERSONNELTYPE] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   // 2. คำนวณข้อมูลสำหรับอัตรากำลังคน
//   const openVacancies = jobVacancies.filter((v) => v.STATUS === 'เปิดรับสมัคร').length;
//   const totalApplicants = applications.length;
//   const latestTurnoverRate = turnoverRates.length > 0 ? turnoverRates[turnoverRates.length - 1].TURNOVER_RATE : 0;

//   // 3. คำนวณข้อมูลการลา
//   const pendingLeaveRequests = leaveRequests.filter((req) => req.STATUS === 'รออนุมัติ').length;
//   const leaveSummary = leaveRequests.reduce((acc, req) => {
//     acc[req.LEAVETYPE] = (acc[req.LEAVETYPE] || 0) + req.DAYS;
//     return acc;
//   }, {} as Record<string, number>);

//   // 4. คำนวณข้อมูลการประเมินผลการปฏิบัติงาน
//   const totalScores = evaluations.reduce((sum, evalItem) => sum + evalItem.SCORE, 0);
//   const averageScore = evaluations.length > 0 ? (totalScores / evaluations.length).toFixed(2) : 'N/A';
//   const gradeCounts = evaluations.reduce((acc, evalItem) => {
//     acc[evalItem.GRADE] = (acc[evalItem.GRADE] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   // 5. คำนวณข้อมูลการฝึกอบรม
//   const totalTrainings = trainings.length;
//   const uniqueAttendees = new Set(trainingAttendances.map((att) => att.PERSONNELID)).size;
//   const completedTrainings = trainingAttendances.filter((att) => att.ATTENDED).length;

//   // 6. คำนวณข้อมูลโครงสร้างองค์กร
//   const totalFaculties = faculties.length;
//   const totalDepartments = departments.length;
//   const totalPositions = positions.length;

//   return (
//     <Box sx={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f7f6' }}>
//       <Typography variant="h4" sx={{ color: '#2c3e50', marginBottom: '30px', fontFamily: Fonts.PRIMARY }}>
//         ภาพรวมระบบบริหารงานบุคคล
//       </Typography>

//       {/* Overview Section */}
//       <Box component="section" sx={{ marginBottom: '40px' }}>
//         <Typography
//           variant="h5"
//           sx={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px', fontFamily: Fonts.PRIMARY }}
//         >
//           ภาพรวมบุคลากร
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <StatCard title="จำนวนบุคลากรทั้งหมด" value={totalPersonnel} description="จำนวนพนักงานและเจ้าหน้าที่ทั้งหมด" />
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <StatCard
//               title="บุคลากรชาย"
//               value={malePersonnel}
//               description={`คิดเป็น ${(malePersonnel / totalPersonnel * 100).toFixed(1)}%`}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <StatCard
//               title="บุคลากรหญิง"
//               value={femalePersonnel}
//               description={`คิดเป็น ${(femalePersonnel / totalPersonnel * 100).toFixed(1)}%`}
//             />
//           </Grid>
//           {Object.entries(personnelByType).map(([type, count]) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={type}>
//               <StatCard title={`บุคลากรประเภท ${type}`} value={count} description={`จากทั้งหมด ${totalPersonnel} คน`} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>

//       {/* Recruitment & Turnover Section */}
//       <Box component="section" sx={{ marginBottom: '40px' }}>
//         <Typography
//           variant="h5"
//           sx={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px', fontFamily: Fonts.PRIMARY }}
//         >
//           อัตรากำลังและการสรรหา
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <StatCard title="ตำแหน่งว่างที่เปิดรับ" value={openVacancies} description="จำนวนตำแหน่งที่กำลังเปิดรับสมัคร" />
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <StatCard title="จำนวนผู้สมัครทั้งหมด" value={totalApplicants} description="รวมทุกตำแหน่งที่เปิดรับ" />
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <StatCard
//               title="อัตราการลาออก (ล่าสุด)"
//               value={`${latestTurnoverRate}%`}
//               description={`ข้อมูล ณ ${turnoverRates.length > 0 ? turnoverRates[turnoverRates.length - 1].YEAR_MONTH : '-'}`}
//             />
//           </Grid>
//         </Grid>
//         <Grid container spacing={2} sx={{ marginTop: '20px' }}>
//           <Grid item xs={12} md={6}>
//             <ChartPlaceholder title="กราฟอัตราการลาออกรายเดือน" />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TablePlaceholder title="รายการตำแหน่งว่าง" data={jobVacancies.filter((v) => v.STATUS === 'เปิดรับสมัคร')} />
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Leave Management Section */}
//       <Box component="section" sx={{ marginBottom: '40px' }}>
//         <Typography
//           variant="h5"
//           sx={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px', fontFamily: Fonts.PRIMARY }}
//         >
//           การบริหารจัดการการลา
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <StatCard title="คำขอลาที่รอดำเนินการ" value={pendingLeaveRequests} description="จำนวนคำขอที่รอการอนุมัติ" />
//           </Grid>
//           {Object.entries(leaveSummary).map(([type, days]) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={type}>
//               <StatCard title={`จำนวนวัน${type}`} value={`${days} วัน`} description="รวมทุกคำขอที่อนุมัติ/รออนุมัติ" />
//             </Grid>
//           ))}
//         </Grid>
//         <Grid container spacing={2} sx={{ marginTop: '20px' }}>
//           <Grid item xs={12} md={6}>
//             <ChartPlaceholder title="กราฟสถิติประเภทการลา" />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TablePlaceholder title="รายการคำขอลาล่าสุด" data={leaveRequests.slice(0, 5)} />
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Performance Evaluation Section */}
//       <Box component="section" sx={{ marginBottom: '40px' }}>
//         <Typography
//           variant="h5"
//           sx={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px', fontFamily: Fonts.PRIMARY }}
//         >
//           การประเมินผลการปฏิบัติงาน
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <StatCard
//               title="คะแนนประเมินเฉลี่ย (ล่าสุด)"
//               value={averageScore}
//               description={`จากบุคลากร ${evaluations.length} คน`}
//             />
//           </Grid>
//           {Object.entries(gradeCounts).map(([grade, count]) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={grade}>
//               <StatCard title={`จำนวน (เกรด ${grade})`} value={count} description="จำนวนบุคลากรที่ได้เกรดนี้" />
//             </Grid>
//           ))}
//         </Grid>
//         <Grid container spacing={2} sx={{ marginTop: '20px' }}>
//           <Grid item xs={12} md={6}>
//             <ChartPlaceholder title="กราฟการกระจายเกรดการประเมิน" />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TablePlaceholder title="รายการประเมินล่าสุด" data={evaluations} />
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Training & Development Section */}
//       <Box component="section" sx={{ marginBottom: '40px' }}>
//         <Typography
//           variant="h5"
//           sx={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px', fontFamily: Fonts.PRIMARY }}
//         >
//           การฝึกอบรมและพัฒนา
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <StatCard title="จำนวนหลักสูตรฝึกอบรม" value={totalTrainings} description="หลักสูตรที่จัดขึ้นในปีนี้" />
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <StatCard title="ผู้เข้าร่วมอบรม (ไม่ซ้ำคน)" value={uniqueAttendees} description="จำนวนบุคลากรที่เข้าร่วมอบรม" />
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <StatCard
//               title="อบรมสำเร็จแล้ว"
//               value={completedTrainings}
//               description="จำนวนครั้งที่บุคลากรเข้าร่วมอบรมสำเร็จ"
//             />
//           </Grid>
//         </Grid>
//         <Grid container spacing={2} sx={{ marginTop: '20px' }}>
//           <Grid item xs={12} md={6}>
//             <TablePlaceholder title="หลักสูตรฝึกอบรมที่กำลังจะมาถึง" data={trainings} />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TablePlaceholder
//               title="แผนพัฒนาบุคลากร (IDP) ที่รอดำเนินการ"
//               data={developmentPlans.filter((dp) => dp.STATUS !== 'สำเร็จ')}
//             />
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Organization Structure Section */}
//       <Box component="section" sx={{ marginBottom: '40px' }}>
//         <Typography
//           variant="h5"
//           sx={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px', fontFamily: Fonts.PRIMARY }}
//         >
//           โครงสร้างองค์กร
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <StatCard title="จำนวนคณะ/หน่วยงาน" value={totalFaculties} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <StatCard title="จำนวนแผนก/ภาควิชา" value={totalDepartments} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <StatCard title="จำนวนตำแหน่งงาน" value={totalPositions} />
//           </Grid>
//         </Grid>
//         <Grid container spacing={2} sx={{ marginTop: '20px' }}>
//           <Grid item xs={12} md={6}>
//             <TablePlaceholder title="รายชื่อคณะ/หน่วยงาน" data={faculties} />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TablePlaceholder title="รายชื่อตำแหน่งงาน" data={positions} />
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default HRDashboard;

// crm/index.tsx
import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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

import { useGetDataApi } from '@crema/hooks/APIHooks';
import type { CRMType } from '@crema/types/models/dashboards/CRM';

import AppCard from '@crema/components/AppCard';
import { Fonts } from '@crema/constants/AppEnums';

// **นำเข้า Component HRCharts ใหม่**
import HRCharts from './components/HRCharts';

// Data Imports
import { faculties, departments, positions } from './data/org_data';
import { personnel } from './data/hr_profile_data';
import { leaveRequests } from './data/leave_data';
import { evaluations, developmentPlans } from './data/performance_data';
import { jobVacancies, applications, turnoverRates } from './data/recruitment_data';
import { trainings, trainingAttendances } from './data/training_data';

// Helper: Map title to icon component and color
const getIconAndColor = (title: string): { Icon: React.ElementType; color: string } => {
  switch (title) {
    case 'จำนวนบุคลากรทั้งหมด':
      return { Icon: PeopleOutlined, color: '#2196f3' }; // Blue
    case 'บุคลากรชาย':
      return { Icon: MaleOutlined, color: '#1976d2' }; // Darker Blue
    case 'บุคลากรหญิง':
      return { Icon: FemaleOutlined, color: '#e91e63' }; // Pink
    case 'ตำแหน่งว่างที่เปิดรับ':
      return { Icon: WorkOutline, color: '#ff9800' }; // Orange
    case 'จำนวนผู้สมัครทั้งหมด':
      return { Icon: PersonAddOutlined, color: '#4caf50' }; // Green
    case 'อัตราการลาออก (ล่าสุด)':
      return { Icon: TrendingDownOutlined, color: '#f44336' }; // Red
    case 'คำขอลาที่รอดำเนินการ':
      return { Icon: EventBusyOutlined, color: '#9c27b0' }; // Purple
    case 'คะแนนประเมินเฉลี่ย (ล่าสุด)':
      return { Icon: AssessmentOutlined, color: '#673ab7' }; // Deep Purple
    case 'จำนวนหลักสูตรฝึกอบรม':
      return { Icon: EmojiEventsOutlined, color: '#00bcd4' }; // Cyan
    case 'ผู้เข้าร่วมอบรม (ไม่ซ้ำคน)':
      return { Icon: SchoolOutlined, color: '#3f51b5' }; // Indigo
    case 'อบรมสำเร็จแล้ว':
      return { Icon: AssignmentOutlined, color: '#8bc34a' }; // Light Green
    case 'จำนวนคณะ/หน่วยงาน':
      return { Icon: BusinessOutlined, color: '#795548' }; // Brown
    case 'จำนวนแผนก/ภาควิชา':
      return { Icon: BusinessOutlined, color: '#607d8b' }; // Blue Grey
    case 'จำนวนตำแหน่งงาน':
      return { Icon: WorkOutline, color: '#9e9e9e' }; // Grey
    default:
      return { Icon: PeopleOutlined, color: '#607d8b' }; // Default icon and color
  }
};

// Component จำลองสำหรับ Card แสดงข้อมูลสรุป
const StatCard: React.FC<{ title: string; value: string | number; description?: string }> = ({
  title,
  value,
  description,
}) => {
  const { Icon, color } = getIconAndColor(title);
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

  return (
    <Box sx={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f7f6' }}>
      <Typography variant="h4" sx={{ color: '#2c3e50', marginBottom: '30px', 
        //fontFamily: Fonts.PRIMARY 
        }}>
        ภาพรวมระบบบริหารงานบุคคล
      </Typography>

      {/* Overview Section */}
      <Box component="section" sx={{ marginBottom: '40px' }}>
        <Typography
          variant="h5"
          sx={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px',
            //fontFamily: Fonts.PRIMARY 
          }}
        >
          ภาพรวมบุคลากร
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
            <Grid item xs={12} sm={6} md={4} lg={3} key={type}>
              <StatCard title={`บุคลากรประเภท ${type}`} value={count} description={`จากทั้งหมด ${totalPersonnel} คน`} />
            </Grid>
          ))}
        </Grid>
      </Box>

 
      {/* <HRCharts
        personnelByTypeData={personnelByTypeData}
         turnoverRatesData={turnoverRates}
        leaveTypeData={leaveSummaryData}
         gradeDistributionData={gradeCountsData}
      /> */}

      {/* Recruitment & Turnover Section */}
      <Box component="section" sx={{ marginBottom: '40px' }}>
        <Typography
          variant="h5"
          sx={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px', 
            //fontFamily: Fonts.PRIMARY 
          }}
        >
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
           //fontFamily: Fonts.PRIMARY 
          }}
        >
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
            //fontFamily: Fonts.PRIMARY 
            }}
        >
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
            //fontFamily: Fonts.PRIMARY
           }}
        >
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
            //fontFamily: Fonts.PRIMARY 
            }}
        >
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


 
 