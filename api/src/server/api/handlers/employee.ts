import prisma from "../../db";
import { Response } from "express";

export const getEmployees = async (_: any, res: Response) => {
  const employees = await prisma.employee.findMany();

  res.json({ data: employees });
};
