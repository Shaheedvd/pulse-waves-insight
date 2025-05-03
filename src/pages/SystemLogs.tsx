
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const SystemLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample log entries
  const sampleLogs = [
    { id: 1, timestamp: "2025-05-03 05:10:23", level: "INFO", source: "Authentication", message: "User johndoe@example.com logged in" },
    { id: 2, timestamp: "2025-05-03 05:08:17", level: "WARNING", source: "Reports", message: "Report generation took longer than expected" },
    { id: 3, timestamp: "2025-05-03 05:05:45", level: "ERROR", source: "Database", message: "Failed to connect to database. Retrying..." },
    { id: 4, timestamp: "2025-05-03 04:58:32", level: "INFO", source: "API", message: "Received 200 response from external API" },
    { id: 5, timestamp: "2025-05-03 04:55:19", level: "INFO", source: "Authentication", message: "User sarahsmith@example.com logged out" }
  ];
  
  const filteredLogs = sampleLogs.filter(log => 
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.level.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getBadgeVariant = (level: string) => {
    switch (level) {
      case "ERROR": 
        return "destructive";
      case "WARNING":
        return "warning";
      case "INFO":
      default:
        return "secondary";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">System Logs</h1>
        <p className="text-muted-foreground">
          View and analyze system activity logs
        </p>
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="relative grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search logs..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Export Logs</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent System Logs</CardTitle>
          <CardDescription>
            Most recent system events and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map(log => (
              <div key={log.id} className="p-4 border rounded-md">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getBadgeVariant(log.level)}>
                        {log.level}
                      </Badge>
                      <span className="font-medium">{log.source}</span>
                    </div>
                    <p className="text-sm mt-1">
                      {log.message}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {log.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemLogs;
