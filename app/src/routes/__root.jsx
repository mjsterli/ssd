import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { Grid2 as Grid } from '@mui/material';
import ResponsiveAppBar from '../components/AppBar';
import SideMenu from '../components/SideMenu';

const ssdTheme = createTheme({
  palette: {
    primary: {
      main: '#009919'
    }
  }
});

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <ThemeProvider theme={ssdTheme}>
        <ResponsiveAppBar />
        <Grid container maxWidth="lg">
          <Grid size={3}>
            <SideMenu />
          </Grid>
          <Grid size={9}>
            <Outlet  />
          </Grid>
        </Grid>
      </ThemeProvider>
      <TanStackRouterDevtools />
    </>
  );
};
