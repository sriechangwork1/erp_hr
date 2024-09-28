import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { SuggestionType } from '@crema/types/models/apps/Wall';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 50,
  height: 50,
  borderRadius: 10,
  [theme.breakpoints.up('xl')]: {
    width: 70,
    height: 70,
  },
}));

type Props = {
  item: SuggestionType;
};

const SuggestionItem = ({ item }: Props) => {
  return (
    <Box
      className="item-hover"
      sx={{
        px: 5,
        py: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box
          sx={{
            mr: 4,
          }}
        >
          <StyledAvatar src={item.thumb} alt={item.name} />
        </Box>
        <div>
          <Box
            component="h5"
            sx={{
              mb: 0.5,
            }}
          >
            {item.name}
          </Box>
          <Box
            component="p"
            sx={{
              color: 'text.secondary',
            }}
          >
            {item.desc}
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default SuggestionItem;
