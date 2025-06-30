//hr1001/UserGroupList.tsx
import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material'; // Import Box and Button
import { UserGroup } from './types';

interface UserGroupListProps {
  userGroups: UserGroup[];
  selectedGroupId: string | null;
  onSelectGroup: (groupId: string) => void;
}

const UserGroupList: React.FC<UserGroupListProps> = ({ userGroups, selectedGroupId, onSelectGroup }) => {
  return (
    <Paper elevation={1} sx={{ p: 2, height: '100%', overflow: 'auto' }}>
      <Typography variant="h3" gutterBottom>
        กลุ่มผู้ใช้งาน
      </Typography>
      <Box> {/* ใช้ Box แทน List เพื่อจัดเรียง Button */}
        {userGroups.map((group) => (
          <Button
            key={group.id}
            fullWidth // ทำให้ Button มีความกว้างเต็มพื้นที่
            variant={group.id === selectedGroupId ? 'contained' : 'outlined'} // ถ้าเลือกอยู่ให้เป็น contained, ไม่เลือกให้เป็น outlined
            onClick={() => onSelectGroup(group.id)}
            sx={{
              justifyContent: 'flex-start', // จัดข้อความไปทางซ้าย
              mb: 1, // Margin-bottom ระหว่างปุ่ม
              py: 1.5, // Padding แนวตั้ง
              px: 2, // Padding แนวนอน
              color: group.id === selectedGroupId ? 'white' : 'primary.main', // สีข้อความ
              borderColor: 'primary.main', // สีขอบ (สำหรับ outlined)
              '&:hover': {
                backgroundColor: group.id === selectedGroupId ? 'primary.dark' : 'primary.light', // เปลี่ยนสีพื้นหลังเมื่อ hover
                color: group.id === selectedGroupId ? 'white' : 'primary.dark', // เปลี่ยนสีข้อความเมื่อ hover
                borderColor: 'primary.dark', // เปลี่ยนสีขอบเมื่อ hover
                boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)', // เพิ่มเงาเล็กน้อยเพื่อความสวยงาม
              },
            }}
          >
            {group.name}
          </Button>
        ))}
      </Box>
    </Paper>
  );
};

export default UserGroupList;