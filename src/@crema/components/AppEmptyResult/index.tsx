import React from 'react';
import Button from '@mui/material/Button';
import IntlMessages from '@crema/helpers/IntlMessages';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Fonts } from '@crema/constants/AppEnums';

type AppEmptyResultProps = {
  title?: string;
  onAction: () => void;
  description?: string;
  actionTitle: string;
};

const AppEmptyResult: React.FC<AppEmptyResultProps> = ({
  title = <IntlMessages id="common.noRecordFound" />,
  description = '',
  actionTitle,
  onAction,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        p: 5,
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        sx={(theme) => ({
          mb: 4,
          fontWeight: Fonts.REGULAR,
          color: theme.palette.text.secondary,
        })}
      >
        {title}
      </Typography>
      {description ? (
        <Typography
          sx={(theme) => ({
            mb: 5,
            color: theme.palette.text.secondary,
          })}
        >
          {description}
        </Typography>
      ) : null}
      {actionTitle ? (
        <Button sx={{ mb: 2 }} variant="contained" color="primary" onClick={onAction}>
          {actionTitle}
        </Button>
      ) : null}
    </Box>
  );
};

export default AppEmptyResult;
