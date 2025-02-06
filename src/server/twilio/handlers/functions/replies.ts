export async function greetNewCustomer(){
  let message =  'Welcome to Simple Sign Delivery automated ordering system for sign pick-up and delivery.\n';
      message += 'To start your order, please with your full name.'

  return message;
};

export async function getEmail({ session }){
  let message =  `Hi ${session.customer.Name}\n`;
      message += 'Please reply with your Email Address.\n';

  return message;
};

export async function getBrokerage(){
  return 'What Real Estate Brokerage are you associated with?';
};

export async function getPropertyAddress(){
  return 'What is the property address that you would like to have you sign delivered to?\n'
};

export async function getCounty(){
  return "Which county is the property located?";
};

export async function getService(){
  let message =  'Please reply with corresponding number of the Simple Installation Service Requested:\n';
      message += '1) Real Estate Sign\n';
      message += '2) Supra iBox\n';
      message += '3) Combo Lock Box\n';
      message += '4) Open House Sign Placement\n';

  return message;
};

export async function getServiceDate(){
  return 'What date would you like your service request to be fullfilled?\n';
};

export async function getRemovalDate(){
  return 'What date would you like your sign removed?\n';
};

export async function getOccupancy(){
  let message =  'Please reply with the corresponding number for Property Occupancy.\n\n';
      message += '1) Vacant\n';
      message += '2) Owner Occupied\n';
      message += '3) Tenant Occupied\n';

  return message;
};

export async function getInstallConfirmation({session: {customer: {newOrder: order}}}){
  let message =  "Please confirm the order install:\n";
      message += `Address:      ${order.PropertyAddress}\n`;
      message += `County:       ${order.County}\n`;
      message += `Service:      ${services[+order.RequestedService-1]}\n`;
      message += `Service Date: ${order.RequestedServiceDate}\n`;
      message += `Occupancy:    ${occupancies[+order.Occupancy-1]}\n\n`;
      message += '(C) to Confirm or (N) to Cancel';

  return message;
};

export async function endConversation({session}){
  session.destroy();
  return 'Your order has been placed.\nThank you for using the Simple Sign Delivery Automated Service.';
};

const occupancies = [
  'Vacant',
  'Owner Occupied',
  'Tenant Occupied'
];

const services = [
  'Real Estate Sign',
  'Supra iBox',
  'Combo Lock Box',
  'Open House Sign Placement'
];

export async function getOrderSelection({session: {customer}}){
  let message =  `Welcome back ${customer.FirstName} to Simple Sign Delivery automated ordering system for sign pick-up and delivery.\n`;
      message += `You currently have ${customer.Orders.length} installed orders.\n`;
      message += 'Would you like to remove a sign from one of your installed orders?\n';
      message += 'Please select a number to remove that order or "0" to start a new install:\n';
      message += '0) New install\n';
      message += customer.Orders.reduce((propertyList, order, orderNum) => propertyList + `${orderNum + 1}\) ${order.PropertyAddress}\n`, "" ); 

  return message;
};

export async function getRemovalConfirmation({session}){
  let order = session.customer.Orders.find(order => order.Remove);
  let message =  "Please confirm the order to remove:\n";
      message += `Address:      ${order.PropertyAddress}\n`;
      message += `County:       ${order.PropertyCounty}\n`;
      message += `Service:      ${order.RequestedService.Description}\n`;
      message += `Service Date: ${session.RemovalDate}\n`;
      message += `Occupancy:    ${order.Occupancy}\n\n`;
      message += '(C) to Confirm or (N) to Cancel';

  return message;
}