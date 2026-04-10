import { getDashboardStats } from "@/actions/invoices";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import {
  TrendingUp,
  Calendar,
  CalendarDays,
  FileText,
  Plus,
  Eye,
} from "lucide-react";
import DashboardCharts from "@/components/dashboard-charts";

export default async function DashboardPage() {
  const stats = await getDashboardStats(30);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 hindi-text">डॅशबोर्ड</h1>
          <p className="text-gray-500 mt-1">Dashboard — आपल्या व्यवसायाचे अवलोकन</p>
        </div>
        <Link
          href="/dashboard/invoices/new"
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-md transition-colors hindi-text"
        >
          <Plus className="w-5 h-5" />
          नया बिल बनाएं
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Today */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium hindi-text">आज की बिक्री</p>
              <p className="text-xs text-gray-400">Today's Sales</p>
              <p className="text-3xl font-bold text-gray-900 mt-2 amount-text">
                {formatCurrency(stats.today.total)}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stats.today.count} बिल</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </div>

        {/* This Month */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium hindi-text">इस महीने</p>
              <p className="text-xs text-gray-400">This Month</p>
              <p className="text-3xl font-bold text-gray-900 mt-2 amount-text">
                {formatCurrency(stats.month.total)}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stats.month.count} बिल</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <CalendarDays className="w-6 h-6 text-yellow-700" />
            </div>
          </div>
        </div>

        {/* This Year */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium hindi-text">इस साल</p>
              <p className="text-xs text-gray-400">This Year</p>
              <p className="text-3xl font-bold text-gray-900 mt-2 amount-text">
                {formatCurrency(stats.year.total)}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stats.year.count} बिल</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <DashboardCharts
        topProducts={stats.topProducts}
        topCategories={stats.topCategories}
      />

      {/* Recent Invoices */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 hindi-text">अलीकडील बिले</h2>
            <p className="text-sm text-gray-500">Recent Invoices</p>
          </div>
          <Link href="/dashboard/invoices" className="text-green-700 hover:text-green-800 font-semibold text-sm">
            सर्व पहा →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-2 text-gray-500 font-semibold">बिल क्र.</th>
                <th className="text-left py-3 px-2 text-gray-500 font-semibold hindi-text">ग्राहक</th>
                <th className="text-left py-3 px-2 text-gray-500 font-semibold hindi-text">दिनांक</th>
                <th className="text-right py-3 px-2 text-gray-500 font-semibold hindi-text">रक्कम</th>
                <th className="text-center py-3 px-2 text-gray-500 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats.recentInvoices.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400 hindi-text">
                    अजून कोणतेही बिल नाही
                  </td>
                </tr>
              )}
              {stats.recentInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-2 font-mono text-xs text-gray-600">{inv.invoiceNo}</td>
                  <td className="py-3 px-2 font-semibold text-gray-800">{inv.customerName}</td>
                  <td className="py-3 px-2 text-gray-500">{formatDate(inv.createdAt)}</td>
                  <td className="py-3 px-2 text-right font-bold text-green-700 amount-text">
                    {formatCurrency(inv.grandTotal)}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <Link
                      href={`/dashboard/invoices/${inv.id}`}
                      className="inline-flex items-center gap-1 text-green-700 hover:text-green-900 font-semibold"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
