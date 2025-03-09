import { PrismaClient, PropertyOccupancy } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  /***  Request Services ***/
  const realEstateSign = await prisma.requestService.create({
    data: {
      RequestServiceID: 1,
      Description: "Real Estate Sign"
    }
  });
  const supraIBox = await prisma.requestService.create({
    data: {
      RequestServiceID: 2,
      Description: "Supra iBox"
    }
  });
  const comboBox = await prisma.requestService.create({
    data: {
      RequestServiceID: 3,
      Description: "Combo Box"
    }
  });
  const openHouseSignPlacement = await prisma.requestService.create({
    data: {
      RequestServiceID: 4,
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

  /***  Customers ***/
  const lindsay = await prisma.customer.create({
    data: {
      FirstName: "Lindsay",
      LastName: "Gilbert",
      PhoneNumber: "+15081994316",
      EmailAddress: "lindsay.gilbert@gmail.com",
      Brokerage: "Keller Williams"
    }
  });
  const camilla = await prisma.customer.create({
    data: {
      FirstName: "Camilla",
      LastName: "Mercy",
      PhoneNumber: "+14017591138",
      EmailAddress: "camilla.mercy@hotmail.com",
      Brokerage: "Keller Williams"
    }
  });
  const sullivan = await prisma.customer.create({
    data: {
      FirstName: "Sullivan",
      LastName: "Goldie",
      PhoneNumber: "+12144941167",
      EmailAddress: "sullivan.goldie@aol.com",
      Brokerage: "Century 21",
      Orders: {
        create: [
          {
            PropertyAddress: "4671 Copper Ln. Fort Worth, TX. 75045",
            PropertyCounty: "Tarrant County",
            RequestedServiceID: comboBox.RequestServiceID,
            RequestedInstallDate: new Date(2020, 10, 15),
            Occupancy: PropertyOccupancy.VACANT
          }
        ]
      }
    }
  });
  const zachery = await prisma.customer.create({
    data: {
      FirstName: "Zachery",
      LastName: "Caelan",
      PhoneNumber: "+15099671900",
      EmailAddress: "zachery.caelan@msn.com",
      Brokerage: "Century 21",
      Orders: {
        create: [
          {
            PropertyAddress: "3474 Vista St. Rowlett, TX. 75032",
            PropertyCounty: "Rowlett County",
            RequestedServiceID: realEstateSign.RequestServiceID,
            RequestedInstallDate: new Date(2023, 7, 28),
            Occupancy: PropertyOccupancy.VACANT
          }
        ]
      }
    }
  });
  const tonya = await prisma.customer.create({
    data: {
      FirstName: "Tonya",
      LastName: "Sterling",
      PhoneNumber: "+12145000142",
      EmailAddress: "tnantoine@gmail.com",
      Brokerage: "Jones Realty",
      Orders: {
        create: [
          {
            PropertyAddress: "2649 Sherwood Dr., Lewisville TX. 75067",
            PropertyCounty: "Denton County",
            RequestedServiceID: openHouseSignPlacement.RequestServiceID,
            RequestedInstallDate: new Date(2025, 3, 25),
            Occupancy: PropertyOccupancy.TENANT
          }
        ]
      }
    }
  });
  const latrelle = await prisma.customer.create({
    data: {
      FirstName: "Latrelle",
      LastName: "Stokes",
      PhoneNumber: "+17546329514",
      EmailAddress: "latrelle.stokes@hotmail.com",
      Brokerage: "Keller Williams",
      Orders: {
        create: [
          {
            PropertyAddress: "5642 Bay Lane. Frisco, TX. 75024",
            PropertyCounty: "Collin County",
            RequestedServiceID: comboBox.RequestServiceID,
            RequestedInstallDate: new Date(2022, 11, 4, 3, 4, 0),
            Occupancy: PropertyOccupancy.VACANT
          },
          {
            PropertyAddress: "5642 Bay Lane. Frisco, TX. 75024",
            PropertyCounty: "Collin County",
            RequestedServiceID: comboBox.RequestServiceID,
            RequestedInstallDate: new Date(2022, 11, 4, 3, 4, 0),
            Occupancy: PropertyOccupancy.VACANT
          },
          {
            PropertyAddress: "5372 Old Lane. Irving, TX. 75085",
            PropertyCounty: "Dallas County",
            RequestedServiceID: openHouseSignPlacement.RequestServiceID,
            RequestedInstallDate: new Date(2021, 4, 25),
            Occupancy: PropertyOccupancy.OWNER
          }
        ]
      }
    }
  });
  const lynell = await prisma.customer.create({
    data: {
      Title: "Mrs.",
      FirstName: "Lynell",
      MiddleName: "Jones",
      LastName: "Johnson",
      PhoneNumber: "+12145631193",
      EmailAddress: "yourrealtorfriendlj@gmail.com",
      Brokerage: "Lynell Jones Johnson Realtors",
      Orders: {
        create: [
          {
            PropertyAddress: "4739 Bradford St. Plano, TX. 75024",
            PropertyCounty: "Collin County",
            RequestedServiceID: supraIBox.RequestServiceID,
            RequestedInstallDate: new Date(2023, 10, 23, 15, 34, 0),
            Occupancy: PropertyOccupancy.OWNER,
            Fullfillment: {
              create: {
                FullfilledAt: new Date(2024, 2, 28, 0, 0, 0),
                FullfilledEmployeeID: sommerDarell.EmployeeID
              }
            }
          },
          {
            PropertyAddress: "29188 Amberly Ct. Little Elm, TX. 75068",
            PropertyCounty: "Denton County",
            RequestedServiceID: supraIBox.RequestServiceID,
            RequestedInstallDate: new Date(2024, 2, 28, 8, 57, 0),
            Occupancy: PropertyOccupancy.TENANT
          },
          {
            PropertyAddress: "1221 Napier Dr. Plano, TX. 75024",
            PropertyCounty: "Collin County",
            RequestedServiceID: openHouseSignPlacement.RequestServiceID,
            RequestedInstallDate: new Date(2024, 8, 12, 12, 33, 0),
            Occupancy: PropertyOccupancy.OWNER
          },
          {
            PropertyAddress: "11819 Sycamore Dr. Mckinney, TX. 75071",
            PropertyCounty: "Collin County",
            RequestedServiceID: realEstateSign.RequestServiceID,
            RequestedInstallDate: new Date(2025, 1, 5, 22, 22, 0),
            Occupancy: PropertyOccupancy.VACANT
          },
          {
            PropertyAddress: "38492 Knight Ave. Dallas, TX. 75022",
            PropertyCounty: "Dallas County",
            RequestedServiceID: realEstateSign.RequestServiceID,
            RequestedInstallDate: new Date(2025, 1, 15, 1, 2, 0),
            Occupancy: PropertyOccupancy.OWNER,
            Fullfillment: {
              create: {
                FullfilledAt: new Date(2024, 8, 13),
                FullfilledEmployeeID: osbornDenver.EmployeeID
              }
            }
          },
          {
            PropertyAddress: "97857 Amber Ave. Dallas, TX. 75022",
            PropertyCounty: "Dallas County",
            RequestedServiceID: supraIBox.RequestServiceID,
            RequestedInstallDate: new Date(2025, 1, 5, 22, 22, 0),
            Occupancy: PropertyOccupancy.VACANT
          }
        ]
      }
    }
  });
  /***  Customers ***/
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
