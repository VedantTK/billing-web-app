import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil, Tag } from "lucide-react";
import DeleteCategoryButton from "@/components/delete-category-button";
import { auth } from "@/auth";

export default async function CategoriesPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  const categories = await prisma.category.findMany({
    include: {
      products: { include: { product: true }, orderBy: { order: "asc" } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 hindi-text">श्रेणी</h1>
          <p className="text-gray-500 mt-1">Categories — ({categories.length} श्रेणी)</p>
        </div>
        <Link
          href="/dashboard/categories/new"
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span className="hindi-text">नवीन श्रेणी</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Tag className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 hindi-text text-lg">{cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.products.length} उत्पादने</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Link
                  href={`/dashboard/categories/${cat.id}/edit`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                {isAdmin && <DeleteCategoryButton id={cat.id} name={cat.name} />}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {cat.products.slice(0, 5).map((cp) => (
                <span key={cp.id} className="px-2.5 py-1 bg-green-50 text-green-800 text-xs rounded-lg hindi-text font-medium">
                  {cp.product.nameHindi}
                </span>
              ))}
              {cat.products.length > 5 && (
                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                  +{cat.products.length - 5} अधिक
                </span>
              )}
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="col-span-3 text-center py-16 text-gray-400">
            <Tag className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="hindi-text text-lg">कोणतीही श्रेणी नाही</p>
          </div>
        )}
      </div>
    </div>
  );
}
