import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, BarChart3, Calendar, Building2, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface CustomerProfile {
  company_name: string | null;
  industry: string | null;
  phone: string | null;
}

interface Evaluation {
  id: string;
  client: string;
  location: string;
  date: string;
  score: number;
  status: string;
}

const CustomerDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(null);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerData();
  }, [currentUser]);

  const fetchCustomerData = async () => {
    if (!currentUser) return;

    try {
      // Fetch customer profile
      const { data: profile, error: profileError } = await supabase
        .from('customer_profiles' as any)
        .select('company_name, industry, phone')
        .eq('user_id', currentUser.id)
        .maybeSingle();

      if (profileError) {
        throw profileError;
      }

      setCustomerProfile(profile as unknown as CustomerProfile | null);

      const companyName = (profile as any)?.company_name || 'Your Company';

      // Mock evaluations data - in production, this would come from the database
      setEvaluations([
        {
          id: 'EV-2024-001',
          client: companyName,
          location: 'Main Office',
          date: '2024-01-15',
          score: 92,
          status: 'Completed'
        },
        {
          id: 'EV-2024-002',
          client: companyName,
          location: 'Branch Office',
          date: '2024-02-20',
          score: 88,
          status: 'Completed'
        },
        {
          id: 'EV-2024-003',
          client: companyName,
          location: 'Main Office',
          date: '2024-03-10',
          score: 0,
          status: 'Scheduled'
        }
      ]);
    } catch (error: any) {
      console.error('Error fetching customer data:', error);
      toast({
        title: "Error",
        description: "Failed to load customer data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/customer-login');
  };

  const completedEvaluations = evaluations.filter(e => e.status === 'Completed');
  const scheduledEvaluations = evaluations.filter(e => e.status === 'Scheduled');
  const avgScore = completedEvaluations.length > 0
    ? Math.round(completedEvaluations.reduce((sum, e) => sum + e.score, 0) / completedEvaluations.length)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <header className="bg-background shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Customer Portal</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Company Info Section */}
        <Card className="mb-8 bg-card border-border">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Building2 className="text-primary" size={24} />
              <div>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Your company details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Company Name</p>
                <p className="text-lg font-semibold text-foreground">{customerProfile?.company_name || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Industry</p>
                <p className="text-lg font-semibold text-foreground">{customerProfile?.industry || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-lg font-semibold text-foreground">{customerProfile?.phone || 'Not set'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to Your Dashboard</h2>
          <p className="text-muted-foreground">Access your evaluations, reports, and insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow bg-card border-border">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileText className="text-primary" size={24} />
                </div>
                <div>
                  <CardTitle className="text-foreground">{completedEvaluations.length}</CardTitle>
                  <CardDescription>Completed Evaluations</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-card border-border">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="text-primary" size={24} />
                </div>
                <div>
                  <CardTitle className="text-foreground">{avgScore}%</CardTitle>
                  <CardDescription>Average Score</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-card border-border">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Calendar className="text-primary" size={24} />
                </div>
                <div>
                  <CardTitle className="text-foreground">{scheduledEvaluations.length}</CardTitle>
                  <CardDescription>Scheduled Reviews</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Evaluations */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Evaluations</CardTitle>
            <CardDescription>Your latest evaluation results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {evaluations.map((evaluation) => (
                <div key={evaluation.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{evaluation.id}</p>
                    <p className="text-sm text-muted-foreground">{evaluation.location} • {evaluation.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {evaluation.status === 'Completed' && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">{evaluation.score}%</p>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                    )}
                    <Badge variant={evaluation.status === 'Completed' ? 'default' : 'secondary'}>
                      {evaluation.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CustomerDashboard;
