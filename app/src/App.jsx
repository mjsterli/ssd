import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Customers from './views/Customers';
import Orders from "./views/Orders";
import ResponsiveAppBar from "./components/AppBar";
import Container from '@mui/material/Container'
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

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
        <Container maxWidth="lg">
          <Customers />
        </Container>
      </ThemeProvider>
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);