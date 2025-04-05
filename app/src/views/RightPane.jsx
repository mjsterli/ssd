import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { Box, Button, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import Customers from './Customers';

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

const RightPane = () => {
  const theme = useTheme();
  return (
    <Box sx={{backgroundColor: grey[300], padding: 2}} fixed>
      <Grid container spacing={2} rowGap={2} rowSpacing={2}>
        <Grid item size={12} sx={{backgroundColor: 'white'}} borderRadius={2}>
          <Tabs centered>
            <Tab label='All Orders' />
            <Tab label='Orders to Install' />
            <Tab label='Orders to Remove' />
          </Tabs>
        </Grid>
        <Grid item size={12} sx={{backgroundColor: 'white', display: 'flex'}} borderRadius={2} padding={1}>
          <TextField size='small' borderRadius={5}></TextField>
          <Button>Filter</Button>
          <Button>Calendar</Button>
        </Grid>
        <Grid item size={12} sx={{backgroundColor: 'white', display: 'flex'}} borderRadius={2}>
          <Customers />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RightPane;