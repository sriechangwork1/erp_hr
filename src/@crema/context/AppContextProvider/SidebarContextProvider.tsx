'use client';
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import defaultConfig, { SidebarData } from '@crema/constants/defaultConfig';

export interface SidebarContextData {
  menuStyle?: string;
  sidebarBgColor: string;
  sidebarTextColor: string;
  sidebarHeaderColor: string;
  sidebarMenuSelectedBgColor: string;
  sidebarMenuSelectedTextColor: string;
  mode: string;
  isSidebarBgImage: boolean;
  sidebarBgImage: string | number;
  borderColor?: string;
}

export interface SidebarActions {
  updateMenuStyle: (style: string) => void;
  updateSidebarColorSet: (color: SidebarData) => void;
  setSidebarBgImage: (isImage: boolean) => void;
  updateSidebarBgImage: (image: number) => void;
}

const SidebarContext = createContext<SidebarContextData>({
  // menuStyle: defaultTheme.sidebar.menuStyle,
  ...defaultConfig.sidebar.colorSet,
  isSidebarBgImage: defaultConfig.sidebar.isSidebarBgImage,
  sidebarBgImage: defaultConfig.sidebar.sidebarBgImage,
  borderColor: defaultConfig.sidebar.borderColor,
});

const SidebarActionsContext = createContext<SidebarActions>({
  updateMenuStyle: () => {},
  updateSidebarColorSet: () => {},
  setSidebarBgImage: () => {},
  updateSidebarBgImage: () => {},
});

export const useSidebarContext = () => useContext(SidebarContext);

export const useSidebarActionsContext = () => useContext(SidebarActionsContext);

interface SidebarContextProviderProps {
  children: ReactNode;
}

const SidebarContextProvider: React.FC<SidebarContextProviderProps> = ({ children }) => {
  const [menuStyle, updateMenuStyle] = useState<string>(defaultConfig.sidebar.menuStyle);
  const [sidebarColorSet, updateSidebarColorSet] = useState<SidebarData>(defaultConfig.sidebar.colorSet);
  const [isSidebarBgImage, updateImage] = useState<boolean>(defaultConfig.sidebar.isSidebarBgImage);
  const [sidebarBgImage, setSidebarImage] = useState<string | number>(defaultConfig.sidebar.sidebarBgImage);

  const setSidebarBgImage = useCallback((isSidebarBgImage: boolean) => {
    updateImage(isSidebarBgImage);
  }, []);

  const updateSidebarBgImage = useCallback((sidebarBgImage: string | number) => {
    setSidebarImage(sidebarBgImage);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        ...sidebarColorSet,
        menuStyle,
        isSidebarBgImage,
        sidebarBgImage,
        borderColor: defaultConfig.sidebar.borderColor,
      }}
    >
      <SidebarActionsContext.Provider
        value={{
          updateMenuStyle,
          updateSidebarColorSet,
          setSidebarBgImage,
          updateSidebarBgImage,
        }}
      >
        {children}
      </SidebarActionsContext.Provider>
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;

SidebarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
