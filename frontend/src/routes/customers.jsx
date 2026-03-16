import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createFileRoute } from '@tanstack/react-router';

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
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
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

const handleClick = () => {

};

function Row(props) {
  const { row: customer } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }} onClick={() => handleClick()}>
        <TableCell align="right">{customer.FormattedPhoneNumber}</TableCell>
        <TableCell align="right">{customer.FullName}</TableCell>
        <TableCell align="right">{customer.Brokerage}</TableCell>
        <TableCell align="right">{customer.EmailAddress}</TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  customer: PropTypes.shape({
    PhoneNumber: PropTypes.string,
    FullName: PropTypes.string,
    Brokerage: PropTypes.string,
    // Orders: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     PropertyAddress: PropTypes.string,
    //     RequestedInstallDate: PropTypes.string,
    //     Description: PropTypes.string,
    //     ReuqestedRemoveDate: PropTypes.string
    //   }),
    // ).isRequired,
    EmailAddress: PropTypes.string
  }).isRequired,
};

export const Route = createFileRoute("/customers")({
  component: Customers
});


export default Customers;
