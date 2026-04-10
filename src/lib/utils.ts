import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function generateInvoiceNo(): string {
  const prefix = "INV";
  const timestamp = Date.now().toString().slice(-8);
  return `${prefix}-${timestamp}`;
}

// Convert number to words (for invoice total in words)
function ones(num: number): string {
  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ];
  return ones[num] || "";
}

function tens(num: number): string {
  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
  ];
  if (num < 20) return ones(num);
  return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones(num % 10) : "");
}

export function numberToWords(num: number): string {
  if (num === 0) return "Zero";
  const n = Math.floor(num);
  const paisa = Math.round((num - n) * 100);

  let result = "";
  if (n >= 10000000) {
    result += ones(Math.floor(n / 10000000)) + " Crore ";
  }
  if (n >= 100000) {
    result += tens(Math.floor((n % 10000000) / 100000)) + " Lakh ";
  }
  if (n >= 1000) {
    result += tens(Math.floor((n % 100000) / 1000)) + " Thousand ";
  }
  if (n >= 100) {
    result += ones(Math.floor((n % 1000) / 100)) + " Hundred ";
  }
  result += tens(n % 100);

  result = result.trim() + " Rupees";
  if (paisa > 0) {
    result += " and " + tens(paisa) + " Paise";
  }
  result += " Only";
  return result.trim();
}
