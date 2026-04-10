import { getInvoices } from "@/actions/invoices";
import Link from "next/link";
import { Plus, Eye, Search } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const page = parseInt(sp.page || "1");
  const { invoices, total, pages } = await getInvoices(page, sp.search);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 hindi-text">बिले</h1>
          <p className="text-gray-500 mt-1">Invoices — ({total} एकूण)</p>
        </div>
        <Link
          href="/dashboard/invoices/new"
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl font-bold shadow-md transition-colors text-lg hindi-text"
        >
          <Plus className="w-6 h-6" />
          नया बिल बनाएं
        </Link>
      </div>

      {/* Search */}
      <form className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            name="search"
            defaultValue={sp.search}
            placeholder="ग्राहक नाव, बिल क्र. शोधा..."
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 hindi-text"
          />
        </div>
        <button type="submit" className="px-6 py-3 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 hindi-text">शोधा</button>
      </form>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50 border-b border-green-100">
            <tr>
              <th className="text-left py-4 px-4 text-green-800 font-bold">बिल क्र.</th>
              <th className="text-left py-4 px-4 text-green-800 font-bold hindi-text">ग्राहक</th>
              <th className="text-left py-4 px-4 text-green-800 font-bold hindi-text">दिनांक</th>
              <th className="text-left py-4 px-4 text-green-800 font-bold hindi-text">बनवणारे</th>
              <th className="text-right py-4 px-4 text-green-800 font-bold hindi-text">रक्कम</th>
              <th className="text-center py-4 px-4 text-green-800 font-bold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {invoices.length === 0 && (
              <tr><td colSpan={6} className="text-center py-12 text-gray-400 hindi-text text-lg">कोणतेही बिल सापडले नाही</td></tr>
            )}
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3.5 px-4 font-mono text-xs text-gray-600 font-semibold">{inv.invoiceNo}</td>
                <td className="py-3.5 px-4 font-semibold text-gray-900">{inv.customerName}</td>
                <td className="py-3.5 px-4 text-gray-500">{formatDate(inv.createdAt)}</td>
                <td className="py-3.5 px-4 text-gray-500">{inv.createdBy.name}</td>
                <td className="py-3.5 px-4 text-right font-bold text-green-700 amount-text">{formatCurrency(inv.grandTotal)}</td>
                <td className="py-3.5 px-4 text-center">
                  <Link href={`/dashboard/invoices/${inv.id}`} className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold px-3 py-1.5 hover:bg-green-50 rounded-lg">
                    <Eye className="w-4 h-4" /> पहा
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/dashboard/invoices?page=${p}${sp.search ? `&search=${sp.search}` : ''}`}
              className={`w-10 h-10 flex items-center justify-center rounded-xl font-semibold transition-colors
                ${p === page ? 'bg-green-700 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
