"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/actions/categories";
import Link from "next/link";
import { ArrowLeft, Search, X } from "lucide-react";

interface Product {
  id: string;
  nameHindi: string;
  nameEnglish: string | null;
  unit: string;
  price: number;
}

export default function NewCategoryPage({ allProducts }: { allProducts: Product[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const filtered = allProducts.filter(
    (p) =>
      !selected.find((s) => s.id === p.id) &&
      (p.nameHindi.includes(search) || (p.nameEnglish || "").toLowerCase().includes(search.toLowerCase()))
  );

  const addProduct = (p: Product) => {
    setSelected((prev) => [...prev, p]);
    setSearch("");
  };
  const removeProduct = (id: string) => setSelected((prev) => prev.filter((p) => p.id !== id));

  const handleSubmit = async () => {
    if (!name.trim()) return alert("श्रेणीचे नाव टाका");
    setLoading(true);
    const fd = new FormData();
    fd.append("name", name);
    selected.forEach((p) => fd.append("productIds", p.id));
    await createCategory(fd);
    router.push("/dashboard/categories");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/categories" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 hindi-text">नवीन श्रेणी</h1>
          <p className="text-gray-500 text-sm">New Category</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div>
          <label className="block font-semibold text-gray-700 mb-2 hindi-text">श्रेणीचे नाव * (Hindi)</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 hindi-text"
            placeholder="जसे: चटणी मसाला"
          />
        </div>

        {/* Selected products */}
        {selected.length > 0 && (
          <div>
            <label className="block font-semibold text-gray-700 mb-2 hindi-text">निवडलेली उत्पादने ({selected.length})</label>
            <div className="flex flex-wrap gap-2 p-3 bg-green-50 rounded-xl border border-green-100 min-h-12">
              {selected.map((p) => (
                <span key={p.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-700 text-white rounded-lg text-sm font-medium hindi-text">
                  {p.nameHindi}
                  <button onClick={() => removeProduct(p.id)} className="hover:text-red-200">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Product search & add */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2 hindi-text">उत्पादने जोडा</label>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 hindi-text"
              placeholder="उत्पादन शोधा..."
            />
          </div>
          <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-xl divide-y">
            {filtered.slice(0, 20).map((p) => (
              <button
                key={p.id}
                onClick={() => addProduct(p)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-green-50 text-left transition-colors"
              >
                <span className="hindi-text font-medium">{p.nameHindi}</span>
                <span className="text-sm text-gray-500">₹{p.price}/{p.unit}</span>
              </button>
            ))}
            {filtered.length === 0 && <p className="text-center text-gray-400 py-4 text-sm">उत्पादन सापडले नाही</p>}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Link href="/dashboard/categories" className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold text-center hover:bg-gray-50 hindi-text">रद्द करा</Link>
          <button onClick={handleSubmit} disabled={loading} className="flex-1 py-3 bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white rounded-xl font-bold hindi-text">
            {loading ? "जतन होत आहे..." : "✓ जतन करा"}
          </button>
        </div>
      </div>
    </div>
  );
}
