
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus, AlertTriangle, TrendingDown } from "lucide-react";

export const InventoryControl = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Parts & Inventory Control</CardTitle>
          <CardDescription>Manage maintenance parts inventory and supply chain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Package className="mx-auto h-12 w-12 mb-4" />
            <p className="text-lg font-medium mb-2">Inventory Management</p>
            <p>Track parts, manage stock levels, and automate reordering</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
