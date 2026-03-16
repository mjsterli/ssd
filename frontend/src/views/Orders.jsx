import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const response = await fetch('/api/orders');
    const ordersJson = await response.json();
    setOrders(ordersJson.orders);
  };

const columns = [
  { field: 'OrderID', headerName: 'Order #', width: 90 },
  {
    field: 'PropertyAddress',
    headerName: 'Address',
    width: 150,
    editable: true,
  },
  {
    field: 'PropertyCounty',
    headerName: 'County',
    width: 150,
    editable: true,
  },
  {
    field: 'RequestedInstallDate',
    headerName: 'Install Date',
    type: 'date',
    width: 110,
    editable: true,
    valueGetter: (value, row) => new Date(value),
  },
  {
    field: 'RequestedServiceID',
    headerName: 'Service',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row.OrderID}
        rows={orders}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default Orders;

// import { useState, useEffect } from "react";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     getOrders();
//   }, []);

//   const getOrders = async () => {
//     const response = await fetch('/api/orders');
//     const ordersJson = await response.json();
//     setOrders(ordersJson.orders);
//   };
  
//   return (
//       orders.map(order => (
//         <div key={order.OrderID}>
//           <p>{order.RequestedInstallDate}</p>
//           <p key={order.PropertyAddress}>{order.PropertyAddress}</p>
//           <p key={order.PropertyCounty}>{order.PropertyCounty}</p>
//         </div>
//       ))
//   )
// };

// export default Orders;
