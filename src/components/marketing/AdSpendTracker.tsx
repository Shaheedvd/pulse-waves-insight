
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, TrendingUp, Target, Eye } from "lucide-react";

export const AdSpendTracker = () => {
  const adData = [
    { channel: "Google Ads", budget: 5000, spent: 4200, conversions: 85, roi: 320 },
    { channel: "Facebook", budget: 3000, spent: 2800, conversions: 45, roi: 180 },
    { channel: "LinkedIn", budget: 2000, spent: 1500, conversions: 25, roi: 150 },
    { channel: "TikTok", budget: 1000, spent: 800, conversions: 15, roi: 120 },
  ];

  const totalSpent = adData.reduce((sum, ad) => sum + ad.spent, 0);
  const totalConversions = adData.reduce((sum, ad) => sum + ad.conversions, 0);
  const avgROI = adData.reduce((sum, ad) => sum + ad.roi, 0) / adData.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Ad Spend & ROI Tracker</h2>
          <p className="text-muted-foreground">Monitor advertising spend and return on investment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConversions}</div>
            <p className="text-xs text-muted-foreground">Total conversions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgROI.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">Return on ad spend</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost per Conv.</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalSpent / totalConversions).toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Average cost</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Spend by Channel</CardTitle>
            <CardDescription>Advertising spend across different platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={adData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="channel" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="spent" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
            <CardDescription>Spend vs conversions by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Channel</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Conversions</TableHead>
                  <TableHead>ROI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adData.map((ad) => (
                  <TableRow key={ad.channel}>
                    <TableCell className="font-medium">{ad.channel}</TableCell>
                    <TableCell>${ad.spent.toLocaleString()}</TableCell>
                    <TableCell>{ad.conversions}</TableCell>
                    <TableCell>
                      <Badge variant={ad.roi > 200 ? "default" : "secondary"}>
                        {ad.roi}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
