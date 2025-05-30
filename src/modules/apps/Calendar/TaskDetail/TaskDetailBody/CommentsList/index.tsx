import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import { Fonts } from '@crema/constants/AppEnums';
import SimpleBarReact from 'simplebar-react';
import CommentsListItem from './CommentsListItem';
import { styled } from '@mui/material/styles';
import AppList from '@crema/components/AppList';
import { CommentType } from '@crema/types/models/apps/Todo';

export const StyledSimpleBarReact = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: 155,
  [theme.breakpoints.up('xl')]: {
    maxHeight: 190,
  },
  '@media (min-width: 1920px)': {
    maxHeight: 210,
  },
  '@media (min-width: 2000px)': {
    maxHeight: 250,
  },
  '@media (min-width: 2400px)': {
    maxHeight: 360,
  },
}));

type Props = {
  comments: CommentType[];
};

const CommentsList = ({ comments = [] }: Props) => {
  const _scrollBarRef = useRef<any>(null);
  useEffect(() => {
    if (comments?.length > 0) {
      if (_scrollBarRef?.current) {
        const scrollEl = _scrollBarRef.current.getScrollElement();
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    }
  }, [comments, _scrollBarRef]);
  return comments.length > 0 ? (
    <Box
      sx={{
        marginBottom: 5,
      }}
    >
      <Box sx={{ mb: 4, fontWeight: Fonts.SEMI_BOLD }} component="h4">
        <IntlMessages id="common.comments" />
      </Box>
      <StyledSimpleBarReact ref={_scrollBarRef}>
        <AppList
          data={comments}
          renderRow={(item, index) => (
            <CommentsListItem
              item={item}
              key={index}
              isPreviousSender={index > 0 && item.name === comments[index - 1].name}
              isLast={
                (index + 1 < comments.length && item.name !== comments[index + 1].name) || index + 1 === comments.length
              }
            />
          )}
        />
      </StyledSimpleBarReact>
    </Box>
  ) : null;
};

export default CommentsList;
