import prisma from "../../db";

export const getEmployees = async (_, res) => {
  const employees = await prisma.employee.findMany();

  res.json({ data: employees });
};
