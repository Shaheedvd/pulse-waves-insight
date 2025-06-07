import React, { createContext, useContext, useState, useEffect } from "react";
import { useGlobal } from "./GlobalContext";
import { useAuth } from "./AuthContext";
import * as Types from "@/types/enterprise";

interface EnterpriseContextType {
  // KPI System
  kpiTargets: Types.KPITarget[];
  addKPITarget: (target: Omit<Types.KPITarget, keyof Types.BaseEntity>) => void;
  updateKPITarget: (id: string, updates: Partial<Types.KPITarget>) => void;
  deleteKPITarget: (id: string) => void;
  
  // Evaluations
  evaluations: Types.Evaluation[];
  addEvaluation: (evaluation: Omit<Types.Evaluation, keyof Types.BaseEntity>) => void;
  updateEvaluation: (id: string, updates: Partial<Types.Evaluation>) => void;
  deleteEvaluation: (id: string) => void;
  
  // Templates
  templates: Types.EvaluationTemplate[];
  addTemplate: (template: Omit<Types.EvaluationTemplate, keyof Types.BaseEntity>) => void;
  updateTemplate: (id: string, updates: Partial<Types.EvaluationTemplate>) => void;
  deleteTemplate: (id: string) => void;
  
  // Financial Reports
  financialReports: Types.FinancialReport[];
  addFinancialReport: (report: Omit<Types.FinancialReport, keyof Types.BaseEntity>) => void;
  updateFinancialReport: (id: string, updates: Partial<Types.FinancialReport>) => void;
  deleteFinancialReport: (id: string) => void;
  
  // Budgets
  budgets: Types.Budget[];
  addBudget: (budget: Omit<Types.Budget, keyof Types.BaseEntity>) => void;
  updateBudget: (id: string, updates: Partial<Types.Budget>) => void;
  deleteBudget: (id: string) => void;
  
  // Employees & Payroll
  employees: Types.Employee[];
  payslips: Types.Payslip[];
  addEmployee: (employee: Omit<Types.Employee, keyof Types.BaseEntity>) => void;
  updateEmployee: (id: string, updates: Partial<Types.Employee>) => void;
  deleteEmployee: (id: string) => void;
  addPayslip: (payslip: Omit<Types.Payslip, keyof Types.BaseEntity>) => void;
  
  // Marketing - Fixed property names
  marketingCampaigns: Types.MarketingCampaign[];
  campaigns: Types.MarketingCampaign[];
  marketingActions: Types.MarketingAction[];
  addMarketingCampaign: (campaign: Omit<Types.MarketingCampaign, keyof Types.BaseEntity>) => void;
  updateMarketingCampaign: (id: string, updates: Partial<Types.MarketingCampaign>) => void;
  deleteMarketingCampaign: (id: string) => void;
  addCampaign: (campaign: Omit<Types.MarketingCampaign, keyof Types.BaseEntity>) => void;
  updateCampaign: (id: string, updates: Partial<Types.MarketingCampaign>) => void;
  deleteCampaign: (id: string) => void;
  addMarketingAction: (action: Omit<Types.MarketingAction, keyof Types.BaseEntity>) => void;
  updateMarketingAction: (id: string, updates: Partial<Types.MarketingAction>) => void;
  deleteMarketingAction: (id: string) => void;
  
  // Sales
  deals: Types.Deal[];
  addDeal: (deal: Omit<Types.Deal, keyof Types.BaseEntity>) => void;
  updateDeal: (id: string, updates: Partial<Types.Deal>) => void;
  deleteDeal: (id: string) => void;
  
  // Legal
  contracts: Types.Contract[];
  addContract: (contract: Omit<Types.Contract, keyof Types.BaseEntity>) => void;
  updateContract: (id: string, updates: Partial<Types.Contract>) => void;
  deleteContract: (id: string) => void;
  
