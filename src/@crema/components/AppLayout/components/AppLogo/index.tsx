import React from "react";
import { useSidebarContext } from "@crema/context/AppContextProvider/SidebarContextProvider";
import { Box } from "@mui/material";
import AppImage from "../../../AppImage";

type AppLogoProps = {
  hasSidebarColor?: boolean;
};

const AppLogo: React.FC<AppLogoProps> = ({ hasSidebarColor }) => {
  const { mode } = useSidebarContext();

  return (
    <Box
      sx={{
        height: { xs: 56, sm: 70 },
        padding: 2.5,
        display: "flex",
        flexDirection: "row",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
        "& img": {
          height: { xs: 40, sm: 45 },
        },
      }}
      className="app-logo"
    >
      {hasSidebarColor && mode === "dark" ? (
        <AppImage
          src="/assets/images/logo-white-with-name.png"
          alt="crema-logo"
        />
      ) : (
        <AppImage src="/assets/images/logo-with-name.png" alt="crema-logo" />
      )}
      {/* <Logo fill={theme.palette.primary.main} />
      <Box
        sx={{
          mt: 1,
          display: { xs: "none", md: "block" },
          "& svg": {
            height: { xs: 25, sm: 30 },
          },
        }}
      >
        <LogoText fill={alpha(theme.palette.text.primary, 0.8)} />
      </Box> */}
    </Box>
  );
};

export default AppLogo;
