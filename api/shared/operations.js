const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ID = () => {
  return `${getRandomInt(0, 9999)}`.padStart(4, "0");
};

export const generateCustomerID = (phoneNumber) => {
  let subscriberLine = phoneNumber.substring(8, 12),
    id = ID();

  return `${id}-${subscriberLine}`;
};

export const generateOrderID = (customerID, orders) => {
  let numOfOrders = (orders?.length ?? 0).padStart(4, '0');

  return `${customerID}-${numOfOrders}`;
};