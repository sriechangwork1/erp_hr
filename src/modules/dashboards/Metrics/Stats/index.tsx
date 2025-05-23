import React, { useState } from 'react';
import StatsGraph from './StatsGraph';
import { useIntl } from 'react-intl';
import AppSelect from '@crema/components/AppSelect';
import AppCard from '@crema/components/AppCard';
import { Box } from '@mui/material';
import type { StatsGraphType } from '@crema/types/models/dashboards/Metrics';

type StatsProps = {
  data: StatsGraphType;
};

const Stats: React.FC<StatsProps> = ({ data }) => {
  const [graphData, setGraphData] = useState(data.dataOne);

  const handleYearChange = (value: number) => {
    switch (value) {
      case 2017:
        setGraphData(data.dataTwo);
        break;
      case 2018:
        setGraphData(data.dataThree);
        break;
      case 2019:
        setGraphData(data.dataOne);
        break;
      default:
        setGraphData(data.dataOne);
    }
  };

  const handleMonthChange = (value: string) => {
    switch (value) {
      case 'June':
        setGraphData(data.dataTwo);
        break;
      case 'July':
        setGraphData(data.dataThree);
        break;
      case 'August':
        setGraphData(data.dataOne);
        break;
      default:
        setGraphData(data.dataThree);
    }
  };

  const { messages } = useIntl();

  return (
    <AppCard
      sxStyle={{ height: 1 }}
      title={messages['dashboard.companyProduction'] as string}
      action={
        <Box>
          <AppSelect menus={[2019, 2018, 2017]} defaultValue={2019} onChange={handleYearChange} />
          <AppSelect
            menus={[messages['common.june'], messages['common.july'], messages['common.august']]}
            defaultValue={messages['common.june']}
            onChange={handleMonthChange}
          />
        </Box>
      }
    >
      <StatsGraph data={graphData} />
    </AppCard>
  );
};

export default Stats;
