import React from 'react';
import AppCard from '@crema/components/AppCard';
import StoriesItem from './StoriesItem';
import Box from '@mui/material/Box';
import AppScrollbar from '@crema/components/AppScrollbar';
import { StoryType } from '@crema/types/models/dashboards/Crypto';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';

type Props = {
  stories: StoryType[];
};
const TopStories = ({ stories }: Props) => {
  const { messages } = useIntl();

  return (
    <AppCard
      contentStyle={{
        paddingLeft: 0,
        paddingRight: 0,
      }}
      title={messages['dashboard.crypto.topStories'] as string}
      action={messages['common.viewAll'] as string}
    >
      <AppScrollbar sx={{ maxHeight: 388, px: 5 }}>
        <Box
          sx={(theme) => ({
            position: 'relative',
            '& .stories-item': {
              '&:not(:last-child)': {
                borderBottom: `solid 1px ${theme.palette.divider}`,
                pb: 2.5,
                mb: 2.5,
              },
            },
          })}
        >
          {stories.map((stories: StoryType, index: number) => {
            return (
              <Box key={index} className="stories-item">
                <StoriesItem stories={stories} />
              </Box>
            );
          })}
        </Box>
      </AppScrollbar>
    </AppCard>
  );
};

export default TopStories;
