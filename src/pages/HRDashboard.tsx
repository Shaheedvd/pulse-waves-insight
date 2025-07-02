
import React from "react";
import { DepartmentDashboard } from "@/components/dashboard/DepartmentDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HREmployeeManagement } from "@/components/hr/HREmployeeManagement";
import { HRRecruitment } from "@/components/hr/HRRecruitment";
import { HRPerformance } from "@/components/hr/HRPerformance";
import { HRLearningDevelopment } from "@/components/hr/HRLearningDevelopment";
import { HRCompensation } from "@/components/hr/HRCompensation";
import { HRReporting } from "@/components/hr/HRReporting";
import { HRTeamMeetings } from "@/components/hr/HRTeamMeetings";
import { HRPayroll } from "@/components/hr/payroll/HRPayroll";
import HRDashboard from "@/components/hr/HRDashboard";
import RecruitmentManagement from "@/components/hr/recruitment/RecruitmentManagement";
import EmployeeRecords from "@/components/hr/employees/EmployeeRecords";
import { useAuth } from "@/contexts/AuthContext";

const HRDashboardPage = () => {
  const { hasPermission } = useAuth();
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid grid-cols-10 mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          <TabsTrigger value="employees">Employee Records</TabsTrigger>
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
          <TabsTrigger value="attendance">Time & Attendance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="training">Training & Dev</TabsTrigger>
          <TabsTrigger value="disciplinary">Disciplinary</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <HRDashboard />
        </TabsContent>
        
        <TabsContent value="recruitment">
          <RecruitmentManagement />
        </TabsContent>
        
        <TabsContent value="employees">
          <EmployeeRecords />
        </TabsContent>
        
        <TabsContent value="leave">
          <div className="text-center py-8 text-muted-foreground">
            <p>Leave Management System</p>
            <p className="text-sm">Complete request-to-approval workflow with live balance tracking</p>
          </div>
        </TabsContent>
        
        <TabsContent value="attendance">
          <div className="text-center py-8 text-muted-foreground">
            <p>Time & Attendance System</p>
            <p className="text-sm">Clock in/out, timesheets, and attendance reports</p>
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <HRPerformance />
        </TabsContent>
        
        <TabsContent value="training">
          <HRLearningDevelopment />
        </TabsContent>
        
        <TabsContent value="disciplinary">
          <div className="text-center py-8 text-muted-foreground">
            <p>Disciplinary & Compliance Tracking</p>
            <p className="text-sm">Incident reporting and formal action logs</p>
          </div>
        </TabsContent>
        
        <TabsContent value="payroll">
          <HRPayroll />
        </TabsContent>
        
        <TabsContent value="analytics">
          <HRReporting />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRDashboardPage;
