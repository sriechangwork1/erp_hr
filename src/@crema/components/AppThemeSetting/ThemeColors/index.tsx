import React from 'react';
import Box from '@mui/material/Box';
import { CustomizerItemWrapper } from '../index.style';
import IntlMessages from '@crema/helpers/IntlMessages';
import themeColorSets from '@crema/constants/ColorSets';
import CustomColorCell from '../CustomColorCell';
import { useThemeActionsContext, useThemeContext } from '@crema/context/AppContextProvider/ThemeContextProvider';
import AppGrid from '../../AppGrid';

export type ThemeColorsProps = {
  mode: string;
  primary: {
    main: string;
  };
  secondary: {
    main: string;
  };
  background: {
    paper: string;
    default: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  title: string;
};

const ThemeColors = () => {
  const { theme } = useThemeContext();

  const { updateTheme } = useThemeActionsContext();

  const updateThemeColors = (colorSet: ThemeColorsProps) => {
    theme.palette.primary.main = colorSet.primary.main;
    theme.palette.secondary.main = colorSet.secondary.main;
    theme.palette.background = colorSet.background;
    theme.palette.mode = colorSet.mode;
    theme.palette.text = colorSet.text;
    updateTheme({ ...theme });
  };
  return (
    <CustomizerItemWrapper>
      <Box component="h4" sx={{ mb: 2 }}>
        <IntlMessages id="customizer.themeColors" />
      </Box>
      <Box
        sx={{
          mt: 4,
        }}
      >
        <AppGrid
          data={themeColorSets}
          itemPadding={5}
          responsive={{
            xs: 1,
            sm: 2,
          }}
          renderRow={(colorSet, index) => (
            <CustomColorCell key={index} updateThemeColors={updateThemeColors} themeColorSet={colorSet} />
          )}
        />
      </Box>
    </CustomizerItemWrapper>
  );
};

export default ThemeColors;
