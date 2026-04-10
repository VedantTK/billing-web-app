const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@masala.com';
  const newHash = '$2b$12$OMso3eRoxjMQWC4DRtB7D.CmuLKvFy1KnS3cH0AuOoSZIC26C4d5u';

  const user = await prisma.user.update({
    where: { email },
    data: { password: newHash },
  });

  console.log(`Successfully updated password for: ${user.email}`);
  console.log(`New Hash: ${user.password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
