import { getProducts } from "@/actions/products";
import Link from "next/link";
import { Plus, Search, Pencil, Upload } from "lucide-react";
import DeleteProductButton from "@/components/delete-product-button";
import { formatCurrency } from "@/lib/utils";
import { auth } from "@/auth";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; unit?: string }>;
}) {
  const sp = await searchParams;
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";
  const products = await getProducts(sp.search, sp.unit as never);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 hindi-text">उत्पादने</h1>
          <p className="text-gray-500 mt-1">Products — मसाला यादी ({products.length} उत्पादने)</p>
        </div>
        <div className="flex gap-3">
          {isAdmin && (
            <Link
              href="/dashboard/products/import"
              className="flex items-center gap-2 border-2 border-green-700 text-green-700 hover:bg-green-50 px-4 py-2.5 rounded-xl font-semibold transition-colors"
            >
              <Upload className="w-4 h-4" />
              Excel आयात
            </Link>
          )}
          <Link
            href="/dashboard/products/new"
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span className="hindi-text">नवीन उत्पादन</span>
          </Link>
        </div>
      </div>

      {/* Search & Filter */}
      <form className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            name="search"
            defaultValue={sp.search}
            placeholder="उत्पादन शोधा... (Search products)"
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-base hindi-text"
          />
        </div>
        <select
          name="unit"
          defaultValue={sp.unit}
          className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white text-base"
        >
          <option value="">सर्व युनिट</option>
          <option value="KG">KG</option>
          <option value="GM">GM</option>
          <option value="PACK">PACK</option>
        </select>
        <button
          type="submit"
          className="px-6 py-3 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition-colors hindi-text"
        >
          शोधा
        </button>
      </form>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50 border-b border-green-100">
            <tr>
              <th className="text-left py-4 px-4 text-green-800 font-bold hindi-text">नाव (Hindi)</th>
              <th className="text-left py-4 px-4 text-green-800 font-bold">English</th>
              <th className="text-center py-4 px-4 text-green-800 font-bold">युनिट</th>
              <th className="text-right py-4 px-4 text-green-800 font-bold hindi-text">किंमत (₹)</th>
              <th className="text-center py-4 px-4 text-green-800 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400 hindi-text text-lg">
                  कोणतेही उत्पादन सापडले नाही
                </td>
              </tr>
            )}
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3.5 px-4 font-semibold hindi-text text-gray-900">{p.nameHindi}</td>
                <td className="py-3.5 px-4 text-gray-600">{p.nameEnglish || "—"}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-700">
                    {p.unit}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-green-700 amount-text">
                  {formatCurrency(p.price)}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/dashboard/products/${p.id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    {isAdmin && <DeleteProductButton id={p.id} name={p.nameHindi} />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
