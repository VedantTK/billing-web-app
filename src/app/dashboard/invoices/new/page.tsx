import { prisma } from "@/lib/prisma";
import { getProducts } from "@/actions/products";
import NewInvoiceCreator from "@/components/new-invoice-creator";

export default async function NewInvoicePage() {
  const [categories, allProducts] = await Promise.all([
    prisma.category.findMany({
      include: {
        products: {
          include: { product: true },
          orderBy: { order: "asc" },
        },
      },
      orderBy: { name: "asc" },
    }),
    getProducts(),
  ]);

  return (
    <NewInvoiceCreator
      categories={categories}
      allProducts={allProducts}
    />
  );
}
