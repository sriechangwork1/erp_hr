import React from 'react';

import { Box, Icon, Typography } from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';
import AppCard from '@crema/components/AppCard';
import { StateDaumType } from '@crema/types/models/dashboards/CRM';
import { getAssetsUrl } from '@crema/helpers/UrlHelper';
import Image from 'next/image';

type Props = {
  data: StateDaumType;
};
const StatsDirCard = ({ data }: Props) => {
  return (
    <AppCard
      className="card-hover"
      contentStyle={{
        p: 0,
        '&:last-of-type': {
          pb: '0 !important',
        },

        mb: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            component="span"
            sx={{
              mr: 3.5,
              height: 46,
              width: 46,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              color: data.color,
              backgroundColor: data.color + '22',
            }}
          >
            {data?.icon ? (
              <Icon
                sx={{
                  fontSize: 24,
                }}
              >
                {data.icon}
              </Icon>
            ) : (
              <Image src={getAssetsUrl(data.iconImg)} alt={data.name} height={22} width={24} />
            )}
          </Box>

          <Box sx={{ mr: 2, overflow: 'hidden' }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: Fonts.SEMI_BOLD,
                fontSize: 18,
              }}
            >
              {data.value}
            </Typography>
            <Typography
              sx={(theme) => ({
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: 14,
                color: theme.palette.text.secondary,
                mt: 0.5,
              })}
            >
              {data.name}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'relative',
            '@media only screen and (min-width: 1200px) and (max-width: 1579px)': {
              display: 'none',
            },
          }}
        >
          <Box
            sx={(theme) => ({
              color: theme.palette.success.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            })}
          >
            {!data?.hidePercent && (
              <span style={{ marginRight: 4 }}>
                <Image
                  src={
                    data.percentageChange > 0
                      ? '/assets/images/dashboard/up-arrow.svg'
                      : '/assets/images/dashboard/down-arrow.svg'
                  }
                  alt="up-icon"
                  height={data.percentageChange > 0 ? 10 : 8}
                  width={data.percentageChange > 0 ? 10 : 8}
                />
              </span>
            )}
            <Box
              component="span"
              sx={[
                {
                  ml: 0.25,
                  fontSize: 14,
                  fontWeight: Fonts.SEMI_BOLD,
                },
                data.percentageChange > 0
                  ? {
                      color: '#11C15B',
                    }
                  : {
                      color: '#F04F47',
                    },
              ]}
            >
              {data.percentageChange > 0 ? '+' : ''}
              {data.percentageChange}%
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              mt: 2,
              color: theme.palette.text.secondary,
            })}
          >
            <Typography variant="body2">{data.duration}</Typography>
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default StatsDirCard;
