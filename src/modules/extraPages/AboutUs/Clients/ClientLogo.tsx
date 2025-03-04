import React from 'react';
import { Box } from '@mui/material';
import { AboutUsClientsData } from '@crema/fakedb/extraPages';
import Image from 'next/image';

type ClientsProps = {
  client: AboutUsClientsData;
};

const ClientLogo = ({ client }: ClientsProps) => {
  return (
    <Box
      sx={{
        minHeight: 140,
        maxHeight: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Image src={client.srcImg} alt={client.name} width={130} height={60} />
    </Box>
  );
};

export default ClientLogo;
