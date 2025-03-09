import { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const response = await fetch('/api/orders');
    const ordersJson = await response.json();
    console.log(ordersJson);
    setOrders(ordersJson.orders);
  };
  
  return (
      orders.map(order => (
        <div key={order.OrderID}>
          <p key={order.PropertyAddress}>{order.PropertyAddress}</p>
          <p key={order.PropertyCounty}>{order.PropertyCounty}</p>
        </div>
      ))
  )
};

export default Orders;