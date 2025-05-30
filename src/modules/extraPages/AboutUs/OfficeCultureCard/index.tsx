import React from 'react';
import Typography from '@mui/material/Typography';
import { Fonts } from '@crema/constants/AppEnums';
import AppCardMedia from '@crema/components/AppCard/AppCardMedia';
import { OfficeCultureData } from '@crema/fakedb/extraPages';

type OfficeCultureDataProps = {
  officeCulture: OfficeCultureData;
};

const OfficeCultureCard = ({ officeCulture }: OfficeCultureDataProps) => {
  return (
    <AppCardMedia sxStyle={{ height: '100%' }} cardMedia={officeCulture.srcImg}>
      <Typography component="h3" sx={{ fontSize: 16, fontWeight: Fonts.SEMI_BOLD, mb: { xs: 2, md: 4 } }}>
        {officeCulture.title}
      </Typography>
      <Typography
        sx={(theme) => ({
          mb: 2,
          color: theme.palette.text.secondary,
        })}
      >
        {officeCulture.description}
      </Typography>
    </AppCardMedia>
  );
};

export default OfficeCultureCard;
