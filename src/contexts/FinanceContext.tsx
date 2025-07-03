
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  FinanceTransaction, 
  Invoice, 
  Expense, 
  Budget, 
  PayrollEmployee, 
  Payslip, 
  ExpenseClaim, 
  FixedAsset,
  BankReconciliation,
  FinancialReport
} from '@/types/finance';

interface FinanceContextType {
  // Transactions
  transactions: FinanceTransaction[];
  addTransaction: (transaction: Omit<FinanceTransaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTransaction: (id: string, updates: Partial<FinanceTransaction>) => void;
  deleteTransaction: (id: string) => void;

  // Invoices
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, 'id' | 'createdAt'>) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;

  // Expenses
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;

  // Budgets
  budgets: Budget[];
  addBudget: (budget: Omit<Budget, 'id' | 'createdAt'>) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;

  // Payroll
  payrollEmployees: PayrollEmployee[];
  payslips: Payslip[];
  addPayrollEmployee: (employee: Omit<PayrollEmployee, 'id'>) => void;
  updatePayrollEmployee: (id: string, updates: Partial<PayrollEmployee>) => void;
  generatePayslip: (employeeId: string, payPeriod: string) => void;

  // Expense Claims
  expenseClaims: ExpenseClaim[];
  addExpenseClaim: (claim: Omit<ExpenseClaim, 'id' | 'submittedAt'>) => void;
  updateExpenseClaim: (id: string, updates: Partial<ExpenseClaim>) => void;

  // Fixed Assets
  fixedAssets: FixedAsset[];
  addFixedAsset: (asset: Omit<FixedAsset, 'id' | 'createdAt'>) => void;
  updateFixedAsset: (id: string, updates: Partial<FixedAsset>) => void;

  // Bank Reconciliation
  bankReconciliations: BankReconciliation[];
  addBankReconciliation: (reconciliation: Omit<BankReconciliation, 'id'>) => void;
  updateBankReconciliation: (id: string, updates: Partial<BankReconciliation>) => void;

