import { PrismaClient, PropertyOccupancy } from "@prisma/client";

const prisma = new PrismaClient();

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T>(arr: T[]): T => arr[rand(0, arr.length - 1)];
const pad = (n: number) => `${n}`.padStart(4, "0");
const makeCustomerID = (phone: string) =>
  `${pad(rand(0, 9999))}-${phone.substring(8, 12)}`;

const FIRST_NAMES = [
  "James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda",
  "William", "Barbara", "David", "Susan", "Richard", "Jessica", "Joseph", "Sarah",
  "Thomas", "Karen", "Charles", "Lisa", "Christopher", "Nancy", "Daniel", "Betty",
  "Matthew", "Margaret", "Anthony", "Sandra", "Mark", "Ashley", "Donald", "Dorothy",
  "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
  "Kenneth", "Carol", "Kevin", "Amanda", "Brian", "Melissa", "George", "Deborah",
  "Timothy", "Stephanie", "Ronald", "Rebecca", "Edward", "Sharon", "Jason", "Laura",
  "Jeffrey", "Cynthia", "Ryan", "Kathleen", "Jacob", "Amy", "Gary", "Angela",
  "Nicholas", "Shirley", "Eric", "Anna", "Jonathan", "Brenda", "Stephen", "Pamela",
  "Larry", "Emma", "Justin", "Nicole",
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
  "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
  "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
  "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell",
  "Carter", "Roberts", "Phillips", "Evans", "Turner", "Parker", "Collins", "Edwards",
  "Stewart", "Morris", "Murphy", "Cook", "Rogers", "Morgan", "Peterson", "Cooper",
  "Reed", "Bailey", "Bell", "Gomez", "Kelly", "Howard", "Ward", "Cox", "Diaz",
  "Richardson", "Wood", "Watson",
];

const BROKERAGES = [
  "Keller Williams", "Century 21", "RE/MAX", "Coldwell Banker",
  "Berkshire Hathaway HomeServices", "eXp Realty", "Compass",
  "Jones Realty", "Texas Premier Realty", "Dave Perry Miller",
  "Allie Beth Allman", "Briggs Freeman Sotheby's", "Ebby Halliday",
];

const STREET_NAMES = [
  "Oak", "Maple", "Cedar", "Pine", "Elm", "Willow", "Birch", "Walnut",
  "Spring", "Lake", "Hill", "Valley", "Ridge", "Creek", "Park", "Meadow",
  "Bradford", "Amberly", "Copper", "Vista", "Sherwood", "Bay", "Knight",
  "Amber", "Napier", "Sycamore", "Mission", "Hunters", "Windmill", "Stone",
];

const STREET_TYPES = ["St.", "Ave.", "Blvd.", "Dr.", "Ln.", "Ct.", "Way", "Rd."];

const LOCATIONS = [
  { city: "Dallas",       state: "TX", zip: "75201", county: "Dallas County"   },
  { city: "Dallas",       state: "TX", zip: "75022", county: "Dallas County"   },
  { city: "Fort Worth",   state: "TX", zip: "76101", county: "Tarrant County"  },
  { city: "Fort Worth",   state: "TX", zip: "75045", county: "Tarrant County"  },
  { city: "Plano",        state: "TX", zip: "75024", county: "Collin County"   },
  { city: "Frisco",       state: "TX", zip: "75034", county: "Collin County"   },
  { city: "McKinney",     state: "TX", zip: "75071", county: "Collin County"   },
  { city: "Allen",        state: "TX", zip: "75002", county: "Collin County"   },
  { city: "Denton",       state: "TX", zip: "76201", county: "Denton County"   },
  { city: "Lewisville",   state: "TX", zip: "75067", county: "Denton County"   },
  { city: "Little Elm",   state: "TX", zip: "75068", county: "Denton County"   },
  { city: "Flower Mound", state: "TX", zip: "75028", county: "Denton County"   },
  { city: "Rowlett",      state: "TX", zip: "75032", county: "Rockwall County" },
  { city: "Garland",      state: "TX", zip: "75040", county: "Dallas County"   },
  { city: "Irving",       state: "TX", zip: "75085", county: "Dallas County"   },
  { city: "Arlington",    state: "TX", zip: "76001", county: "Tarrant County"  },
  { city: "Carrollton",   state: "TX", zip: "75006", county: "Dallas County"   },
  { city: "Richardson",   state: "TX", zip: "75080", county: "Dallas County"   },
  { city: "Mansfield",    state: "TX", zip: "76063", county: "Tarrant County"  },
  { city: "Southlake",    state: "TX", zip: "76092", county: "Tarrant County"  },
];

const OCCUPANCIES: PropertyOccupancy[] = [
  PropertyOccupancy.VACANT,
  PropertyOccupancy.OWNER,
  PropertyOccupancy.TENANT,
];

// Service IDs match seed.ts: 1=Real Estate Sign, 2=Supra iBox, 3=Combo Box, 4=Open House Sign Placement
const SERVICE_IDS = [1, 2, 3, 4];

const generateAddress = () => {
  const loc = pick(LOCATIONS);
  return {
    address: `${rand(100, 99999)} ${pick(STREET_NAMES)} ${pick(STREET_TYPES)} ${loc.city}, ${loc.state}. ${loc.zip}`,
    county: loc.county,
  };
};

