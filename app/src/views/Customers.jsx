import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    const response = await fetch('/api/customers/orders');
    const customersJson = await response.json();
    setCustomers(customersJson.customers);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">Phone #</TableCell>
            <TableCell align="right">Customer</TableCell>
            <TableCell align="right">Brokerage</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <Row key={customer.PhoneNumber} row={customer} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row: customer } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {customer.PhoneNumber}
        </TableCell>
        <TableCell align="right">{customer.FullName}</TableCell>
        <TableCell align="right">{customer.Brokerage}</TableCell>
        <TableCell align="right">{customer.EmailAddress}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Orders
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Property Address</TableCell>
                    <TableCell>Install Date</TableCell>
                    <TableCell align="right">Service</TableCell>
                    <TableCell align="right">Remove Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customer.Orders.map(({OrderID, PropertyAddress, RequestedInstallDate, RequestedService: {Description}, RequestedRemoveDate }) => (
                    <TableRow key={OrderID}>
                      <TableCell component="th" scope="row">
                        {PropertyAddress}
                      </TableCell>
                      <TableCell>{RequestedInstallDate}</TableCell>
                      <TableCell align="right">{Description}</TableCell>
                      <TableCell align="right">
                        {RequestedRemoveDate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  customer: PropTypes.shape({
    PhoneNumber: PropTypes.string,
    FullName: PropTypes.string,
    Brokerage: PropTypes.string,
    Orders: PropTypes.arrayOf(
      PropTypes.shape({
        PropertyAddress: PropTypes.string,
        RequestedInstallDate: PropTypes.string,
        Description: PropTypes.string,
        ReuqestedRemoveDate: PropTypes.string
      }),
    ).isRequired,
    EmailAddress: PropTypes.string
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default Customers;
