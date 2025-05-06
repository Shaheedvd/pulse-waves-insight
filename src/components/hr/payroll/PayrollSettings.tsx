
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings, Check, AlertTriangle, Calendar, DollarSign, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample payroll settings data
const payPeriods = ["Monthly", "Bi-Weekly", "Weekly"];
const currencies = ["ZAR (R)", "USD ($)", "EUR (€)", "GBP (£)"];

export const PayrollSettings = () => {
  const [payPeriod, setPayPeriod] = useState("Monthly");
  const [currency, setCurrency] = useState("ZAR (R)");
  const [autoRunEnabled, setAutoRunEnabled] = useState(false);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [employeePortalEnabled, setEmployeePortalEnabled] = useState(true);
  const [taxYearStart, setTaxYearStart] = useState("March 1");
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your payroll settings have been updated successfully.",
      variant: "success",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="rules">Pay Rules</TabsTrigger>
          <TabsTrigger value="approvals">Approval Workflows</TabsTrigger>
          <TabsTrigger value="integration">System Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Configuration</CardTitle>
              <CardDescription>
                Configure the general settings for your payroll system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="payrollSystem">Payroll System Name</Label>
                    <Input
                      id="payrollSystem"
                      defaultValue="Primary Payroll System"
                      className="w-2/3"
                    />
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="payPeriod">Default Pay Period</Label>
                    <Select value={payPeriod} onValueChange={setPayPeriod}>
                      <SelectTrigger id="payPeriod" className="w-2/3">
                        <SelectValue placeholder="Select pay period" />
                      </SelectTrigger>
                      <SelectContent>
                        {payPeriods.map((period) => (
                          <SelectItem key={period} value={period}>{period}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger id="currency" className="w-2/3">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((curr) => (
                          <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="taxYearStart">Tax Year Start</Label>
                    <Select defaultValue={taxYearStart} onValueChange={setTaxYearStart}>
                      <SelectTrigger id="taxYearStart" className="w-2/3">
                        <SelectValue placeholder="Select tax year start" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="March 1">March 1 (South Africa)</SelectItem>
                        <SelectItem value="April 6">April 6 (UK)</SelectItem>
                        <SelectItem value="January 1">January 1 (Calendar Year)</SelectItem>
                        <SelectItem value="July 1">July 1 (Australia)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoRun">Auto-Run Payroll</Label>
                      <p className="text-sm text-muted-foreground">Automatically run payroll on schedule</p>
                    </div>
                    <Switch
                      id="autoRun"
                      checked={autoRunEnabled}
                      onCheckedChange={setAutoRunEnabled}
                    />
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send email notifications for payroll events</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={emailNotificationsEnabled}
                      onCheckedChange={setEmailNotificationsEnabled}
                    />
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="employeePortal">Employee Self-Service Portal</Label>
                      <p className="text-sm text-muted-foreground">Allow employees to view payslips and tax certificates</p>
                    </div>
                    <Switch
                      id="employeePortal"
                      checked={employeePortalEnabled}
                      onCheckedChange={setEmployeePortalEnabled}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button onClick={handleSaveSettings}>Save Settings</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payroll Schedule</CardTitle>
              <CardDescription>
                Configure the payroll processing schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="processDay">Processing Day</Label>
                    <Select defaultValue="25">
                      <SelectTrigger id="processDay">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 31}, (_, i) => i + 1).map((day) => (
                          <SelectItem key={day} value={day.toString()}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-1">Day of month when payroll is processed</p>
                  </div>
                  <div>
                    <Label htmlFor="paymentDay">Payment Day</Label>
                    <Select defaultValue="28">
                      <SelectTrigger id="paymentDay">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 31}, (_, i) => i + 1).map((day) => (
                          <SelectItem key={day} value={day.toString()}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-1">Day of month when employees are paid</p>
                  </div>
                </div>

                <div>
                  <Label>Payroll Cut-off Settings</Label>
                  <p className="text-sm text-muted-foreground mb-2">Days to freeze data before processing</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="cutoffTime" defaultChecked />
                      <Label htmlFor="cutoffTime">Enable Cut-off Time</Label>
                    </div>
                    <div>
                      <Input type="number" defaultValue="2" min="1" max="10" />
                      <p className="text-xs text-muted-foreground mt-1">Days before processing</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button onClick={handleSaveSettings}>Save Schedule</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pay Rules Configuration</CardTitle>
              <CardDescription>
                Configure the rules that govern payroll calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Overtime Rules</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="otRate1">Standard Overtime Rate</Label>
                        <div className="flex items-center mt-1">
                          <Input id="otRate1" type="number" defaultValue="1.5" step="0.1" min="1" max="3" />
                          <span className="ml-2">× normal rate</span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="otRate2">Sunday Overtime Rate</Label>
                        <div className="flex items-center mt-1">
                          <Input id="otRate2" type="number" defaultValue="2.0" step="0.1" min="1" max="3" />
                          <span className="ml-2">× normal rate</span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="otRate3">Public Holiday Rate</Label>
                        <div className="flex items-center mt-1">
                          <Input id="otRate3" type="number" defaultValue="2.0" step="0.1" min="1" max="3" />
                          <span className="ml-2">× normal rate</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="otThreshold" defaultChecked />
                      <div>
                        <Label htmlFor="otThreshold">Apply overtime after</Label>
                        <div className="flex items-center">
                          <Input id="otThresholdValue" className="w-20" type="number" defaultValue="40" min="1" max="60" />
                          <span className="ml-2">hours per week</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Leave Pay Rules</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="annualLeaveAccrual">Annual Leave Accrual</Label>
                        <div className="flex items-center mt-1">
                          <Input id="annualLeaveAccrual" type="number" defaultValue="1.5" step="0.1" min="0" max="3" />
                          <span className="ml-2">days per month</span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="sickLeaveAccrual">Sick Leave Accrual</Label>
                        <div className="flex items-center mt-1">
                          <Input id="sickLeaveAccrual" type="number" defaultValue="1.0" step="0.1" min="0" max="3" />
                          <span className="ml-2">days per month</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="leavePayoutEnabled" defaultChecked />
                      <Label htmlFor="leavePayoutEnabled">Enable leave payout on termination</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Deduction Rules</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="taxDeductionsEnabled" defaultChecked />
                      <Label htmlFor="taxDeductionsEnabled">Enable automatic tax deductions (PAYE)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="uifDeductionsEnabled" defaultChecked />
                      <Label htmlFor="uifDeductionsEnabled">Enable UIF contributions (1% employee, 1% employer)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sdlDeductionsEnabled" defaultChecked />
                      <Label htmlFor="sdlDeductionsEnabled">Enable SDL (Skills Development Levy)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="medicalAidEnabled" defaultChecked />
                      <Label htmlFor="medicalAidEnabled">Enable medical aid deductions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="pensionFundEnabled" defaultChecked />
                      <Label htmlFor="pensionFundEnabled">Enable pension fund deductions</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button onClick={handleSaveSettings}>Save Pay Rules</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approval Workflows</CardTitle>
              <CardDescription>
                Configure the approval workflows for payroll processes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Payroll Processing Approvals</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="payrollApproval" defaultChecked />
                      <Label htmlFor="payrollApproval">Require approval before finalizing payroll</Label>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="approverRole">Approver Role</Label>
                        <Select defaultValue="finance_manager">
                          <SelectTrigger id="approverRole">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="finance_manager">Finance Manager</SelectItem>
                            <SelectItem value="hr_manager">HR Manager</SelectItem>
                            <SelectItem value="cfo">CFO</SelectItem>
                            <SelectItem value="ceo">CEO</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="approvalThreshold">Approval Threshold</Label>
                        <div className="flex items-center mt-1">
                          <Input id="approvalThreshold" type="number" defaultValue="500000" min="0" />
                          <span className="ml-2">ZAR</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Payrolls above this amount require additional approval</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Change Approval Workflows</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="salaryChangeApproval" defaultChecked />
                      <Label htmlFor="salaryChangeApproval">Require approval for salary changes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="bankDetailsApproval" defaultChecked />
                      <Label htmlFor="bankDetailsApproval">Require approval for bank detail changes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="deductionChangeApproval" defaultChecked />
                      <Label htmlFor="deductionChangeApproval">Require approval for deduction changes</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Notification Settings</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="approvalRequestNotification" defaultChecked />
                      <Label htmlFor="approvalRequestNotification">Send email notifications for approval requests</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="approvalCompletedNotification" defaultChecked />
                      <Label htmlFor="approvalCompletedNotification">Send email notifications when approval is completed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="reminderNotification" defaultChecked />
                      <Label htmlFor="reminderNotification">Send reminder notifications for pending approvals</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button onClick={handleSaveSettings}>Save Approval Workflows</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Integration</CardTitle>
              <CardDescription>
                Configure integrations with other systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Time & Attendance Integration</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="timeAttendanceIntegration" defaultChecked />
                      <Label htmlFor="timeAttendanceIntegration">Enable Time & Attendance integration</Label>
                    </div>
                    
                    <div>
                      <Label htmlFor="timeDataSource">Time Data Source</Label>
                      <Select defaultValue="internal">
                        <SelectTrigger id="timeDataSource">
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="internal">Internal Time Management</SelectItem>
                          <SelectItem value="biometric">Biometric System</SelectItem>
                          <SelectItem value="external_api">External API</SelectItem>
                          <SelectItem value="manual">Manual Data Entry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="overtimeAutoCalculation" defaultChecked />
                      <Label htmlFor="overtimeAutoCalculation">Automatically calculate overtime from time data</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Leave Management Integration</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="leaveIntegration" defaultChecked />
                      <Label htmlFor="leaveIntegration">Enable Leave Management integration</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="leavePayCalculation" defaultChecked />
                      <Label htmlFor="leavePayCalculation">Automatically calculate leave pay in payroll</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Banking Integration</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="bankingIntegration" defaultChecked />
                      <Label htmlFor="bankingIntegration">Enable Banking integration for payments</Label>
                    </div>
                    
                    <div>
                      <Label htmlFor="bankingFormat">Banking File Format</Label>
                      <Select defaultValue="eft">
                        <SelectTrigger id="bankingFormat">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eft">South African EFT Format</SelectItem>
                          <SelectItem value="csv">Standard CSV</SelectItem>
                          <SelectItem value="xml">XML Format</SelectItem>
                          <SelectItem value="bank_specific">Bank-Specific Format</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">SARS Integration</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="sarsIntegration" defaultChecked />
                      <Label htmlFor="sarsIntegration">Enable SARS e-Filing integration</Label>
                    </div>
                    
                    <div>
                      <Label htmlFor="sarsExportFormat">SARS Export Format</Label>
                      <Select defaultValue="emp201">
                        <SelectTrigger id="sarsExportFormat">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emp201">EMP201 Format</SelectItem>
                          <SelectItem value="emp501">EMP501 Format</SelectItem>
                          <SelectItem value="it3a">IT3(a) Format</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Accounting System Integration</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="accountingIntegration" defaultChecked />
                      <Label htmlFor="accountingIntegration">Enable Accounting System integration</Label>
                    </div>
                    
                    <div>
                      <Label htmlFor="accountingSystem">Accounting System</Label>
                      <Select defaultValue="sage">
                        <SelectTrigger id="accountingSystem">
                          <SelectValue placeholder="Select system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sage">Sage</SelectItem>
                          <SelectItem value="xero">Xero</SelectItem>
                          <SelectItem value="quickbooks">QuickBooks</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="journalEntryCreation" defaultChecked />
                      <Label htmlFor="journalEntryCreation">Automatically create journal entries</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button onClick={handleSaveSettings}>Save Integration Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
