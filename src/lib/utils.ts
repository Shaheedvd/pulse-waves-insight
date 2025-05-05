
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add this as a backup in case the import from utils/pdf-generation fails
export function generateFinancialPdf(data: any) {
  console.log("Generating PDF:", data);
  alert(`PDF report would be generated here with data: ${JSON.stringify(data)}`);
  return Promise.resolve({ success: true });
}
