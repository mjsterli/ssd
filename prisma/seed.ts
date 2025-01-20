import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  /***  Customers ***/
  const lindsay = await prisma.customer.upsert({
    where: {
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
      EmailAddress: "sullivan.goldie@aol.com"
    },
    update: {},
    create: {
      FirstName: "Sullivan",
      LastName: "Goldie",
      PhoneNumber: "2144941167",
      EmailAddress: "sullivan.goldie@aol.com"
    }
  });
  const zachery = await prisma.customer.upsert({
    where: {
      EmailAddress: ""
    },
    update: {},
    create: {
      FirstName: "Zachery",
      LastName: "Caelan",
      PhoneNumber: "5099671900",
      EmailAddress: "zachery.caelan@msn.com"
    }
  });
  const shawnee = await prisma.customer.upsert({
    where: {
      EmailAddress: ""
    },
    update: {},
    create: {
      FirstName: "Shawnee",
      LastName: "Jordan",
      PhoneNumber: "4527896352",
      EmailAddress: "shawnee.jordan@gmail.com"
    }
  });
  const latrelle = await prisma.customer.upsert({
    where: {
      EmailAddress: ""
    },
    update: {},
    create: {
      FirstName: "Latrelle",
      LastName: "Stokes",
      PhoneNumber: "7546329514",
      EmailAddress: "latrelle.stokes@hotmail.com"
    }
  });
  const lynell_johnson = await prisma.customer.upsert({
    where: {
      EmailAddress: ""
    },
    update: {},
    create: {
      FirstName: "Lynell",
      LastName: "Johnson",
      PhoneNumber: "2145631193",
      EmailAddress: "yourrealtorfriendlj@gmail.com"
    }
  });
  /***  Customers ***/

  
  /***  Request Services ***/
  const realEstateSignInstall = await prisma.requestService.upsert({
    where: {
      RequestServiceID: ""
    },
    update: {},
    create: {
      Description: "Real Estate Sign Install"
    }
  });
  const realEstateSignRemoval = await prisma.requestService.upsert({
    where: {
      RequestServiceID: ""
    },
    update: {},
    create: {
      Description: "Real Estate Sign Removal"
    }
  });
  const supraIBoxInstall = await prisma.requestService.upsert({
    where: {
      RequestServiceID: ""
    },
    update: {},
    create: {
      Description: "Supra iBox Install"
    }
  });
  const supraIBoxRemoval = await prisma.requestService.upsert({
    where: {
      RequestServiceID: ""
    },
    update: {},
    create: {
      Description: "Supra iBox Removal"
    }
  });
  const comboBoxInstall = await prisma.requestService.upsert({
    where: {
      RequestServiceID: ""
    },
    update: {},
    create: {
      Description: "Combo Box Install"
    }
  });
  const comboBoxRemoval = await prisma.requestService.upsert({
    where: {
      RequestServiceID: ""
    },
    update: {},
    create: {
      Description: "Combo Box Removal"
    }
  });
  const openHouseSignPlacement = await prisma.requestService.upsert({
    where: {
      RequestServiceID: ""
    },
    update: {},
    create: {
      Description: "Open House Sign Placement"
    }
  });
  /***  Request Services ***/

  /***  Employee  ***/
  const angieSunshie = await prisma.employee.upsert({
    where: {
      EmployeeID: ""
    },
    update: {},
    create: {
      FirstName: "Angie",
      LastName: "Sunshine"
    }
  });
  const osbornDenver = await prisma.employee.upsert({
    where: {
      EmployeeID: ""
    },
    update: {},
    create: {
      FirstName: "Osborn",
      LastName: "Denver"
    }
  });
  const sommerDarell = await prisma.employee.upsert({
    where: {
      EmployeeID: ""
    },
    update: {},
    create: {
      FirstName: "Sommer",
      LastName: "Darell"
    }
  });
  /***  Employee  ***/

  /***  Orders  ***/
  const order1 = await prisma.order.upsert({
    where: {
      OrderID: ""
    },
    update: {},
    create: {
      PropertyAddress: "4739 Bradford St. Plano, TX. 75024",
      PropertyCounty: "Collin",
      RequestedServiceID: supraIBoxRemoval.RequestServiceID,
      RequestedServiceDate: new Date(2023, 10, 23, 15, 34, 0),
      Occupancy: "OwnerOccupied",
      CustomerID: zachery.CustomerID
    }
  });
  const order2 = await prisma.order.upsert({
    where: {
      OrderID: ""
    },
    update: {},
    create: {
      PropertyAddress: "29188 Amberly Ct. Little Elm, TX. 75068",
      PropertyCounty: "Denton",
      RequestedServiceID: supraIBoxInstall.RequestServiceID,
      RequestedServiceDate: new Date(2024, 2, 28, 8, 57, 0),
      Occupancy: "TENANT",
      CustomerID: camilla.CustomerID
    }
  });
  const order3 = await prisma.order.upsert({
    where: {
      OrderID: ""
    },
    update: {},
    create: {
      PropertyAddress: "1221 Napier Dr. Plano, TX. 75024",
      PropertyCounty: "Collin",
      RequestedServiceID: openHouseSignPlacement.RequestServiceID,
      RequestedServiceDate: new Date(2024, 8, 12, 12, 33, 0),
      Occupancy: "OwnerOccupied",
      CustomerID: lindsay.CustomerID
    }
  });
  const order4 = await prisma.order.upsert({
    where: {
      OrderID: ""
    },
    update: {},
    create: {
      PropertyAddress: "11819 Sycamore Dr. Mckinney, TX. 75071",
      PropertyCounty: "Collin",
      RequestedServiceID: realEstateSignInstall.RequestServiceID,
      RequestedServiceDate: new Date(2025, 1, 5, 22, 22, 0),
      Occupancy: "Vacant",
      CustomerID: sullivan.CustomerID
    }
  });
  const order5 = await prisma.order.upsert({
    where: {
      OrderID: ""
    },
    update: {},
    create: {
      PropertyAddress: "38492 Knight Ave. Dallas, TX. 75022",
      PropertyCounty: "Dallas",
      RequestedServiceID: realEstateSignInstall.RequestServiceID,
      RequestedServiceDate: new Date(2025, 1, 15, 1, 2, 0),
      Occupancy: "OwnerOccupied",
      CustomerID: sullivan.CustomerID
    }
  });
  const order6 = await prisma.order.upsert({
    where: {
      OrderID: ""
    },
    update: {},
    create: {
      PropertyAddress: "97857 Amber Ave. Dallas, TX. 75022",
      PropertyCounty: "Dallas",
      RequestedServiceID: supraIBoxRemoval.RequestServiceID,
      RequestedServiceDate: new Date(2025, 1, 5, 22, 22, 0),
      Occupancy: "Vacant",
      CustomerID: lynell_johnson.CustomerID
    }
  });
  const order7 = await prisma.order.upsert({
    where: {
      OrderID: ""
    },
    update: {},
    create: {
      PropertyAddress: "5642 Bay Lane. Frisco, TX. 75024",
      PropertyCounty: "Collin",
      RequestedServiceID: comboBoxRemoval.RequestServiceID,
      RequestedServiceDate: new Date(2022, 11, 4, 3, 4, 0),
      Occupancy: "Vacant",
      CustomerID: lynell_johnson.CustomerID
    }
  });
  const order8 = await prisma.order.upsert({
    where: {
      OrderID: ""
    },
    update: {},
    create: {
      PropertyAddress: "5372 Old Lane. Irving, TX. 75085",
      PropertyCounty: "Dallas",
      RequestedServiceID: openHouseSignPlacement.RequestServiceID,
      RequestedServiceDate: new Date(2021, 4, 25),
      Occupancy: "OwnerOccupied",
      CustomerID: lynell_johnson.CustomerID
    }
  });
  const order9 = await prisma.order.upsert({
    where: {
      OrderID: ""
    },
    update: {},
    create: {
      PropertyAddress: "3474 Vista St. Rowlett, TX. 75032",
      PropertyCounty: "Rowlett",
      RequestedServiceID: realEstateSignInstall.RequestServiceID,
      RequestedServiceDate: new Date(2023, 7, 28),
      Occupancy: "Vacant",
      CustomerID: lynell_johnson.CustomerID
    }
  });
  const order10 = await prisma.order.upsert({
    where: {
      OrderID: ""
    },
    update: {},
    create: {
      PropertyAddress: "4671 Copper Ln. Fort Worth, TX. 75045",
      PropertyCounty: "Tarrant",
      RequestedServiceID: comboBoxRemoval.RequestServiceID,
      RequestedServiceDate: new Date(2020, 10, 15),
      Occupancy: "Vacant",
      CustomerID: lynell_johnson.CustomerID
    }
  });
  const order11 = await prisma.order.upsert({
    where: {
      OrderID: ""
    },
    update: {},
    create: {
      PropertyAddress: "98396 Fortune Ave. Denton, TX. 75041",
      PropertyCounty: "Denton",
      RequestedServiceID: openHouseSignPlacement.RequestServiceID,
      RequestedServiceDate: new Date(2025, 3, 25),
      Occupancy: "TENANT",
      CustomerID: lynell_johnson.CustomerID
    }
  });
  /***  Orders  ***/

  /***  Fullfillments  ***/
  const order2Fullfilled = await prisma.fullfillment.upsert({
    where: {
      FullfilledOrderID: ""
    },
    update: {},
    create: {
      FullfilledOrderID: order2.OrderID,
      FullfilledAt: new Date(2024, 2, 28, 0, 0, 0),
      FullfilledEmployeeID: sommerDarell.EmployeeID
    }
  });
  const order3Fullfilled = await prisma.fullfillment.upsert({
    where: {
      FullfilledOrderID: ""
    },
    update: {},
    create: {
      FullfilledOrderID: order3.OrderID,
      FullfilledAt: new Date(2024, 8, 13),
      FullfilledEmployeeID: osbornDenver.EmployeeID
    }
  });
  /***  Fullfillments  ***/

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