
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Mail, Phone, Globe, MapPin, Star, DollarSign, FileText, Plus } from "lucide-react";

export const CustomerAccounts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock customer data
  const customers = [
    {
      id: "1",
      companyInfo: {
        name: "TechCorp Inc",
        industry: "Technology",
        size: "Medium",
        website: "https://techcorp.com",
        address: "123 Tech Street, Silicon Valley, CA"
      },
      primaryContact: {
        name: "John Doe",
        email: "john.doe@techcorp.com",
        phone: "+1-555-0123",
        jobTitle: "IT Director"
      },
      totalRevenue: 75000,
      activeDeals: 2,
      totalDeals: 5,
      supportTickets: 3,
      feedbackRating: 4.8,
      lastActivity: "2024-01-20T10:00:00Z"
    },
    {
      id: "2",
      companyInfo: {
        name: "RetailChain Ltd",
        industry: "Retail",
        size: "Large",
        website: "https://retailchain.com",
        address: "456 Retail Ave, New York, NY"
      },
      primaryContact: {
        name: "Jane Smith",
        email: "jane.smith@retailchain.com",
        phone: "+1-555-0124",
        jobTitle: "Operations Manager"
      },
      totalRevenue: 125000,
      activeDeals: 1,
      totalDeals: 8,
      supportTickets: 1,
      feedbackRating: 4.5,
      lastActivity: "2024-01-18T14:30:00Z"
    }
  ];

  const recentActivities = [
    {
      id: "1",
      type: "deal",
      description: "New deal created - Software License Renewal",
      customer: "TechCorp Inc",
      date: "2024-01-20T10:00:00Z"
    },
    {
      id: "2",
      type: "support",
      description: "Support ticket resolved - Integration Issue",
      customer: "RetailChain Ltd",
      date: "2024-01-19T16:30:00Z"
    },
    {
      id: "3",
      type: "quote",
      description: "Quote sent for consulting services",
      customer: "TechCorp Inc",
      date: "2024-01-18T11:15:00Z"
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.companyInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.primaryContact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.companyInfo.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Customer Accounts</h2>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <Tabs defaultValue="accounts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="accounts">Customer Accounts</TabsTrigger>
          <TabsTrigger value="activities">Recent Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Customer Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{customer.companyInfo.name}</CardTitle>
                        <CardDescription>{customer.companyInfo.industry}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{customer.feedbackRating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Primary Contact */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Primary Contact</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{customer.primaryContact.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {customer.primaryContact.jobTitle}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{customer.primaryContact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{customer.primaryContact.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Company Details</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <a href={customer.companyInfo.website} className="hover:underline">
                          {customer.companyInfo.website}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{customer.companyInfo.address}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {customer.companyInfo.size} Company
                      </Badge>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-lg font-bold text-green-600">
                          ${customer.totalRevenue.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Total Revenue</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-lg font-bold text-blue-600">
                          {customer.activeDeals}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Active Deals</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      New Deal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Customer Activities</CardTitle>
              <CardDescription>
                Latest interactions and updates across all customer accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {activity.type === 'deal' && <FileText className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'support' && <Phone className="h-4 w-4 text-green-600" />}
                      {activity.type === 'quote' && <DollarSign className="h-4 w-4 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.customer} • {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
