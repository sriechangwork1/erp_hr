//crm/index.tsx
import React from 'react';
import { faculties, departments, positions, positionLines } from './data/org_data';
import { personnel, education } from './data/hr_profile_data';
import { leaveRequests, leaveBalances } from './data/leave_data';
import { salaries, welfareBenefits } from './data/finance_data';
import { trainings, trainingAttendances } from './data/training_data';
import { jobVacancies, applications, turnoverRates } from './data/recruitment_data';
import { evaluations, developmentPlans } from './data/performance_data';
import TotalVisitor from './TotalVisitor';
import type { CRMType } from '@crema/types/models/dashboards/CRM';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import { Grid } from '@mui/material';


// Component จำลองสำหรับ Card แสดงข้อมูลสรุป
const StatCard: React.FC<{ title: string; value: string | number; description?: string }> = ({ title, value, description }) => (
  <div style={{
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    flex: '1',
    minWidth: '250px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}>
    <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{title}</h3>
    <p style={{ fontSize: '2em', fontWeight: 'bold', margin: '0', color: '#007bff' }}>{value}</p>
    {description && <p style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>{description}</p>}
  </div>
);

// Component จำลองสำหรับ Chart (แสดงเป็นแค่ Box)
const ChartPlaceholder: React.FC<{ title: string; height?: string }> = ({ title, height = '250px' }) => (
  <div style={{
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    flex: '1',
    minWidth: '400px',
    height: height,
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#888'
  }}>
    <p style={{ fontWeight: 'bold' }}>{title} (Chart Placeholder)</p>
  </div>
);

// Component จำลองสำหรับ Table (แสดงเป็นแค่ List)
const TablePlaceholder: React.FC<{ title: string; data: any[] }> = ({ title, data }) => (
  <div style={{
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}>
    <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>{title}</h3>
    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
      {data.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              {Object.keys(data[0]).map((key) => (
                <th key={key} style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 5).map((row, index) => ( // แสดงแค่ 5 แถวแรก
              <tr key={index}>
                {Object.values(row).map((val: any, idx) => (
                  <td key={idx} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{typeof val === 'boolean' ? (val ? 'Yes' : 'No') : val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>ไม่มีข้อมูล</p>
      )}
    </div>
    {data.length > 5 && <p style={{ fontSize: '0.9em', color: '#888', marginTop: '10px' }}>* แสดงข้อมูล {data.slice(0,5).length} รายการจากทั้งหมด {data.length} รายการ</p>}
  </div>
);

const HRDashboard: React.FC = () => {
  // 1. คำนวณข้อมูลสำหรับภาพรวมบุคลากร
  const totalPersonnel = personnel.length;
  const malePersonnel = personnel.filter(p => p.GENDER === 'ชาย').length;
  const femalePersonnel = personnel.filter(p => p.GENDER === 'หญิง').length;

  const personnelByType = personnel.reduce((acc, p) => {
    acc[p.PERSONNELTYPE] = (acc[p.PERSONNELTYPE] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 2. คำนวณข้อมูลสำหรับอัตรากำลังคน
  const openVacancies = jobVacancies.filter(v => v.STATUS === 'เปิดรับสมัคร').length;
  const totalApplicants = applications.length;
  const latestTurnoverRate = turnoverRates.length > 0 ? turnoverRates[turnoverRates.length - 1].TURNOVER_RATE : 0;

  // 3. คำนวณข้อมูลการลา
  const pendingLeaveRequests = leaveRequests.filter(req => req.STATUS === 'รออนุมัติ').length;
  const leaveSummary = leaveRequests.reduce((acc, req) => {
    acc[req.LEAVETYPE] = (acc[req.LEAVETYPE] || 0) + req.DAYS;
    return acc;
  }, {} as Record<string, number>);

  // 4. คำนวณข้อมูลการประเมินผลการปฏิบัติงาน
  const totalScores = evaluations.reduce((sum, evalItem) => sum + evalItem.SCORE, 0);
  const averageScore = evaluations.length > 0 ? (totalScores / evaluations.length).toFixed(2) : 'N/A';
  const gradeCounts = evaluations.reduce((acc, evalItem) => {
    acc[evalItem.GRADE] = (acc[evalItem.GRADE] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 5. คำนวณข้อมูลการฝึกอบรม
  const totalTrainings = trainings.length;
  const uniqueAttendees = new Set(trainingAttendances.map(att => att.PERSONNELID)).size;
  const completedTrainings = trainingAttendances.filter(att => att.ATTENDED).length;

  // 6. คำนวณข้อมูลโครงสร้างองค์กร
  const totalFaculties = faculties.length;
  const totalDepartments = departments.length;
  const totalPositions = positions.length;
 
 

  
 

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f7f6' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '30px' }}>ภาพรวมระบบบริหารงานบุคคล</h1>
 
      {/* Overview Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>ภาพรวมบุคลากร</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <StatCard title="จำนวนบุคลากรทั้งหมด" value={totalPersonnel} description="จำนวนพนักงานและเจ้าหน้าที่ทั้งหมด" />
          <StatCard title="บุคลากรชาย" value={malePersonnel} description={`คิดเป็น ${(malePersonnel / totalPersonnel * 100).toFixed(1)}%`} />
          <StatCard title="บุคลากรหญิง" value={femalePersonnel} description={`คิดเป็น ${(femalePersonnel / totalPersonnel * 100).toFixed(1)}%`} />
          {Object.entries(personnelByType).map(([type, count]) => (
            <StatCard key={type} title={`บุคลากรประเภท ${type}`} value={count} description={`จากทั้งหมด ${totalPersonnel} คน`} />
          ))}
        </div>
      </section>

      {/* Recruitment & Turnover Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>อัตรากำลังและการสรรหา</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <StatCard title="ตำแหน่งว่างที่เปิดรับ" value={openVacancies} description="จำนวนตำแหน่งที่กำลังเปิดรับสมัคร" />
          <StatCard title="จำนวนผู้สมัครทั้งหมด" value={totalApplicants} description="รวมทุกตำแหน่งที่เปิดรับ" />
          <StatCard title="อัตราการลาออก (ล่าสุด)" value={`${latestTurnoverRate}%`} description={`ข้อมูล ณ ${turnoverRates.length > 0 ? turnoverRates[turnoverRates.length - 1].YEAR_MONTH : '-'}`} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          <ChartPlaceholder title="กราฟอัตราการลาออกรายเดือน" />
          <TablePlaceholder title="รายการตำแหน่งว่าง" data={jobVacancies.filter(v => v.STATUS === 'เปิดรับสมัคร')} />
        </div>
      </section>

      {/* Leave Management Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>การบริหารจัดการการลา</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <StatCard title="คำขอลาที่รอดำเนินการ" value={pendingLeaveRequests} description="จำนวนคำขอที่รอการอนุมัติ" />
          {Object.entries(leaveSummary).map(([type, days]) => (
            <StatCard key={type} title={`จำนวนวัน${type}`} value={`${days} วัน`} description="รวมทุกคำขอที่อนุมัติ/รออนุมัติ" />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          <ChartPlaceholder title="กราฟสถิติประเภทการลา" />
          <TablePlaceholder title="รายการคำขอลาล่าสุด" data={leaveRequests.slice(0, 5)} />
        </div>
      </section>

      {/* Performance Evaluation Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>การประเมินผลการปฏิบัติงาน</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <StatCard title="คะแนนประเมินเฉลี่ย (ล่าสุด)" value={averageScore} description={`จากบุคลากร ${evaluations.length} คน`} />
          {Object.entries(gradeCounts).map(([grade, count]) => (
            <StatCard key={grade} title={`จำนวน (เกรด ${grade})`} value={count} description="จำนวนบุคลากรที่ได้เกรดนี้" />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          <ChartPlaceholder title="กราฟการกระจายเกรดการประเมิน" />
          <TablePlaceholder title="รายการประเมินล่าสุด" data={evaluations} />
        </div>
      </section>

      {/* Training & Development Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>การฝึกอบรมและพัฒนา</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <StatCard title="จำนวนหลักสูตรฝึกอบรม" value={totalTrainings} description="หลักสูตรที่จัดขึ้นในปีนี้" />
          <StatCard title="ผู้เข้าร่วมอบรม (ไม่ซ้ำคน)" value={uniqueAttendees} description="จำนวนบุคลากรที่เข้าร่วมอบรม" />
          <StatCard title="อบรมสำเร็จแล้ว" value={completedTrainings} description="จำนวนครั้งที่บุคลากรเข้าร่วมอบรมสำเร็จ" />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          <TablePlaceholder title="หลักสูตรฝึกอบรมที่กำลังจะมาถึง" data={trainings} />
          <TablePlaceholder title="แผนพัฒนาบุคลากร (IDP) ที่รอดำเนินการ" data={developmentPlans.filter(dp => dp.STATUS !== 'สำเร็จ')} />
        </div>
      </section>

      {/* Organization Structure Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#34495e', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>โครงสร้างองค์กร</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <StatCard title="จำนวนคณะ/หน่วยงาน" value={totalFaculties} />
          <StatCard title="จำนวนแผนก/ภาควิชา" value={totalDepartments} />
          <StatCard title="จำนวนตำแหน่งงาน" value={totalPositions} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          <TablePlaceholder title="รายชื่อคณะ/หน่วยงาน" data={faculties} />
          <TablePlaceholder title="รายชื่อตำแหน่งงาน" data={positions} />
        </div>
      </section>

    </div>
  );
};

export default HRDashboard;