import React from 'react';
import Box from '@mui/material/Box';
import { CustomizerItemWrapper } from '../index.style';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useLayoutActionsContext, useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import AppSelectedIcon from '../../AppSelectedIcon';
import { layoutTypes, LayoutTypesProps } from '@crema/fakedb/navigationStyle';
import Image from 'next/image';

const LayoutTypes = () => {
  const { updateLayoutType } = useLayoutActionsContext();
  const { layoutType } = useLayoutContext();

  const onLayoutChange = (layoutType: string) => {
    updateLayoutType(layoutType);
  };
  return (
    <CustomizerItemWrapper pb={1}>
      <Box component="h4" sx={{ mb: 3 }}>
        <IntlMessages id="customizer.layoutTypes" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginLeft: '-10px',
          marginRight: '-10px',
        }}
      >
        {layoutTypes.map((layout: LayoutTypesProps) => {
          return (
            <Box
              sx={{
                paddingLeft: 2.5,
                paddingRight: 2.5,
                minWidth: 84,
                maxHeight: 48,
              }}
              key={layout.id}
            >
              <Box
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onClick={() => onLayoutChange(layout.alias)}
              >
                <Image src={`${layout.image}`} alt="nav" width={84} height={48} />
                {layoutType === layout.alias ? <AppSelectedIcon /> : null}
              </Box>
            </Box>
          );
        })}
      </Box>
    </CustomizerItemWrapper>
  );
};

export default LayoutTypes;
