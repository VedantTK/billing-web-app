import { getProducts } from "@/actions/products";
import NewCategoryForm from "@/components/new-category-form";

export default async function NewCategoryPage() {
  const allProducts = await getProducts();
  return <NewCategoryForm allProducts={allProducts} />;
}
