
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, ExternalLink, RefreshCw, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const GmailIntegration: React.FC = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<any[]>([]);

  // Mock Gmail emails for demonstration
  const mockEmails = [
    {
      id: "1",
      from: "client@example.com",
      subject: "Project Update Required",
      snippet: "Hi team, we need an update on the current project status...",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: "2",
      from: "vendor@supplier.com",
      subject: "Invoice #12345",
      snippet: "Please find attached invoice for the recent services...",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ];

  const handleConnect = async () => {
    setIsLoading(true);
    // Simulate Gmail OAuth connection
    setTimeout(() => {
      setIsConnected(true);
      setEmails(mockEmails);
      setIsLoading(false);
      toast({
        title: "Gmail Connected",
        description: "Successfully connected to your Gmail account"
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setEmails([]);
    toast({
      title: "Gmail Disconnected",
      description: "Gmail integration has been disabled"
    });
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate fetching new emails
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Emails Refreshed",
        description: "Latest emails have been fetched"
      });
    }, 1000);
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Gmail Integration
          </CardTitle>
          <CardDescription>
            Connect your Gmail account to access external emails within the internal messaging system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Connect Gmail</h3>
            <p className="text-muted-foreground mb-6">
              Access your Gmail emails alongside internal messages for a unified communication experience
            </p>
            <Button onClick={handleConnect} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Connect Gmail Account
                </>
              )}
            </Button>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Security & Privacy</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your Gmail credentials are never stored on our servers</li>
              <li>• We use secure OAuth 2.0 authentication</li>
              <li>• You can disconnect at any time</li>
              <li>• Only read access is requested - we cannot send emails from your account</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Gmail Integration
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Connected
                </Badge>
              </CardTitle>
              <CardDescription>
                External emails from your Gmail account
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleDisconnect}>
                <Settings className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {emails.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No emails found
              </p>
            ) : (
              emails.map((email) => (
                <div
                  key={email.id}
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                    !email.read ? "bg-blue-50 border-blue-200" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{email.from}</span>
                        {!email.read && (
                          <Badge variant="secondary" className="text-xs">
                            New
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          External
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm">{email.subject}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {email.snippet}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{new Date(email.date).toLocaleString()}</span>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
