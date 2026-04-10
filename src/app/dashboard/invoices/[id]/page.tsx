import { getInvoice } from "@/actions/invoices";
import { notFound } from "next/navigation";
import InvoiceViewClient from "@/components/invoice-view-client";

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = await getInvoice(id);
  if (!invoice) notFound();

  return <InvoiceViewClient invoice={invoice} />;
}
