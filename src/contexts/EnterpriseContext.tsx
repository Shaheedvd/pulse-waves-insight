
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
  
  // Marketing
  campaigns: Types.MarketingCampaign[];
  marketingActions: Types.MarketingAction[];
  addCampaign: (campaign: Omit<Types.MarketingCampaign, keyof Types.BaseEntity>) => void;
  updateCampaign: (id: string, updates: Partial<Types.MarketingCampaign>) => void;
  deleteCampaign: (id: string) => void;
  
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
  
  // Support
  tickets: Types.SupportTicket[];
  addTicket: (ticket: Omit<Types.SupportTicket, keyof Types.BaseEntity>) => void;
  updateTicket: (id: string, updates: Partial<Types.SupportTicket>) => void;
  deleteTicket: (id: string) => void;
  
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
  
  // State for all modules
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

  // Helper function to create base entity fields
  const createBaseEntity = (): Types.BaseEntity => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: currentUser?.id || "system",
    updatedBy: currentUser?.id || "system",
  });

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

  // Initialize with sample data
  useEffect(() => {
    if (kpiTargets.length === 0) {
      // Initialize sample data for demonstration
      console.log("Initializing enterprise data...");
    }
  }, []);

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
    
    // Marketing
    campaigns,
    marketingActions,
    addCampaign: campaignCRUD.add,
    updateCampaign: campaignCRUD.update,
    deleteCampaign: campaignCRUD.delete,
    
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
    
    // Support
    tickets,
    addTicket: ticketCRUD.add,
    updateTicket: ticketCRUD.update,
    deleteTicket: ticketCRUD.delete,
    
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
