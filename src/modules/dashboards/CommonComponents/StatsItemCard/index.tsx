import React from 'react';
import AppCard from '@crema/components/AppCard';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Fonts } from '@crema/constants/AppEnums';
import PropTypes from 'prop-types';
import type { MetricStatsType } from '@crema/types/models/dashboards/Metrics';
import { getAssetsUrl } from '@crema/helpers/UrlHelper';
import Image from 'next/image';

type Props = {
  stats: MetricStatsType;
};

const StatsItemCard = ({ stats }: Props) => {
  return (
    <AppCard sxStyle={{ height: 1 }} className="card-hover">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            mr: 4,
          }}
        >
          <Avatar
            sx={{
              width: 46,
              height: 46,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              backgroundColor: stats.badgeColor,
              padding: 2,
            }}
          >
            <Image src={getAssetsUrl(stats.icon)} alt="" width={30} height={25} />
          </Avatar>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: {
              xs: 'calc(100% - 62px)',
              lg: 'calc(100% - 70px)',
              xl: 'calc(100% - 76px)',
            },
          }}
        >
          <Box sx={{ overflow: 'hidden' }}>
            <Box component="h3">{stats.count}</Box>
            <Box
              component="p"
              sx={{
                color: 'text.secondary',
                fontSize: 14,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {stats.title}
            </Box>
          </Box>
          <Box
            component="span"
            sx={{
              backgroundColor: stats.bgcolor,
              borderRadius: 30,
              color: stats.badgeColor,
              padding: '4px 12px',
              fontSize: 12,
              fontWeight: Fonts.MEDIUM,
              display: 'inline-block',
              minWidth: 75,
              textAlign: 'center',
              '@media only screen and (max-width: 1580px) and (min-width: 1200px)': {
                display: 'none',
              },
            }}
          >
            {stats.new}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default StatsItemCard;

StatsItemCard.propTypes = {
  stats: PropTypes.object,
};
