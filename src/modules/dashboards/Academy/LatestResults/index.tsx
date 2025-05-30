import React from 'react';
import AppCard from '@crema/components/AppCard';
import AppList from '@crema/components/AppList';
import Box from '@mui/material/Box';
import AppLinearProgress from '@crema/components/AppLinearProgress';

import { Fonts } from '@crema/constants/AppEnums';
import { LatestResultType } from '@crema/types/models/dashboards/Academy';
import IntlMessages from '@crema/helpers/IntlMessages';

const getColor = (percentage: number) => {
  if (percentage < 50) {
    return '#F5585B';
  }
  return '#0A8FDC';
};

type Props = {
  result: LatestResultType;
};

const ResultItem = ({ result }: Props) => {
  return (
    <Box
      className="item-hover"
      sx={{
        px: 5,
        py: 3,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '60%',
          overflow: 'hidden',
        }}
      >
        <Box
          component="p"
          sx={{
            fontSize: 14,
            fontWeight: Fonts.MEDIUM,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: 'text.primary',
          }}
        >
          {result.chapter}
        </Box>
        <Box
          component="p"
          sx={{
            ml: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: 'text.secondary',
          }}
        >
          - {result.topic}
        </Box>
      </Box>
      <Box
        sx={{
          pl: 4,
          width: '40%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AppLinearProgress style={{ flex: 1 }} value={result.percentage} activeColor={getColor(result.percentage)} />
        <Box
          sx={{
            pl: 2,
            color: getColor(result.percentage),
          }}
          component="span"
        >
          {result.percentage}%
        </Box>
      </Box>
    </Box>
  );
};

type ResultProps = {
  latestResults: LatestResultType[];
};
const LatestResults = ({ latestResults }: ResultProps) => {
  const getData = (data: LatestResultType[]) => {
    return data;
  };
  return (
    <AppCard sxStyle={{ height: 1 }} title={<IntlMessages id="academy.latestResults" />} contentStyle={{ px: 0 }}>
      <AppList
        animation="transition.slideRightBigIn"
        data={getData(latestResults)}
        renderRow={(data, index) => <ResultItem key={index} result={data} />}
      />
    </AppCard>
  );
};

export default LatestResults;
