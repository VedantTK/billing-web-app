"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#15803d", "#16a34a", "#4ade80", "#facc15", "#f97316"];

interface Props {
  topProducts: { name: string; amount: number }[];
  topCategories: { name: string; total: number }[];
}

export default function DashboardCharts({ topProducts, topCategories }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Top Products Bar Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-1 hindi-text">टॉप 5 उत्पादने</h2>
        <p className="text-sm text-gray-500 mb-4">Top 5 Products by Revenue</p>
        {topProducts.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-gray-400 text-sm hindi-text">
            अजून डेटा नाही
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topProducts} margin={{ top: 5, right: 10, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fontFamily: "Noto Sans Devanagari" }}
                angle={-35}
                textAnchor="end"
                interval={0}
              />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v}`} />
              <Tooltip
                formatter={(value: number) =>
                  [`₹${value.toFixed(2)}`, "राजस्व"]
                }
              />
              <Bar dataKey="amount" fill="#15803d" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Top Categories Pie Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-1 hindi-text">टॉप 5 श्रेणी</h2>
        <p className="text-sm text-gray-500 mb-4">Top 5 Categories by Revenue</p>
        {topCategories.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-gray-400 text-sm hindi-text">
            अजून डेटा नाही
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={topCategories.map((c) => ({ name: c.name, value: c.total }))}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {topCategories.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend
                formatter={(value) => (
                  <span style={{ fontFamily: "Noto Sans Devanagari", fontSize: 12 }}>
                    {value}
                  </span>
                )}
              />
              <Tooltip formatter={(value: number) => [`₹${value.toFixed(2)}`, "राजस्व"]} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
