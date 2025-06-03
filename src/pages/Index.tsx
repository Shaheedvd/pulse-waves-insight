
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart3, Users, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time customer experience tracking and insights"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless workflow management across departments"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Role-based access control and data protection"
    }
  ];

  const benefits = [
    "Comprehensive CX evaluation tools",
    "Automated reporting and analytics",
    "Multi-department integration",
    "Real-time performance monitoring",
    "Customizable audit workflows",
    "Advanced user management"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity size={32} className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Pulse Point CX</h1>
          </div>
          <Button onClick={handleLoginClick} variant="outline">
            Employee Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Transform Your
              <span className="text-blue-600 block">Customer Experience</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive platform for evaluations, analytics, and team management. 
              Drive exceptional customer experiences with data-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleLoginClick} className="text-lg px-8 py-3">
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Login Card */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Quick Access</CardTitle>
                <CardDescription>
                  Sign in to your Pulse Point CX dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleLoginClick}
                  className="w-full text-lg py-6"
                  size="lg"
                >
                  <Activity className="mr-2" size={20} />
                  Employee Login
                </Button>
                <p className="text-sm text-center text-gray-500">
                  Access evaluations, reports, and analytics
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Teams
          </h3>
          <p className="text-lg text-gray-600">
            Everything you need to deliver exceptional customer experiences
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <feature.icon size={32} className="text-blue-600" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Pulse Point CX?
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Ready to Get Started?</h4>
              <p className="mb-6">
                Join teams across industries who trust Pulse Point CX to deliver 
                outstanding customer experiences.
              </p>
              <Button 
                onClick={handleLoginClick}
                variant="secondary" 
                size="lg"
                className="w-full"
              >
                Access Your Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Activity size={24} className="text-blue-400" />
              <span className="text-lg font-semibold">Pulse Point CX</span>
            </div>
            <p className="text-gray-400">
              © 2024 Pulse Point CX. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
