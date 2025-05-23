import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { WhoToFollowType } from '@crema/types/models/apps/Wall';

type Props = {
  item: WhoToFollowType;
};

const FollowItem = ({ item }: Props) => {
  return (
    <Box
      className="item-hover"
      sx={{
        px: 5,
        py: 2,
        display: 'flex',
      }}
    >
      <Avatar
        sx={{
          width: 36,
          height: 36,
          marginTop: 0.5,
        }}
        src={item.profilePic}
      />
      <Box
        sx={{
          ml: 3.5,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            mb: 1,
            flex: 1,
            mr: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography component="h5" variant="h5">
              {item.title}
            </Typography>
            <Box
              sx={{
                marginLeft: 6,
                display: 'block',
                '& svg': {
                  fontSize: 16,
                  color: 'success.main',
                },
              }}
            >
              <CheckCircleOutlinedIcon />
            </Box>
          </Box>
          <Box
            component="p"
            sx={{
              color: 'text.secondary',
            }}
          >
            {item.subTitle}
          </Box>
        </Box>
        <Box
          sx={{
            mb: 1,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            size="small"
            sx={{
              borderRadius: 30,
            }}
          >
            Follow
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FollowItem;
