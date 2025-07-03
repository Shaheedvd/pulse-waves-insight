
export interface FinanceTransaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  subcategory?: string;
  date: string;
  status: "pending" | "completed" | "cancelled";
  paymentMethod?: string;
  reference?: string;
  attachments?: string[];
  departmentId?: string;
  projectId?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  paymentTerms: string;
  paymentMethod?: string;
  notes?: string;
  attachments?: string[];
  createdBy: string;
  createdAt: string;
  paidAt?: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  total: number;
}

export interface Expense {
  id: string;
  vendorName: string;
  description: string;
  amount: number;
  category: string;
  subcategory?: string;
  date: string;
  dueDate?: string;
  status: "pending" | "approved" | "paid" | "overdue";
  paymentTerms?: string;
  departmentId?: string;
  projectId?: string;
  receiptUrl?: string;
  approvedBy?: string;
  paidAt?: string;
  createdBy: string;
  createdAt: string;
}

export interface Budget {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  period: string;
  startDate: string;
  endDate: string;
  categories: BudgetCategory[];
  totalBudget: number;
  totalActual: number;
  variance: number;
  variancePercent: number;
  status: "draft" | "approved" | "active" | "completed";
  createdBy: string;
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  budgetAmount: number;
  actualAmount: number;
  variance: number;
  variancePercent: number;
}

export interface PayrollEmployee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  payFrequency: "weekly" | "bi-weekly" | "monthly";
  bankDetails: {
    accountNumber: string;
    bankName: string;
    branchCode: string;
  };
  taxNumber?: string;
  deductions: PayrollDeduction[];
  bonuses: PayrollBonus[];
  isActive: boolean;
}

export interface PayrollDeduction {
  id: string;
  type: "tax" | "uif" | "loan" | "advance" | "other";
  description: string;
  amount: number;
  isPercentage: boolean;
}

export interface PayrollBonus {
  id: string;
  type: "performance" | "commission" | "overtime" | "other";
  description: string;
  amount: number;
  date: string;
}

export interface Payslip {
  id: string;
  employeeId: string;
  payPeriod: string;
  payDate: string;
  grossPay: number;
  deductions: PayrollDeduction[];
  bonuses: PayrollBonus[];
  netPay: number;
  status: "draft" | "processed" | "paid";
  createdAt: string;
}

export interface FinancialReport {
  id: string;
  name: string;
  type: "profit-loss" | "balance-sheet" | "cash-flow" | "trial-balance" | "aging" | "audit-trail";
  period: string;
  startDate: string;
  endDate: string;
  data: any;
  generatedBy: string;
  generatedAt: string;
}

export interface ExpenseClaim {
  id: string;
  employeeId: string;
  employeeName: string;
  description: string;
  amount: number;
  category: string;
  expenseDate: string;
  receiptUrl?: string;
  status: "pending" | "approved" | "rejected" | "paid";
  submittedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  paidAt?: string;
}

export interface FixedAsset {
  id: string;
  name: string;
  category: string;
  serialNumber?: string;
  purchaseDate: string;
  purchaseCost: number;
  currentValue: number;
  depreciationMethod: "straight-line" | "diminishing-balance";
  depreciationRate: number;
  location: string;
  assignedTo?: string;
  status: "active" | "disposed" | "maintenance";
  maintenanceHistory: AssetMaintenance[];
  createdAt: string;
}

export interface AssetMaintenance {
  id: string;
  date: string;
  description: string;
  cost: number;
  performedBy: string;
}

export interface BankReconciliation {
  id: string;
  accountName: string;
  statementDate: string;
  openingBalance: number;
  closingBalance: number;
  systemBalance: number;
  variance: number;
  reconciledItems: ReconciledItem[];
  status: "pending" | "completed";
  reconciledBy?: string;
  reconciledAt?: string;
}

export interface ReconciledItem {
  id: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  matched: boolean;
  transactionId?: string;
}
