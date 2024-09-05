import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const lindsay = await prisma.customer.upsert({
    where: {
      PhoneNumber: "5081994316",
      EmailAddress: "lindsay.gilbert@gmail.com"
    },
    update: {},
    create: {
      FirstName: "Lindsay",
      LastName: "Gilbert",
      PhoneNumber: "5081994316",
      EmailAddress: "lindsay.gilbert@gmail.com"
    }
  });
  const camilla = await prisma.customer.upsert({
    where: {
      PhoneNumber: "4017591138",
      EmailAddress: "camilla.mercy@hotmail.com"
    },
    update: {},
    create: {
      FirstName: "Camilla",
      LastName: "Mercy",
      PhoneNumber: "4017591138",
      EmailAddress: "camilla.mercy@hotmail.com"
    }
  });
  const sullivan = await prisma.customer.upsert({
    where: {
      PhoneNumber: "5046197753",
      EmailAddress: "sullivan.goldie@aol.com"
    },
    update: {},
    create: {
      FirstName: "Sullivan",
      LastName: "Goldie",
      PhoneNumber: "5046197753",
      EmailAddress: "sullivan.goldie@aol.com"
    }
  });
  const zachery = await prisma.customer.upsert({
    where: {
      PhoneNumber: "5099671900",
      EmailAddress: "zachery.caelan@msn.com"
    },
    update: {},
    create: {
      FirstName: "Zachery",
      LastName: "Caelan",
      PhoneNumber: "5099671900",
      EmailAddress: "zachery.caelan@msn.com"
    }
  });
  
};

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });