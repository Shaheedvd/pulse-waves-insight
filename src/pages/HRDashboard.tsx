
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
import { useAuth } from "@/contexts/AuthContext";

const HRDashboard = () => {
  const { hasPermission } = useAuth();
  
  return (
    <div className="space-y-6">
      <DepartmentDashboard 
        department="hr"
        title="HR Department Dashboard"
        description="Comprehensive human resource management system with employee data, recruitment, performance management, learning & development, and reporting tools."
      />
      
      <Tabs defaultValue="employees" className="w-full mt-6">
        <TabsList className="grid grid-cols-8 mb-4">
          <TabsTrigger value="employees">Employee Data</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="learning">Learning & Dev</TabsTrigger>
          <TabsTrigger value="compensation">Compensation</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="reporting">Reporting</TabsTrigger>
          <TabsTrigger value="meetings">Team Meetings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="employees">
          <HREmployeeManagement />
        </TabsContent>
        
        <TabsContent value="recruitment">
          <HRRecruitment />
        </TabsContent>
        
        <TabsContent value="performance">
          <HRPerformance />
        </TabsContent>
        
        <TabsContent value="learning">
          <HRLearningDevelopment />
        </TabsContent>
        
        <TabsContent value="compensation">
          <HRCompensation />
        </TabsContent>
        
        <TabsContent value="payroll">
          <HRPayroll />
        </TabsContent>
        
        <TabsContent value="reporting">
          <HRReporting />
        </TabsContent>
        
        <TabsContent value="meetings">
          <HRTeamMeetings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRDashboard;