  // Support - Fixed property names
  tickets: Types.SupportTicket[];
  supportTickets: Types.SupportTicket[];
  addTicket: (ticket: Omit<Types.SupportTicket, keyof Types.BaseEntity>) => void;
  updateTicket: (id: string, updates: Partial<Types.SupportTicket>) => void;
  deleteTicket: (id: string) => void;
  addSupportTicket: (ticket: Omit<Types.SupportTicket, keyof Types.BaseEntity>) => void;
  updateSupportTicket: (id: string, updates: Partial<Types.SupportTicket>) => void;
  deleteSupportTicket: (id: string) => void;
  
  // Product
  products: Types.Product[];
  addProduct: (product: Omit<Types.Product, keyof Types.BaseEntity>) => void;
  updateProduct: (id: string, updates: Partial<Types.Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Users
  users: Types.User[];
  addUser: (user: Omit<Types.User, keyof Types.BaseEntity>) => void;
  updateUser: (id: string, updates: Partial<Types.User>) => void;
  deleteUser: (id: string) => void;
  
  // IT
  itSystems: Types.ITSystem[];
  itIncidents: Types.ITIncident[];
  addITSystem: (system: Omit<Types.ITSystem, keyof Types.BaseEntity>) => void;
  updateITSystem: (id: string, updates: Partial<Types.ITSystem>) => void;
  addITIncident: (incident: Omit<Types.ITIncident, keyof Types.BaseEntity>) => void;
  updateITIncident: (id: string, updates: Partial<Types.ITIncident>) => void;
  
  // Facilities
  facilities: Types.Facility[];
  addFacility: (facility: Omit<Types.Facility, keyof Types.BaseEntity>) => void;
  updateFacility: (id: string, updates: Partial<Types.Facility>) => void;
  deleteFacility: (id: string) => void;
  
  // Real-time data updates
  refreshData: () => void;
}

const EnterpriseContext = createContext<EnterpriseContextType | undefined>(undefined);

export const EnterpriseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logAction, addNotification } = useGlobal();
  const { currentUser } = useAuth();
  
  // State for all modules - Initialize with empty arrays to prevent undefined errors
  const [kpiTargets, setKpiTargets] = useState<Types.KPITarget[]>([]);
  const [evaluations, setEvaluations] = useState<Types.Evaluation[]>([]);
  const [templates, setTemplates] = useState<Types.EvaluationTemplate[]>([]);
  const [financialReports, setFinancialReports] = useState<Types.FinancialReport[]>([]);
  const [budgets, setBudgets] = useState<Types.Budget[]>([]);
  const [employees, setEmployees] = useState<Types.Employee[]>([]);
  const [payslips, setPayslips] = useState<Types.Payslip[]>([]);
  const [campaigns, setCampaigns] = useState<Types.MarketingCampaign[]>([]);
  const [marketingActions, setMarketingActions] = useState<Types.MarketingAction[]>([]);
  const [deals, setDeals] = useState<Types.Deal[]>([]);
  const [contracts, setContracts] = useState<Types.Contract[]>([]);
  const [tickets, setTickets] = useState<Types.SupportTicket[]>([]);
  const [products, setProducts] = useState<Types.Product[]>([]);
  const [users, setUsers] = useState<Types.User[]>([]);
  const [itSystems, setItSystems] = useState<Types.ITSystem[]>([]);
  const [itIncidents, setItIncidents] = useState<Types.ITIncident[]>([]);
  const [facilities, setFacilities] = useState<Types.Facility[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Helper function to create base entity fields
  const createBaseEntity = (): Types.BaseEntity => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: currentUser?.id || "system",
    updatedBy: currentUser?.id || "system",
  });

  // Mock data initialization
  const initializeMockData = () => {
    // 1. Admin KPI System Mock Data
    const mockKPITargets: Types.KPITarget[] = [
      {
        ...createBaseEntity(),
        id: "kpi-1",
        name: "Monthly Revenue Growth",
        description: "Track monthly revenue increase compared to previous month",
        department: "Sales",
        owner: "John Smith",
        period: "monthly",
        targetValue: 15,
        actualValue: 18,
        unit: "%",
        status: "exceeding",
        progress: 120
      },
      {
        ...createBaseEntity(),
        id: "kpi-2",
        name: "Customer Satisfaction Score",
        description: "Average customer satisfaction rating from evaluations",
        department: "Operations",
        owner: "Sarah Johnson",
        period: "monthly",
        targetValue: 4.5,
        actualValue: 4.2,
        unit: "/5",
        status: "at-risk",
        progress: 93
      },
      {
        ...createBaseEntity(),
        id: "kpi-3",
        name: "Employee Retention Rate",
        description: "Percentage of employees retained over the quarter",
        department: "HR",
        owner: "Mike Wilson",
        period: "quarterly",
        targetValue: 95,
        actualValue: 88,
        unit: "%",
        status: "behind",
        progress: 93
      },
      {
        ...createBaseEntity(),
        id: "kpi-4",
        name: "Marketing ROI",
        description: "Return on investment for marketing campaigns",
        department: "Marketing",
        owner: "Lisa Chen",
        period: "quarterly",
        targetValue: 300,
        actualValue: 350,
        unit: "%",
        status: "exceeding",
        progress: 117
      },
      {
        ...createBaseEntity(),
        id: "kpi-5",
        name: "IT System Uptime",
        description: "Percentage of time systems are operational",
        department: "IT",
        owner: "David Brown",
        period: "monthly",
        targetValue: 99.9,
        actualValue: 99.5,
        unit: "%",
        status: "at-risk",
        progress: 99.6
      }
    ];

    // 2. Evaluations System Mock Data
    const mockEvaluations: Types.Evaluation[] = [
      {
        ...createBaseEntity(),
        id: "eval-1",
        clientId: "client-1",
        clientName: "Downtown Coffee Shop",
        location: "123 Main St, Downtown",
        auditorId: "auditor-1",
        auditorName: "Jane Evaluator",
        templateId: "template-1",
        templateName: "Retail Service Excellence",
        scheduledDate: "2024-01-15T10:00:00Z",
        completedDate: "2024-01-15T11:30:00Z",
        status: "completed",
        overallScore: 85,
        categories: [
          {
            id: "cat-1",
            name: "Customer Service",
            score: 90,
            weight: 40,
            maxScore: 100,
            questions: []
          },
          {
            id: "cat-2",
            name: "Cleanliness",
            score: 80,
            weight: 30,
            maxScore: 100,
            questions: []
          }
        ],
        notes: "Excellent customer interaction, minor cleanliness issues in restroom",
        evidence: ["photo1.jpg", "photo2.jpg"]
      },
      {
        ...createBaseEntity(),
        id: "eval-2",
        clientId: "client-2",
        clientName: "Tech Startup Office",
        location: "456 Innovation Ave",
        auditorId: "auditor-2",
        auditorName: "Bob Inspector",
        templateId: "template-2",
        templateName: "Office Environment Assessment",
        scheduledDate: "2024-01-20T14:00:00Z",
        status: "scheduled",
        overallScore: 0,
        categories: [],
        notes: "",
        evidence: []
      }
    ];

    // 3. CX Evaluation Builder Templates
    const mockTemplates: Types.EvaluationTemplate[] = [
      {
        ...createBaseEntity(),
        id: "template-1",
        name: "Retail Service Excellence",
        description: "Comprehensive retail customer experience evaluation",
        version: "1.2",
        isActive: true,
        categories: [
          {
            id: "cat-1",
            name: "Customer Service",
            weight: 40,
            questions: [
              {
                id: "q-1",
                text: "Staff greeting quality",
                type: "rating",
                maxScore: 10,
                weight: 1,
                required: true
              }
            ]
          }
        ],
        totalPossibleScore: 100
      }
    ];

    // 4. Financial Reports Mock Data
    const mockFinancialReports: Types.FinancialReport[] = [
      {
        ...createBaseEntity(),
        id: "report-1",
        name: "Q1 2024 Financial Summary",
        type: "quarterly",
        period: "Q1 2024",
        department: "Finance",
        status: "published",
        metrics: [
          {
            id: "metric-1",
            category: "Revenue",
            name: "Total Sales",
            value: 250000,
            variance: 15000,
            previousPeriod: 235000
          }
        ],
        totalRevenue: 250000,
        totalExpenses: 180000,
        netProfit: 70000
      }
    ];

    // 5. Finance Analytics - Budgets
    const mockBudgets: Types.Budget[] = [
      {
        ...createBaseEntity(),
        id: "budget-1",
        department: "Marketing",
        category: "Digital Advertising",
        period: "2024-01",
        budgetAmount: 50000,
        actualAmount: 45000,
        variance: -5000,
        variancePercent: -10,
        status: "under-budget"
      },
      {
        ...createBaseEntity(),
        id: "budget-2",
        department: "HR",
        category: "Recruitment",
        period: "2024-01",
        budgetAmount: 25000,
        actualAmount: 28000,
        variance: 3000,
        variancePercent: 12,
        status: "over-budget"
      }
    ];

    // 6. Payroll Management
    const mockEmployees: Types.Employee[] = [
      {
        ...createBaseEntity(),
        id: "emp-1",
        employeeId: "EMP001",
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@company.com",
        department: "Sales",
        role: "Sales Manager",
        salary: 75000,
        payFrequency: "monthly",
        benefits: [
          { id: "ben-1", type: "Health Insurance", amount: 500, isPercentage: false },
          { id: "ben-2", type: "401k Match", amount: 5, isPercentage: true }
        ],
        deductions: [
          { id: "ded-1", type: "Federal Tax", amount: 22, isPercentage: true }
        ]
      }
    ];

    const mockPayslips: Types.Payslip[] = [
      {
        ...createBaseEntity(),
        id: "payslip-1",
        employeeId: "emp-1",
        payPeriod: "2024-01",
        grossPay: 6250,
        netPay: 4500,
        deductions: [
          { type: "Federal Tax", amount: 1375 },
          { type: "State Tax", amount: 250 }
        ],
        benefits: [
          { type: "Health Insurance", amount: 500 }
        ],
        taxes: [
          { type: "Federal", amount: 1375, rate: 22 }
        ],
        status: "paid"
      }
    ];

    // 7. Marketing Dashboard - Campaigns
    const mockCampaigns: Types.MarketingCampaign[] = [
      {
        ...createBaseEntity(),
        id: "campaign-1",
        name: "Spring Product Launch",
        type: "email",
        channel: "Email Marketing",
        status: "active",
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        budget: 15000,
        spent: 8500,
        reach: 50000,
        impressions: 125000,
        clicks: 2500,
        leads: 150,
        conversions: 45,
        roi: 320,
        targetAudience: "Existing customers, 25-45 age group"
      },
      {
        ...createBaseEntity(),
        id: "campaign-2",
        name: "Social Media Awareness",
        type: "social",
        channel: "Facebook & Instagram",
        status: "completed",
        startDate: "2023-12-01",
        endDate: "2024-01-15",
        budget: 8000,
        spent: 7800,
        reach: 75000,
        impressions: 200000,
        clicks: 3200,
        leads: 85,
        conversions: 22,
        roi: 275,
        targetAudience: "New prospects, 18-35 age group"
      }
    ];

    // 8. Marketing Actions
    const mockMarketingActions: Types.MarketingAction[] = [
      {
        ...createBaseEntity(),
        id: "action-1",
        campaignId: "campaign-1",
        name: "A/B Test Email Subject Lines",
        type: "optimization",
        status: "completed",
        assignee: "Lisa Chen",
        dueDate: "2024-01-15",
        priority: "high",
        results: [
          { metric: "Open Rate", value: 25, target: 20, achieved: true },
          { metric: "Click Rate", value: 5, target: 3, achieved: true }
        ]
      }
    ];

    // 9. Sales Dashboard - Deals
    const mockDeals: Types.Deal[] = [
      {
        ...createBaseEntity(),
        id: "deal-1",
        name: "Enterprise Software License",
        clientName: "TechCorp Inc",
        product: "CX Management Suite",
        value: 50000,
        stage: "negotiation",
        probability: 75,
        expectedCloseDate: "2024-02-15",
        assignedTo: "John Smith",
        source: "website",
        notes: "Price negotiation in progress, very interested in premium features"
      },
      {
        ...createBaseEntity(),
        id: "deal-2",
        name: "Consulting Services",
        clientName: "RetailChain Ltd",
        product: "CX Consulting",
        value: 25000,
        stage: "proposal",
        probability: 60,
        expectedCloseDate: "2024-02-28",
        assignedTo: "Sarah Johnson",
        source: "referral",
        notes: "Proposal submitted, waiting for decision"
      }
    ];

    // 10. Legal Dashboard - Contracts
    const mockContracts: Types.Contract[] = [
      {
        ...createBaseEntity(),
        id: "contract-1",
        name: "TechCorp Service Agreement",
        type: "service",
        clientName: "TechCorp Inc",
        startDate: "2024-01-01",
        endDate: "2025-01-01",
        value: 100000,
        status: "active",
        riskLevel: "low",
        documents: [
          { id: "doc-1", name: "Main Agreement", type: "pdf", url: "/docs/contract1.pdf", uploadedAt: "2024-01-01" }
        ],
        reminders: [
          { id: "rem-1", type: "renewal", date: "2024-10-01", sent: false }
        ]
      }
    ];

    // 11. Support Dashboard - Tickets
    const mockTickets: Types.SupportTicket[] = [
      {
        ...createBaseEntity(),
        id: "ticket-1",
        ticketNumber: "SUP-2024-001",
        title: "Login Issues with Mobile App",
        description: "User cannot login to mobile application, getting error message",
        priority: "high",
        status: "in-progress",
        source: "email",
        category: "technical",
        assignee: "David Brown",
        requester: "customer@example.com",
        resolutionTime: undefined,
        escalated: false
      },
      {
        ...createBaseEntity(),
        id: "ticket-2",
        ticketNumber: "SUP-2024-002",
        title: "Billing Discrepancy",
        description: "Customer questioning charges on latest invoice",
        priority: "medium",
        status: "open",
        source: "phone",
        category: "billing",
        assignee: "Finance Team",
        requester: "client@company.com",
        escalated: false
      }
    ];

    // 12. Product Dashboard
    const mockProducts: Types.Product[] = [
      {
        ...createBaseEntity(),
        id: "product-1",
        name: "CX Management Suite",
        description: "Comprehensive customer experience management platform",
        version: "2.1.0",
        status: "released",
        owner: "Product Team",
        features: [
          {
            id: "feature-1",
            name: "Real-time Analytics",
            description: "Live dashboard with customer metrics",
            status: "completed",
            priority: "high",
            assignee: "Dev Team A",
            estimatedHours: 120,
            actualHours: 135
          }
        ],
        releaseDate: "2024-01-15",
        feedback: [
          {
            id: "feedback-1",
            source: "customer",
            type: "feature-request",
            description: "Add mobile push notifications",
            priority: "medium",
            status: "planned"
          }
        ]
      }
    ];

    // 13. User Management
    const mockUsers: Types.User[] = [
      {
        ...createBaseEntity(),
        id: "user-1",
        username: "jsmith",
        email: "john.smith@company.com",
        firstName: "John",
        lastName: "Smith",
        role: "manager",
        department: "Sales",
        accessLevel: "advanced",
        isActive: true,
        lastLogin: "2024-01-15T09:30:00Z",
        permissions: [
          { module: "sales", actions: ["create", "read", "update", "delete"] },
          { module: "reports", actions: ["read"] }
        ]
      }
    ];

    // 14. IT Dashboard
    const mockITSystems: Types.ITSystem[] = [
      {
        ...createBaseEntity(),
        id: "system-1",
        name: "CRM Database",
        type: "database",
        status: "operational",
        uptime: 99.8,
        lastIncident: "2024-01-10",
        version: "5.2.1",
        maintainer: "David Brown"
      },
      {
        ...createBaseEntity(),
        id: "system-2",
        name: "Web Application",
        type: "application",
        status: "degraded",
        uptime: 97.5,
        lastIncident: "2024-01-14",
        version: "3.1.5",
        maintainer: "IT Team"
      }
    ];

    const mockITIncidents: Types.ITIncident[] = [
      {
        ...createBaseEntity(),
        id: "incident-1",
        title: "Database Connection Timeout",
        description: "Users experiencing slow response times when accessing customer data",
        severity: "medium",
        status: "investigating",
        systemId: "system-1",
        assignee: "David Brown",
        reportedBy: "Sarah Johnson",
        affectedUsers: 25
      }
    ];

    // 15. Facilities Dashboard
    const mockFacilities: Types.Facility[] = [
      {
        ...createBaseEntity(),
        id: "facility-1",
        name: "Main Office",
        type: "office",
        address: "123 Business St, City, State",
        manager: "Mike Wilson",
        capacity: 150,
        currentOccupancy: 128,
        assets: [
          {
            ...createBaseEntity(),
            id: "asset-1",
            name: "Conference Room Projector",
            type: "equipment",
            serialNumber: "PROJ-001",
            purchaseDate: "2023-06-15",
            warranty: "2025-06-15",
            condition: "good",
            maintenanceSchedule: [
              {
                id: "maint-1",
                date: "2024-01-15",
                type: "routine",
                description: "Cleaned lens and checked connections",
                cost: 50,
                performedBy: "Maintenance Team"
              }
            ]
          }
        ],
        issues: [
          {
            ...createBaseEntity(),
            id: "issue-1",
            title: "HVAC System Noise",
            description: "Loud noise coming from air conditioning unit on 3rd floor",
            priority: "medium",
            status: "assigned",
            category: "maintenance",
            assignee: "Facilities Team",
            estimatedCost: 500
          }
        ]
      }
    ];

    // Set all mock data
    setKpiTargets(mockKPITargets);
    setEvaluations(mockEvaluations);
    setTemplates(mockTemplates);
    setFinancialReports(mockFinancialReports);
    setBudgets(mockBudgets);
    setEmployees(mockEmployees);
    setPayslips(mockPayslips);
    setCampaigns(mockCampaigns);
    setMarketingActions(mockMarketingActions);
    setDeals(mockDeals);
    setContracts(mockContracts);
    setTickets(mockTickets);
    setProducts(mockProducts);
    setUsers(mockUsers);
    setItSystems(mockITSystems);
    setItIncidents(mockITIncidents);
    setFacilities(mockFacilities);

    console.log("✅ All enterprise mock data initialized successfully");
  };

  // Generic CRUD functions
  const createCRUDFunctions = <T extends Types.BaseEntity>(
    items: T[],
    setItems: React.Dispatch<React.SetStateAction<T[]>>,
    entityType: string,
    module: string
  ) => ({
    add: (item: Omit<T, keyof Types.BaseEntity>) => {
      const newItem = { ...item, ...createBaseEntity() } as T;
      setItems(prev => [...prev, newItem]);
      logAction(`CREATE_${entityType.toUpperCase()}`, module, newItem.id, entityType, undefined, newItem);
      addNotification({
        userId: currentUser?.id || "",
        title: `${entityType} Created`,
        message: `New ${entityType} has been created successfully`,
        type: "success",
        module: module
      });
      return newItem;
    },
    
    update: (id: string, updates: Partial<T>) => {
      setItems(prev => prev.map(item => {
        if (item.id === id) {
          const updatedItem = { 
            ...item, 
            ...updates, 
            updatedAt: new Date().toISOString(),
            updatedBy: currentUser?.id || "system"
          };
          logAction(`UPDATE_${entityType.toUpperCase()}`, module, id, entityType, item, updatedItem);
          return updatedItem;
        }
        return item;
      }));
    },
    
    delete: (id: string) => {
      const item = items.find(i => i.id === id);
      setItems(prev => prev.filter(item => item.id !== id));
      logAction(`DELETE_${entityType.toUpperCase()}`, module, id, entityType, item, undefined);
      addNotification({
        userId: currentUser?.id || "",
        title: `${entityType} Deleted`,
        message: `${entityType} has been deleted successfully`,
        type: "success",
        module: module
      });
    }
  });

  // KPI functions
  const kpiCRUD = createCRUDFunctions(kpiTargets, setKpiTargets, "kpi", "analytics");
  const evaluationCRUD = createCRUDFunctions(evaluations, setEvaluations, "evaluation", "evaluations");
  const templateCRUD = createCRUDFunctions(templates, setTemplates, "template", "evaluations");
  const reportCRUD = createCRUDFunctions(financialReports, setFinancialReports, "report", "finance");
  const budgetCRUD = createCRUDFunctions(budgets, setBudgets, "budget", "finance");
  const employeeCRUD = createCRUDFunctions(employees, setEmployees, "employee", "hr");
  const campaignCRUD = createCRUDFunctions(campaigns, setCampaigns, "campaign", "marketing");
  const marketingActionCRUD = createCRUDFunctions(marketingActions, setMarketingActions, "action", "marketing");
  const dealCRUD = createCRUDFunctions(deals, setDeals, "deal", "sales");
  const contractCRUD = createCRUDFunctions(contracts, setContracts, "contract", "legal");
  const ticketCRUD = createCRUDFunctions(tickets, setTickets, "ticket", "support");
  const productCRUD = createCRUDFunctions(products, setProducts, "product", "product");
  const userCRUD = createCRUDFunctions(users, setUsers, "user", "system");
  const systemCRUD = createCRUDFunctions(itSystems, setItSystems, "system", "it");
  const incidentCRUD = createCRUDFunctions(itIncidents, setItIncidents, "incident", "it");
  const facilityCRUD = createCRUDFunctions(facilities, setFacilities, "facility", "facilities");

  // Special functions for complex entities
  const addPayslip = (payslip: Omit<Types.Payslip, keyof Types.BaseEntity>) => {
    const newPayslip = { ...payslip, ...createBaseEntity() } as Types.Payslip;
    setPayslips(prev => [...prev, newPayslip]);
    logAction("CREATE_PAYSLIP", "hr", newPayslip.id, "payslip", undefined, newPayslip);
  };

  const addITIncident = (incident: Omit<Types.ITIncident, keyof Types.BaseEntity>) => {
    const newIncident = { ...incident, ...createBaseEntity() } as Types.ITIncident;
    setItIncidents(prev => [...prev, newIncident]);
    logAction("CREATE_INCIDENT", "it", newIncident.id, "incident", undefined, newIncident);
    
    // Auto-notify for high/critical incidents
    if (incident.severity === 'high' || incident.severity === 'critical') {
      addNotification({
        userId: currentUser?.id || "",
        title: `${incident.severity.toUpperCase()} IT Incident`,
        message: `New ${incident.severity} incident: ${incident.title}`,
        type: "error",
        module: "it"
      });
    }
  };

  const updateITIncident = (id: string, updates: Partial<Types.ITIncident>) => {
    setItIncidents(prev => prev.map(incident => {
      if (incident.id === id) {
        const updatedIncident = { 
          ...incident, 
          ...updates, 
          updatedAt: new Date().toISOString(),
          updatedBy: currentUser?.id || "system"
        };
        logAction("UPDATE_INCIDENT", "it", id, "incident", incident, updatedIncident);
        return updatedIncident;
      }
      return incident;
    }));
  };

  const refreshData = () => {
    // Simulate real-time data refresh
    console.log("Refreshing enterprise data...");
    logAction("REFRESH_DATA", "system", undefined, "data_refresh");
  };

  // Initialize with mock data only once
  useEffect(() => {
    if (!isInitialized) {
      initializeMockData();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const value: EnterpriseContextType = {
    // KPI System
    kpiTargets,
    addKPITarget: kpiCRUD.add,
    updateKPITarget: kpiCRUD.update,
    deleteKPITarget: kpiCRUD.delete,
    
    // Evaluations
    evaluations,
    addEvaluation: evaluationCRUD.add,
    updateEvaluation: evaluationCRUD.update,
    deleteEvaluation: evaluationCRUD.delete,
    
    // Templates
    templates,
    addTemplate: templateCRUD.add,
    updateTemplate: templateCRUD.update,
    deleteTemplate: templateCRUD.delete,
    
    // Financial Reports
    financialReports,
    addFinancialReport: reportCRUD.add,
    updateFinancialReport: reportCRUD.update,
    deleteFinancialReport: reportCRUD.delete,
    
    // Budgets
    budgets,
    addBudget: budgetCRUD.add,
    updateBudget: budgetCRUD.update,
    deleteBudget: budgetCRUD.delete,
    
    // Employees & Payroll
    employees,
    payslips,
    addEmployee: employeeCRUD.add,
    updateEmployee: employeeCRUD.update,
    deleteEmployee: employeeCRUD.delete,
    addPayslip,
    
    // Marketing - Both property names for compatibility
    campaigns,
    marketingCampaigns: campaigns,
    marketingActions,
    addCampaign: campaignCRUD.add,
    updateCampaign: campaignCRUD.update,
    deleteCampaign: campaignCRUD.delete,
    addMarketingCampaign: campaignCRUD.add,
    updateMarketingCampaign: campaignCRUD.update,
    deleteMarketingCampaign: campaignCRUD.delete,
    addMarketingAction: marketingActionCRUD.add,
    updateMarketingAction: marketingActionCRUD.update,
    deleteMarketingAction: marketingActionCRUD.delete,
    
    // Sales
    deals,
    addDeal: dealCRUD.add,
    updateDeal: dealCRUD.update,
    deleteDeal: dealCRUD.delete,
    
    // Legal
    contracts,
    addContract: contractCRUD.add,
    updateContract: contractCRUD.update,
    deleteContract: contractCRUD.delete,
    
    // Support - Both property names for compatibility
    tickets,
    supportTickets: tickets,
    addTicket: ticketCRUD.add,
    updateTicket: ticketCRUD.update,
    deleteTicket: ticketCRUD.delete,
    addSupportTicket: ticketCRUD.add,
    updateSupportTicket: ticketCRUD.update,
    deleteSupportTicket: ticketCRUD.delete,
    
    // Product
    products,
    addProduct: productCRUD.add,
    updateProduct: productCRUD.update,
    deleteProduct: productCRUD.delete,
    
    // Users
    users,
    addUser: userCRUD.add,
    updateUser: userCRUD.update,
    deleteUser: userCRUD.delete,
    
    // IT
    itSystems,
    itIncidents,
    addITSystem: systemCRUD.add,
    updateITSystem: systemCRUD.update,
    addITIncident,
    updateITIncident,
    
    // Facilities
    facilities,
    addFacility: facilityCRUD.add,
    updateFacility: facilityCRUD.update,
    deleteFacility: facilityCRUD.delete,
    
    refreshData
  };

  return <EnterpriseContext.Provider value={value}>{children}</EnterpriseContext.Provider>;
};

export const useEnterprise = (): EnterpriseContextType => {
  const context = useContext(EnterpriseContext);
  if (context === undefined) {
    throw new Error("useEnterprise must be used within an EnterpriseProvider");
  }
  return context;
};
