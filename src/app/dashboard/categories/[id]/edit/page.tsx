import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getProducts } from "@/actions/products";
import EditCategoryForm from "@/components/edit-category-form";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [category, allProducts] = await Promise.all([
    prisma.category.findUnique({
      where: { id },
      include: { products: { include: { product: true }, orderBy: { order: "asc" } } },
    }),
    getProducts(),
  ]);
  if (!category) notFound();
  return <EditCategoryForm category={category} allProducts={allProducts} />;
}
