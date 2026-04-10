const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'admin@masala.com' },
  });
  if (user) {
    console.log(`User found: ${user.email}`);
    console.log(`Role: ${user.role}`);
    console.log(`Hash: ${user.password}`);
  } else {
    console.log("User not found!");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
