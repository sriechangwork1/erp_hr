// src/pages/hr911/components/Gp7Section.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import AppCard from '@crema/components/AppCard';

interface Gp7SectionProps {
  title: string;
  children: React.ReactNode;
  sx?: any; // For custom styling
}

const Gp7Section: React.FC<Gp7SectionProps> = ({ title, children, sx }) => {
  return (
    <AppCard sx={{ mb: 4, ...sx }}>
      <Typography variant="h6" sx={{ mb: 2, borderBottom: '1px solid #eee', pb: 1, fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Box sx={{ fontSize: '0.9rem' }}>
        {children}
      </Box>
    </AppCard>
  );
};

export default Gp7Section;