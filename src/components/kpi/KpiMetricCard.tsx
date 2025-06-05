
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { KpiMetric } from "@/types/kpi";

interface KpiMetricCardProps {
  metric: KpiMetric;
  onEdit?: (metric: KpiMetric) => void;
  onDelete?: (id: string) => void;
}

const KpiMetricCard: React.FC<KpiMetricCardProps> = ({ metric, onEdit, onDelete }) => {
  const getStatusColor = (status: KpiMetric["status"]) => {
    switch (status) {
      case "exceeding": return "bg-green-100 text-green-800";
      case "meeting": return "bg-blue-100 text-blue-800";
      case "below": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: KpiMetric["trend"]) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "stable": return <ArrowRight className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{metric.name}</CardTitle>
          {getTrendIcon(metric.trend)}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{metric.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">
              {metric.currentValue !== null ? `${metric.currentValue}%` : 'N/A'}
            </p>
            <p className="text-xs text-muted-foreground">Current Value</p>
          </div>
          <Badge className={getStatusColor(metric.status)}>
            {metric.status}
          </Badge>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Target: {metric.target}</span>
            <span>Weight: {metric.weighting}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all"
              style={{ 
                width: `${metric.currentValue ? Math.min(100, (metric.currentValue / 100) * 100) : 0}%` 
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiMetricCard;