  // Reports
  financialReports: FinancialReport[];
  generateReport: (type: string, period: string, startDate: string, endDate: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  // Sample data
  const [transactions, setTransactions] = useState<FinanceTransaction[]>([
    {
      id: '1',
      type: 'income',
      amount: 25000,
      description: 'Client payment - ABC Corp',
      category: 'Revenue',
      subcategory: 'Service Income',
      date: '2024-01-15',
      status: 'completed',
      paymentMethod: 'Bank Transfer',
      reference: 'INV-001',
      createdBy: 'admin',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      type: 'expense',
      amount: 5000,
      description: 'Office rent',
      category: 'Operating Expenses',
      subcategory: 'Rent',
      date: '2024-01-01',
      status: 'completed',
      paymentMethod: 'Bank Transfer',
      createdBy: 'admin',
      createdAt: '2024-01-01T09:00:00Z',
      updatedAt: '2024-01-01T09:00:00Z'
    }
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      clientId: 'client-1',
      clientName: 'ABC Corporation',
      invoiceNumber: 'INV-001',
      issueDate: '2024-01-10',
      dueDate: '2024-02-10',
      status: 'sent',
      lineItems: [
        {
          id: '1',
          description: 'Consulting Services',
          quantity: 10,
          unitPrice: 2500,
          taxRate: 15,
          total: 28750
        }
      ],
      subtotal: 25000,
      taxAmount: 3750,
      discountAmount: 0,
      totalAmount: 28750,
      paymentTerms: '30 days',
      createdBy: 'admin',
      createdAt: '2024-01-10T08:00:00Z'
    }
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      vendorName: 'Property Management Co',
      description: 'Monthly office rent',
      amount: 5000,
      category: 'Operating Expenses',
      subcategory: 'Rent',
      date: '2024-01-01',
      status: 'paid',
      paymentTerms: 'Monthly',
      departmentId: 'ops',
      createdBy: 'admin',
      createdAt: '2024-01-01T09:00:00Z'
    }
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: '1',
      name: 'Q1 2024 Marketing Budget',
      departmentId: 'marketing',
      departmentName: 'Marketing',
      period: 'Q1 2024',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      categories: [
        {
          id: '1',
          name: 'Digital Advertising',
          budgetAmount: 50000,
          actualAmount: 35000,
          variance: -15000,
          variancePercent: -30
        },
        {
          id: '2',
          name: 'Content Creation',
          budgetAmount: 25000,
          actualAmount: 28000,
          variance: 3000,
          variancePercent: 12
        }
      ],
      totalBudget: 75000,
      totalActual: 63000,
      variance: -12000,
      variancePercent: -16,
      status: 'active',
      createdBy: 'admin',
      createdAt: '2024-01-01T00:00:00Z'
    }
  ]);

  const [payrollEmployees, setPayrollEmployees] = useState<PayrollEmployee[]>([
    {
      id: '1',
      employeeId: 'EMP-001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      salary: 85000,
      payFrequency: 'monthly',
      bankDetails: {
        accountNumber: '1234567890',
        bankName: 'Standard Bank',
        branchCode: '051001'
      },
      taxNumber: 'TAX123456789',
      deductions: [
        {
          id: '1',
          type: 'tax',
          description: 'PAYE',
          amount: 25,
          isPercentage: true
        },
        {
          id: '2',
          type: 'uif',
          description: 'UIF',
          amount: 1,
          isPercentage: true
        }
      ],
      bonuses: [],
      isActive: true
    }
  ]);

  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [expenseClaims, setExpenseClaims] = useState<ExpenseClaim[]>([]);
  const [fixedAssets, setFixedAssets] = useState<FixedAsset[]>([]);
  const [bankReconciliations, setBankReconciliations] = useState<BankReconciliation[]>([]);
  const [financialReports, setFinancialReports] = useState<FinancialReport[]>([]);

  // Transaction functions
  const addTransaction = (transaction: Omit<FinanceTransaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTransaction: FinanceTransaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const updateTransaction = (id: string, updates: Partial<FinanceTransaction>) => {
    setTransactions(prev => prev.map(t => 
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    ));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Invoice functions
  const addInvoice = (invoice: Omit<Invoice, 'id' | 'createdAt'>) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setInvoices(prev => [...prev, newInvoice]);
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(i => i.id !== id));
  };

  // Expense functions
  const addExpense = (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setExpenses(prev => [...prev, newExpense]);
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  // Budget functions
  const addBudget = (budget: Omit<Budget, 'id' | 'createdAt'>) => {
    const newBudget: Budget = {
      ...budget,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setBudgets(prev => [...prev, newBudget]);
  };

  const updateBudget = (id: string, updates: Partial<Budget>) => {
    setBudgets(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
  };

  // Payroll functions
  const addPayrollEmployee = (employee: Omit<PayrollEmployee, 'id'>) => {
    const newEmployee: PayrollEmployee = {
      ...employee,
      id: Date.now().toString()
    };
    setPayrollEmployees(prev => [...prev, newEmployee]);
  };

  const updatePayrollEmployee = (id: string, updates: Partial<PayrollEmployee>) => {
    setPayrollEmployees(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const generatePayslip = (employeeId: string, payPeriod: string) => {
    const employee = payrollEmployees.find(e => e.id === employeeId);
    if (!employee) return;

    const grossPay = employee.salary;
    const totalDeductions = employee.deductions.reduce((sum, d) => {
      return sum + (d.isPercentage ? (grossPay * d.amount / 100) : d.amount);
    }, 0);
    const totalBonuses = employee.bonuses.reduce((sum, b) => sum + b.amount, 0);
    const netPay = grossPay + totalBonuses - totalDeductions;

    const newPayslip: Payslip = {
      id: Date.now().toString(),
      employeeId,
      payPeriod,
      payDate: new Date().toISOString().split('T')[0],
      grossPay,
      deductions: employee.deductions,
      bonuses: employee.bonuses,
      netPay,
      status: 'draft',
      createdAt: new Date().toISOString()
    };

    setPayslips(prev => [...prev, newPayslip]);
  };

  // Expense Claims functions
  const addExpenseClaim = (claim: Omit<ExpenseClaim, 'id' | 'submittedAt'>) => {
    const newClaim: ExpenseClaim = {
      ...claim,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    };
    setExpenseClaims(prev => [...prev, newClaim]);
  };

  const updateExpenseClaim = (id: string, updates: Partial<ExpenseClaim>) => {
    setExpenseClaims(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  // Fixed Assets functions
  const addFixedAsset = (asset: Omit<FixedAsset, 'id' | 'createdAt'>) => {
    const newAsset: FixedAsset = {
      ...asset,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setFixedAssets(prev => [...prev, newAsset]);
  };

  const updateFixedAsset = (id: string, updates: Partial<FixedAsset>) => {
    setFixedAssets(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  // Bank Reconciliation functions
  const addBankReconciliation = (reconciliation: Omit<BankReconciliation, 'id'>) => {
    const newReconciliation: BankReconciliation = {
      ...reconciliation,
      id: Date.now().toString()
    };
    setBankReconciliations(prev => [...prev, newReconciliation]);
  };

  const updateBankReconciliation = (id: string, updates: Partial<BankReconciliation>) => {
    setBankReconciliations(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  // Reports function
  const generateReport = (type: string, period: string, startDate: string, endDate: string) => {
    const newReport: FinancialReport = {
      id: Date.now().toString(),
      name: `${type} - ${period}`,
      type: type as any,
      period,
      startDate,
      endDate,
      data: {}, // Would contain actual report data
      generatedBy: 'admin',
      generatedAt: new Date().toISOString()
    };
    setFinancialReports(prev => [...prev, newReport]);
  };

  const value: FinanceContextType = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    invoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    budgets,
    addBudget,
    updateBudget,
    deleteBudget,
    payrollEmployees,
    payslips,
    addPayrollEmployee,
    updatePayrollEmployee,
    generatePayslip,
    expenseClaims,
    addExpenseClaim,
    updateExpenseClaim,
    fixedAssets,
    addFixedAsset,
    updateFixedAsset,
    bankReconciliations,
    addBankReconciliation,
    updateBankReconciliation,
    financialReports,
    generateReport
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