const generatePhone = (used: Set<string>): string => {
  let phone: string;
  do {
    phone = `+1${rand(200, 999)}${rand(200, 999)}${rand(1000, 9999)}`;
  } while (used.has(phone));
  used.add(phone);
  return phone;
};

const generateDate = () =>
  new Date(rand(2020, 2025), rand(0, 11), rand(1, 28), rand(0, 23), rand(0, 59), 0);

// Order counts per customer — 75 customers, 100 total orders (all between 0–10)
// Distribution: 21×0, 27×1, 15×2, 7×3, 3×4, 2×5 = 75 customers, 100 orders
const ORDER_COUNTS = [
  ...Array<number>(21).fill(0),
  ...Array<number>(27).fill(1),
  ...Array<number>(15).fill(2),
  ...Array<number>(7).fill(3),
  ...Array<number>(3).fill(4),
  ...Array<number>(2).fill(5),
];

async function main() {
  /** Request Services (upsert in case seed.ts already ran) **/
  const [realEstateSign, supraIBox, comboBox, openHouseSignPlacement] =
    await Promise.all([
      prisma.requestService.upsert({
        where: { RequestServiceID: 1 },
        update: {},
        create: { RequestServiceID: 1, Description: "Real Estate Sign" },
      }),
      prisma.requestService.upsert({
        where: { RequestServiceID: 2 },
        update: {},
        create: { RequestServiceID: 2, Description: "Supra iBox" },
      }),
      prisma.requestService.upsert({
        where: { RequestServiceID: 3 },
        update: {},
        create: { RequestServiceID: 3, Description: "Combo Box" },
      }),
      prisma.requestService.upsert({
        where: { RequestServiceID: 4 },
        update: {},
        create: { RequestServiceID: 4, Description: "Open House Sign Placement" },
      }),
    ]);

  void realEstateSign, supraIBox, comboBox, openHouseSignPlacement;

  /** 20 Employees **/
  const employeeData = [
    { FirstName: "Aiden",    LastName: "Brooks"    },
    { FirstName: "Sofia",    LastName: "Patel"     },
    { FirstName: "Marcus",   LastName: "Flynn"     },
    { FirstName: "Elena",    LastName: "Vasquez"   },
    { FirstName: "Tyrone",   LastName: "Hughes"    },
    { FirstName: "Priya",    LastName: "Sharma"    },
    { FirstName: "Darnell",  LastName: "Owens"     },
    { FirstName: "Hannah",   LastName: "Carlson"   },
    { FirstName: "Rafael",   LastName: "Mendoza"   },
    { FirstName: "Claire",   LastName: "Nguyen"    },
    { FirstName: "Isaiah",   LastName: "Foster"    },
    { FirstName: "Amara",    LastName: "Osei"      },
    { FirstName: "Garrett",  LastName: "Simmons"   },
    { FirstName: "Yuki",     LastName: "Tanaka"    },
    { FirstName: "Caleb",    LastName: "Warren"    },
    { FirstName: "Nadia",    LastName: "Petrov"    },
    { FirstName: "DeShawn",  LastName: "Alexander" },
    { FirstName: "Ingrid",   LastName: "Larsson"   },
    { FirstName: "Brendan",  LastName: "O'Neil"    },
    { FirstName: "Fatima",   LastName: "Al-Hassan" },
  ];

  const employees = await Promise.all(
    employeeData.map((e) =>
      prisma.employee.create({ data: e })
    )
  );

  console.log(`Created ${employees.length} employees.`);

  /** 75 Customers with 100 total orders **/
  const usedPhones = new Set<string>();
  let totalOrders = 0;

  for (let i = 0; i < ORDER_COUNTS.length; i++) {
    const numOrders = ORDER_COUNTS[i];
    const firstName = FIRST_NAMES[(i * 7 + 3) % FIRST_NAMES.length];
    const lastName  = LAST_NAMES[(i * 11 + 5) % LAST_NAMES.length];
    const phone     = generatePhone(usedPhones);
    const customerID = makeCustomerID(phone);
    const email     = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@example.com`;
    const brokerage = BROKERAGES[i % BROKERAGES.length];

    const orderCreates = Array.from({ length: numOrders }, (_, orderIdx) => {
      const { address, county } = generateAddress();
      return {
        OrderID: `${customerID}-${pad(orderIdx + 1)}`,
        PropertyAddress: address,
        PropertyCounty: county,
        RequestedServiceID: pick(SERVICE_IDS),
        RequestedInstallDate: generateDate(),
        Occupancy: pick(OCCUPANCIES),
      };
    });

    await prisma.customer.create({
      data: {
        CustomerID: customerID,
        FirstName: firstName,
        LastName: lastName,
        PhoneNumber: phone,
        EmailAddress: email,
        Brokerage: brokerage,
        ...(orderCreates.length > 0 && {
          Orders: { create: orderCreates },
        }),
      },
    });

    totalOrders += numOrders;
  }

  console.log(`Created ${ORDER_COUNTS.length} customers with ${totalOrders} total orders.`);
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
