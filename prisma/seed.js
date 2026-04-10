const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const chatniMasalaItems = [
  { nameHindi: "धने पावडर", nameEnglish: "Coriander Powder", unit: "KG", price: 120 },
  { nameHindi: "जिरे पावडर", nameEnglish: "Cumin Powder", unit: "KG", price: 180 },
  { nameHindi: "हळद पावडर", nameEnglish: "Turmeric Powder", unit: "KG", price: 150 },
  { nameHindi: "लाल तिखट", nameEnglish: "Red Chilli Powder", unit: "KG", price: 200 },
  { nameHindi: "काळा मसाला", nameEnglish: "Kala Masala", unit: "KG", price: 250 },
  { nameHindi: "गरम मसाला", nameEnglish: "Garam Masala", unit: "KG", price: 280 },
  { nameHindi: "चाट मसाला", nameEnglish: "Chaat Masala", unit: "KG", price: 220 },
  { nameHindi: "आमचूर पावडर", nameEnglish: "Dry Mango Powder", unit: "KG", price: 160 },
  { nameHindi: "हिंग", nameEnglish: "Asafoetida", unit: "KG", price: 1200 },
  { nameHindi: "मेथी पावडर", nameEnglish: "Fenugreek Powder", unit: "KG", price: 140 },
  { nameHindi: "काळे मिरी पावडर", nameEnglish: "Black Pepper Powder", unit: "KG", price: 600 },
  { nameHindi: "वेलची पावडर", nameEnglish: "Cardamom Powder", unit: "KG", price: 2000 },
  { nameHindi: "दालचिनी पावडर", nameEnglish: "Cinnamon Powder", unit: "KG", price: 400 },
  { nameHindi: "लवंग पावडर", nameEnglish: "Clove Powder", unit: "KG", price: 1000 },
  { nameHindi: "तमालपत्र पावडर", nameEnglish: "Bay Leaf Powder", unit: "KG", price: 200 },
  { nameHindi: "सांबार मसाला", nameEnglish: "Sambar Masala", unit: "KG", price: 240 },
  { nameHindi: "पावभाजी मसाला", nameEnglish: "Pav Bhaji Masala", unit: "KG", price: 260 },
  { nameHindi: "रस्सा मसाला", nameEnglish: "Rassa Masala", unit: "KG", price: 270 },
  { nameHindi: "वरण मसाला", nameEnglish: "Varan Masala", unit: "KG", price: 230 },
  { nameHindi: "मटण मसाला", nameEnglish: "Mutton Masala", unit: "KG", price: 350 },
  { nameHindi: "चिकन मसाला", nameEnglish: "Chicken Masala", unit: "KG", price: 320 },
  { nameHindi: "मासे मसाला", nameEnglish: "Fish Masala", unit: "KG", price: 300 },
  { nameHindi: "बिर्याणी मसाला", nameEnglish: "Biryani Masala", unit: "KG", price: 290 },
  { nameHindi: "पुलाव मसाला", nameEnglish: "Pulao Masala", unit: "KG", price: 240 },
  { nameHindi: "उसळ मसाला", nameEnglish: "Usal Masala", unit: "KG", price: 220 },
  { nameHindi: "मिसळ मसाला", nameEnglish: "Misal Masala", unit: "KG", price: 250 },
  { nameHindi: "कांदा लसूण मसाला", nameEnglish: "Kanda Lasun Masala", unit: "KG", price: 260 },
  { nameHindi: "गोडा मसाला", nameEnglish: "Goda Masala", unit: "KG", price: 280 },
  { nameHindi: "सुका खोबरे पावडर", nameEnglish: "Dry Coconut Powder", unit: "KG", price: 180 },
  { nameHindi: "तीळ पावडर", nameEnglish: "Sesame Powder", unit: "KG", price: 160 },
];

async function main() {
  console.log("🌱 Starting safe seed...");

  // Pre-hashed password for 'admin123'
  const adminHash = '$2a$10$vI8tmv90zBih4m.fV2yP2.kOnd7l7A3m4/7leZ9zYp3X6b9i.kOnd7l7A3m4';

  const admin = await prisma.user.upsert({
    where: { email: "admin@masala.com" },
    update: { password: adminHash },
    create: {
      name: "Admin",
      email: "admin@masala.com",
      password: adminHash,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Products - Use create if not exists (check by nameHindi)
  const createdProducts = [];
  for (const item of chatniMasalaItems) {
    let product = await prisma.product.findFirst({
        where: { nameHindi: item.nameHindi }
    });
    
    if (!product) {
        product = await prisma.product.create({
            data: item
        });
    } else {
        product = await prisma.product.update({
            where: { id: product.id },
            data: { price: item.price, unit: item.unit }
        });
    }
    createdProducts.push(product);
  }
  console.log(`✅ Processed ${createdProducts.length} products`);

  // Category
  const category = await prisma.category.upsert({
    where: { name: "चटणी मसाला" },
    update: {},
    create: { name: "चटणी मसाला" },
  });

  // Link products
  for (let i = 0; i < createdProducts.length; i++) {
    await prisma.categoryProduct.upsert({
      where: {
        categoryId_productId: {
          categoryId: category.id,
          productId: createdProducts[i].id,
        },
      },
      update: {},
      create: {
        categoryId: category.id,
        productId: createdProducts[i].id,
        order: i + 1,
      },
    });
  }
  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
