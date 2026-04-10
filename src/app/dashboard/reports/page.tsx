"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { Download, FileSpreadsheet } from "lucide-react";

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);

  // This is a placeholder client component for the reports.
  // In a full implementation, you would fetch real data from the server.
  // For now, it provides the UI and the Excel export functionality outline.

  const downloadSampleReport = () => {
    setLoading(true);
    const data = [
      { "उत्पादन": "मिसळ मसाला", "विक्री प्रमाण (KG)": 45.5, "रक्कम (₹)": 11375 },
      { "उत्पादन": "गरम मसाला", "विक्री प्रमाण (KG)": 32.0, "रक्कम (₹)": 8960 },
      { "उत्पादन": "लाल तिखट", "विक्री प्रमाण (KG)": 50.0, "रक्कम (₹)": 10000 },
    ];
    
    setTimeout(() => {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
      XLSX.writeFile(wb, `Sales_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 hindi-text">अहवाल (Reports)</h1>
        <p className="text-gray-500 mt-1">आपल्या व्यवसायाचे सविस्तर अहवाल डाउनलोड करा</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Sales by Product */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 hindi-text">उत्पादन विक्री अहवाल</h3>
            <p className="text-sm text-gray-500 mt-1">Product-wise Sales Report</p>
          </div>
          <button 
            onClick={downloadSampleReport}
            disabled={loading}
            className="w-full mt-2 py-3 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors hindi-text"
          >
            <Download className="w-4 h-4" /> 
            {loading ? "डाउनलोड होत आहे..." : "Excel डाउनलोड करा"}
          </button>
        </div>
      </div>
    </div>
  );
}
