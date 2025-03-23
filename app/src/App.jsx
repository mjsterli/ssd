import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Customers from './views/Customers';
import Orders from "./views/Orders";
import ResponsiveAppBar from "./components/AppBar";
import Container from '@mui/material/Container'
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Grid from '@mui/material/Grid2';
import SideMenu from "./components/SideMenu";

const ssdTheme = createTheme({
  palette: {
    primary: {
      main: '#009919'
    }
  }
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={ssdTheme}>
        <ResponsiveAppBar />
        <Grid container maxWidth="lg">
          <Grid size={3}>
            <SideMenu />
          </Grid>
          <Grid size={9}>
            <Customers />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);