import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@example.com",
    role: "ADMIN",
    password: "123123",
    phoneNumber: "+919876543210",

  },
  {
    name: "Bob",
    email: "bob@example.com",
    password: "123123",
    role: "USER",
    phoneNumber: "+14155552671",
  },
];

const productData: Prisma.ProductCreateInput[] = [
  {
    title: "Alpha Headphones",
    imageUrl: "https://picsum.photos/seed/1/200/300",
    description: "Wireless over-ear headphones",
    price: 199.99,
    discountedPrice: 149.99,
    category: "audio",
    enquiry: false,
  },
  {
    title: "Beta Speaker",
    imageUrl: "https://picsum.photos/seed/2/200/300",
    description: "Portable bluetooth speaker",
    price: 89.5,
    discountedPrice: 69.99,
    category: "audio",
    enquiry: false,
  },
  {
    title: "Gamma Charger",


    imageUrl: "https://picsum.photos/seed/3/200/300",

    description: "Fast USB-C charger 65W",
    price: 29.99,
    discountedPrice: 19.99,
    category: "accessories",
    enquiry: false,
  },
  {
    title: "Delta Cable",

    imageUrl: "https://picsum.photos/seed/4/200/300",
    description: "USB-C to Lightning cable",
    price: 9.99,
    category: "accessories",
    enquiry: false,
  },
  {
    title: "Epsilon Case",

    imageUrl: "https://picsum.photos/seed/5/200/300",
    description: "Protective phone case",
    price: 15.0,
    discountedPrice: 12.0,
    category: "cases",
    enquiry: true,
  },
]


export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
  
  for (const p of productData) {
    await prisma.product.create({ data: p });
  }

}

main();