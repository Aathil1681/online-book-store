import { PrismaClient } from "@prisma/client";

//tells TypeScript that this variable lives in the global scope (outside of just this file).
declare global {
  var prisma: PrismaClient | undefined;
  //var prisma: PrismaClient | undefined means it can either hold a PrismaClient object (the database tool) or be undefined (nothing).
}
const prisma = global.prisma || new PrismaClient();
/*
First, check if global.prisma already exists (from the global scope).
If it does, use that (global.prisma).
If it doesn’t (i.e., it’s undefined), create a brand-new PrismaClient instance with new PrismaClient().
This avoids making extra database connections unnecessarily—reusing one is more efficient.
*/

if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}

/*
process.env.NODE_ENV is an environment variable that tells you the app’s mode (like "development" or "production").
If it’s "development", it assigns the prisma constant (from the previous line) to global.prisma.
Why? In development, tools like Next.js might reload your code a lot. Saving prisma globally ensures you don’t keep creating new database connections every time the code reloads.
*/

export default prisma;
