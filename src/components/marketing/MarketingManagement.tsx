
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketingDashboard } from "./MarketingDashboard";
import { CampaignManagement } from "./CampaignManagement";
import { ContentCalendar } from "./ContentCalendar";
import { AssetLibrary } from "./AssetLibrary";
import { LeadGeneration } from "./LeadGeneration";
import { AudienceSegmentation } from "./AudienceSegmentation";
import { EmailMarketing } from "./EmailMarketing";
import { SEOContentTracker } from "./SEOContentTracker";
import { AdSpendTracker } from "./AdSpendTracker";
import { MarketingRequests } from "./MarketingRequests";
import { TeamTaskManagement } from "./TeamTaskManagement";
import { MarketingAnalytics } from "./MarketingAnalytics";

export const MarketingManagement = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard", component: MarketingDashboard },
    { id: "campaigns", label: "Campaigns", component: CampaignManagement },
    { id: "content", label: "Content", component: ContentCalendar },
    { id: "assets", label: "Assets", component: AssetLibrary },
    { id: "leads", label: "Leads", component: LeadGeneration },
    { id: "audience", label: "Audience", component: AudienceSegmentation },
    { id: "email", label: "Email", component: EmailMarketing },
    { id: "seo", label: "SEO", component: SEOContentTracker },
    { id: "ads", label: "Ad Spend", component: AdSpendTracker },
    { id: "requests", label: "Requests", component: MarketingRequests },
    { id: "tasks", label: "Tasks", component: TeamTaskManagement },
    { id: "analytics", label: "Analytics", component: MarketingAnalytics },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Marketing Management System</h1>
        <p className="text-muted-foreground">
          Complete marketing operations and campaign management platform
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-4">
            <tab.component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
