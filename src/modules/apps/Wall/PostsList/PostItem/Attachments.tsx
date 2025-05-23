import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppGrid from '@crema/components/AppGrid';
import Image from 'next/image';

import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material';
import AppMediaViewer from '@crema/components/AppMediaViewer';
import { AttachmentType } from '@crema/types/models/apps/Wall';

const ImageView = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  borderRadius: 4,
  overflow: 'hidden',
  position: 'relative',
  height: 140,
  width: '100%',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  [theme.breakpoints.up('md')]: {
    height: 180,
  },
  [theme.breakpoints.up('xl')]: {
    height: 200,
  },
}));
const ImageCountView = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  backgroundColor: alpha(theme.palette.common.black, 0.5),
  color: theme.palette.common.white,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 18,
}));

type Props = {
  attachments: AttachmentType[];
};
const Attachments = ({ attachments }: Props) => {
  const [index, setIndex] = useState(-1);

  const onClose = () => {
    setIndex(-1);
  };

  return (
    <Box
      sx={{
        mb: 4,
      }}
    >
      <AppGrid
        itemPadding={8}
        data={attachments.length > 4 ? attachments.slice(0, 4) : attachments}
        column={attachments.length > 3 ? 2 : attachments.length}
        renderRow={(item, index) => (
          <ImageView key={index}>
            <Image src={`${item.preview}`} alt="attachment" width={706} height={200} onClick={() => setIndex(index)} />
            {attachments.length > 4 && index === 3 && <ImageCountView>+ {attachments.length - 3}</ImageCountView>}
          </ImageView>
        )}
      />
      <AppMediaViewer
        index={index}
        medias={attachments.map((data) => {
          return {
            url: data.preview,
            mime_type: 'image/*',
          };
        })}
        onClose={onClose}
      />
    </Box>
  );
};

export default Attachments;
