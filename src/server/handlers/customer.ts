import prisma from '../db';

export const getCustomerByPhoneNumber = async (req, res) => {
  const phoneNumber = req.params.phonenumber;

  const customer = await prisma.customer.findUnique({
    where: {
      PhoneNumber: phoneNumber
    }
  });

  res.json({ data: customer ?? {} });
}