
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Building,
  ClipboardCheck,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

// Sample data for charts
const evaluationData = [
  { name: "Jan", score: 78 },
  { name: "Feb", score: 82 },
  { name: "Mar", score: 85 },
  { name: "Apr", score: 80 },
  { name: "May", score: 88 },
  { name: "Jun", score: 92 },
];

const categoryData = [
  { name: "Service", value: 85 },
  { name: "Cleanliness", value: 92 },
  { name: "Product Quality", value: 78 },
  { name: "Speed", value: 88 },
];

const locationPerformance = [
  { name: "Cape Town", score: 92 },
  { name: "Johannesburg", score: 85 },
  { name: "Durban", score: 76 },
  { name: "Pretoria", score: 88 },
  { name: "Port Elizabeth", score: 82 },
];

const COLORS = ["#1A5276", "#008080", "#2E86C1", "#148F77", "#117864"];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Last updated: </span>
          <span className="text-sm font-medium">Today, 10:30 AM</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Overall CX Score
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-bold">86%</p>
                  <div className="flex items-center text-xs text-green-500">
                    <ArrowUp size={12} />
                    <span>4%</span>
                  </div>
                </div>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <Star size={20} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Clients
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-bold">24</p>
                  <div className="flex items-center text-xs text-green-500">
                    <ArrowUp size={12} />
                    <span>2</span>
                  </div>
                </div>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <Building size={20} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Recent Evaluations
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-bold">128</p>
                  <div className="flex items-center text-xs text-green-500">
                    <ArrowUp size={12} />
                    <span>12%</span>
                  </div>
                </div>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <ClipboardCheck size={20} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Locations Covered
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-bold">82</p>
                  <div className="flex items-center text-xs text-red-500">
                    <ArrowDown size={12} />
                    <span>3</span>
                  </div>
                </div>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <MapPin size={20} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>CX Score Trend</CardTitle>
            <CardDescription>
              Monthly customer experience scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={evaluationData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#1A5276"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CX Categories</CardTitle>
            <CardDescription>
              Performance across key categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                      index,
                    }) => {
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                      const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="white"
                          textAnchor={x > cx ? "start" : "end"}
                          dominantBaseline="central"
                        >
                          {`${categoryData[index].name} ${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Location Performance</CardTitle>
            <CardDescription>
              Customer experience scores by location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={locationPerformance}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#008080" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Evaluations</CardTitle>
            <CardDescription>Latest customer experience evaluations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  client: "Retail Corp SA",
                  location: "Cape Town CBD",
                  date: "Today, 09:15 AM",
                  score: 92,
                },
                {
                  client: "QuickMart",
                  location: "Johannesburg North",
                  date: "Yesterday, 02:30 PM",
                  score: 78,
                },
                {
                  client: "EcoFuel",
                  location: "Durban Beachfront",
                  date: "Yesterday, 10:45 AM",
                  score: 85,
                },
                {
                  client: "LuxCafé",
                  location: "Pretoria Central",
                  date: "22 Jun 2023, 11:20 AM",
                  score: 89,
                },
              ].map((evaluation, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{evaluation.client}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin size={12} className="mr-1" />
                      {evaluation.location}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {evaluation.date}
                    </div>
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      evaluation.score >= 85
                        ? "bg-green-100 text-green-800"
                        : evaluation.score >= 70
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {evaluation.score}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
