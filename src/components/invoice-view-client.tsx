"use client";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { InvoiceDocument } from "@/components/invoice-pdf";
import { Download, ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { InvoiceHTML } from "@/components/invoice-html";

export default function InvoiceViewClient({ invoice }: { invoice: any }) {
  const [isClient, setIsClient] = useState(false);
  const [viewMode, setViewMode] = useState<'html' | 'pdf'>('html');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const shopName = process.env.NEXT_PUBLIC_SHOP_NAME || "श्री मसाला भांडार";
  const shopAddress = process.env.NEXT_PUBLIC_SHOP_ADDRESS || "पुणे, महाराष्ट्र";
  const shopPhone = process.env.NEXT_PUBLIC_SHOP_PHONE || "+91 98765 43210";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 mb-20">
      {/* Action Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100 print:hidden">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/invoices" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800 hindi-text">बिल क्र. {invoice.invoiceNo}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isClient && (
            <>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-md active:scale-95 hindi-text text-sm"
              >
                <Printer className="w-4 h-4" /> प्रिंन्ट (Print)
              </button>
              
              <PDFDownloadLink
                document={
                  <InvoiceDocument
                    invoice={invoice}
                    shopName={shopName}
                    shopAddress={shopAddress}
                    shopPhone={shopPhone}
                  />
                }
                fileName={`${invoice.invoiceNo}.pdf`}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold transition-all text-sm"
              >
                {({ loading }) => (loading ? "..." : <><Download className="w-4 h-4" /> PDF</>)}
              </PDFDownloadLink>

              <div className="ml-2 pl-2 border-l border-gray-200 flex gap-1">
                <button 
                  onClick={() => setViewMode('html')}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
                    viewMode === 'html' ? "bg-green-100 text-green-700" : "text-gray-500 hover:bg-gray-100"
                  )}
                >
                  HTML
                </button>
                <button 
                  onClick={() => setViewMode('pdf')}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
                    viewMode === 'pdf' ? "bg-green-100 text-green-700" : "text-gray-500 hover:bg-gray-100"
                  )}
                >
                  PDF Preview
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Invoice Preview */}
      {isClient && (
        <div className="w-full min-h-[800px]">
          {viewMode === 'html' ? (
            <InvoiceHTML 
              invoice={invoice}
              shopName={shopName}
              shopAddress={shopAddress}
              shopPhone={shopPhone}
            />
          ) : (
            <div className="h-[800px] w-full rounded-2xl overflow-hidden border-2 border-gray-200 shadow-sm bg-white">
              <PDFViewer width="100%" height="100%" showToolbar={true}>
                <InvoiceDocument
                  invoice={invoice}
                  shopName={shopName}
                  shopAddress={shopAddress}
                  shopPhone={shopPhone}
                />
              </PDFViewer>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
