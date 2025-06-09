
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Mail, Phone, Calendar, MessageSquare, TrendingUp, AlertCircle, Plus, Edit, Eye, FileText, DollarSign } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Client {
  id: string;
  name: string;
  industry: string;
  size: string;
  status: "prospect" | "active" | "inactive" | "churned";
  primaryContact: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  revenue: number;
  lastContact: string;
  satisfactionScore: number;
  tags: string[];
  notes: string;
  createdAt: string;
}

interface Contact {
  id: string;
  clientId: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  isPrimary: boolean;
  department: string;
  notes: string;
}

interface Interaction {
  id: string;
  clientId: string;
  contactId: string;
  type: "call" | "email" | "meeting" | "note";
  subject: string;
  description: string;
  date: string;
  duration?: number;
  outcome: string;
  followUpDate?: string;
  createdBy: string;
}

interface Opportunity {
  id: string;
  clientId: string;
  title: string;
  value: number;
  stage: "prospecting" | "qualification" | "proposal" | "negotiation" | "closed-won" | "closed-lost";
  probability: number;
  expectedCloseDate: string;
  actualCloseDate?: string;
  description: string;
  assignedTo: string;
  products: string[];
  source: string;
}

const CustomerRelations = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("clients");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [isAddInteractionOpen, setIsAddInteractionOpen] = useState(false);
  const [isAddOpportunityOpen, setIsAddOpportunityOpen] = useState(false);

  // Mock data
  const [clients, setClients] = useState<Client[]>([
    {
      id: "CL-001",
      name: "TechCorp Solutions",
      industry: "Technology",
      size: "Enterprise",
      status: "active",
      primaryContact: "Sarah Wilson",
      email: "contact@techcorp.com",
      phone: "+1 555-0123",
      address: "123 Tech Street, San Francisco, CA 94105",
      website: "https://techcorp.com",
      revenue: 2500000,
      lastContact: "2024-01-15",
      satisfactionScore: 95,
      tags: ["high-value", "strategic"],
      notes: "Major enterprise client with excellent relationship",
      createdAt: "2023-06-15"
    },
    {
      id: "CL-002",
      name: "Green Energy Co",
      industry: "Energy",
      size: "Medium",
      status: "prospect",
      primaryContact: "Mike Johnson",
      email: "mike@greenenergy.com",
      phone: "+1 555-0456",
      address: "456 Green Ave, Austin, TX 78701",
      website: "https://greenenergy.com",
      revenue: 850000,
      lastContact: "2024-01-10",
      satisfactionScore: 78,
      tags: ["sustainable", "growing"],
      notes: "Potential for solar panel management system",
      createdAt: "2024-01-05"
    }
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "CT-001",
      clientId: "CL-001",
      name: "Sarah Wilson",
      title: "CTO",
      email: "sarah@techcorp.com",
      phone: "+1 555-0124",
      isPrimary: true,
      department: "Technology",
      notes: "Decision maker for tech purchases"
    },
    {
      id: "CT-002",
      clientId: "CL-001",
      name: "John Smith",
      title: "CEO",
      email: "john@techcorp.com",
      phone: "+1 555-0125",
      isPrimary: false,
      department: "Executive",
      notes: "Final approval authority"
    }
  ]);

  const [interactions, setInteractions] = useState<Interaction[]>([
    {
      id: "INT-001",
      clientId: "CL-001",
      contactId: "CT-001",
      type: "meeting",
      subject: "Q1 System Review",
      description: "Reviewed system performance and discussed upgrade options",
      date: "2024-01-15T14:00:00Z",
      duration: 60,
      outcome: "Positive - interested in upgrade",
      followUpDate: "2024-01-25",
      createdBy: "user-1"
    }
  ]);

  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: "OPP-001",
      clientId: "CL-001",
      title: "System Upgrade Project",
      value: 75000,
      stage: "proposal",
      probability: 80,
      expectedCloseDate: "2024-02-28",
      description: "Upgrade to enterprise CX management platform",
      assignedTo: "Sales Team",
      products: ["CX Platform", "Analytics Module"],
      source: "existing-client"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "prospect": return "bg-blue-100 text-blue-800";
      case "inactive": return "bg-yellow-100 text-yellow-800";
      case "churned": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "closed-won": return "bg-green-100 text-green-800";
      case "closed-lost": return "bg-red-100 text-red-800";
      case "negotiation": return "bg-orange-100 text-orange-800";
      case "proposal": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.primaryContact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addClient = (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...clientData,
      id: `CL-${String(clients.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString()
    };
    setClients([...clients, newClient]);
    setIsAddClientOpen(false);
  };

  const addContact = (contactData: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contactData,
      id: `CT-${String(contacts.length + 1).padStart(3, '0')}`
    };
    setContacts([...contacts, newContact]);
    setIsAddContactOpen(false);
  };

  const addInteraction = (interactionData: Omit<Interaction, 'id' | 'createdBy'>) => {
    const newInteraction: Interaction = {
      ...interactionData,
      id: `INT-${String(interactions.length + 1).padStart(3, '0')}`,
      createdBy: currentUser?.id || "system"
    };
    setInteractions([...interactions, newInteraction]);
    setIsAddInteractionOpen(false);
  };

  const addOpportunity = (opportunityData: Omit<Opportunity, 'id'>) => {
    const newOpportunity: Opportunity = {
      ...opportunityData,
      id: `OPP-${String(opportunities.length + 1).padStart(3, '0')}`
    };
    setOpportunities([...opportunities, newOpportunity]);
    setIsAddOpportunityOpen(false);
  };

  const totalRevenue = clients.reduce((sum, client) => sum + client.revenue, 0);
  const activeClients = clients.filter(c => c.status === "active").length;
  const avgSatisfaction = clients.reduce((sum, client) => sum + client.satisfactionScore, 0) / clients.length;
  const openOpportunities = opportunities.filter(o => !o.stage.includes("closed")).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Customer Relations Management</h2>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">+12% from last quarter</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClients}</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Satisfaction</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSatisfaction.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Opportunities</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openOpportunities}</div>
            <p className="text-xs text-muted-foreground">Pipeline value: $125k</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-4">
          <div className="flex justify-between items-center">
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Client
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                  <DialogDescription>Enter client information to add them to your CRM</DialogDescription>
                </DialogHeader>
                <ClientForm onSubmit={addClient} onCancel={() => setIsAddClientOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Satisfaction</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.primaryContact}</p>
                        </div>
                      </TableCell>
                      <TableCell>{client.industry}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${(client.revenue / 1000).toFixed(0)}k</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-medium">{client.satisfactionScore}%</span>
                          <TrendingUp className="ml-1 h-3 w-3 text-green-500" />
                        </div>
                      </TableCell>
                      <TableCell>{client.lastContact}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedClient(client)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Contact Management</h3>
            <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Contact</DialogTitle>
                </DialogHeader>
                <ContactForm onSubmit={addContact} onCancel={() => setIsAddContactOpen(false)} clients={clients} />
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Primary</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => {
                    const client = clients.find(c => c.id === contact.clientId);
                    return (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>{client?.name || "Unknown"}</TableCell>
                        <TableCell>{contact.title}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>
                          {contact.isPrimary && <Badge variant="outline">Primary</Badge>}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Client Interactions</h3>
            <Dialog open={isAddInteractionOpen} onOpenChange={setIsAddInteractionOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Log Interaction
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log New Interaction</DialogTitle>
                </DialogHeader>
                <InteractionForm onSubmit={addInteraction} onCancel={() => setIsAddInteractionOpen(false)} clients={clients} contacts={contacts} />
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead>Follow-up</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {interactions.map((interaction) => {
                    const client = clients.find(c => c.id === interaction.clientId);
                    return (
                      <TableRow key={interaction.id}>
                        <TableCell>{new Date(interaction.date).toLocaleDateString()}</TableCell>
                        <TableCell>{client?.name || "Unknown"}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{interaction.type}</Badge>
                        </TableCell>
                        <TableCell>{interaction.subject}</TableCell>
                        <TableCell>{interaction.outcome}</TableCell>
                        <TableCell>
                          {interaction.followUpDate && new Date(interaction.followUpDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Sales Opportunities</h3>
            <Dialog open={isAddOpportunityOpen} onOpenChange={setIsAddOpportunityOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Opportunity
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Opportunity</DialogTitle>
                </DialogHeader>
                <OpportunityForm onSubmit={addOpportunity} onCancel={() => setIsAddOpportunityOpen(false)} clients={clients} />
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Opportunity</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Expected Close</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunities.map((opportunity) => {
                    const client = clients.find(c => c.id === opportunity.clientId);
                    return (
                      <TableRow key={opportunity.id}>
                        <TableCell className="font-medium">{opportunity.title}</TableCell>
                        <TableCell>{client?.name || "Unknown"}</TableCell>
                        <TableCell>${(opportunity.value / 1000).toFixed(0)}k</TableCell>
                        <TableCell>
                          <Badge className={getStageColor(opportunity.stage)}>
                            {opportunity.stage}
                          </Badge>
                        </TableCell>
                        <TableCell>{opportunity.probability}%</TableCell>
                        <TableCell>{new Date(opportunity.expectedCloseDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Client Details Modal */}
      {selectedClient && (
        <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedClient.name}</DialogTitle>
              <DialogDescription>Client details and relationship overview</DialogDescription>
            </DialogHeader>
            <ClientDetailsView client={selectedClient} contacts={contacts.filter(c => c.clientId === selectedClient.id)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Helper Components
const ClientForm = ({ onSubmit, onCancel }: { onSubmit: (data: Omit<Client, 'id' | 'createdAt'>) => void, onCancel: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    size: "Small",
    status: "prospect" as const,
    primaryContact: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    revenue: 0,
    lastContact: new Date().toISOString().split('T')[0],
    satisfactionScore: 80,
    tags: [] as string[],
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Company Name</Label>
          <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        </div>
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input id="industry" value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})} />
        </div>
        <div>
          <Label htmlFor="size">Company Size</Label>
          <Select value={formData.size} onValueChange={(value) => setFormData({...formData, size: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Small">Small (1-50)</SelectItem>
              <SelectItem value="Medium">Medium (51-500)</SelectItem>
              <SelectItem value="Large">Large (501-5000)</SelectItem>
              <SelectItem value="Enterprise">Enterprise (5000+)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prospect">Prospect</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="primaryContact">Primary Contact</Label>
          <Input id="primaryContact" value={formData.primaryContact} onChange={(e) => setFormData({...formData, primaryContact: e.target.value})} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
      </div>
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Add Client</Button>
      </div>
    </form>
  );
};

const ContactForm = ({ onSubmit, onCancel, clients }: { onSubmit: (data: Omit<Contact, 'id'>) => void, onCancel: () => void, clients: Client[] }) => {
  const [formData, setFormData] = useState({
    clientId: "",
    name: "",
    title: "",
    email: "",
    phone: "",
    isPrimary: false,
    department: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="clientId">Client</Label>
        <Select value={formData.clientId} onValueChange={(value) => setFormData({...formData, clientId: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select client" />
          </SelectTrigger>
          <SelectContent>
            {clients.map(client => (
              <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Add Contact</Button>
      </div>
    </form>
  );
};

const InteractionForm = ({ onSubmit, onCancel, clients, contacts }: { 
  onSubmit: (data: Omit<Interaction, 'id' | 'createdBy'>) => void, 
  onCancel: () => void, 
  clients: Client[], 
  contacts: Contact[] 
}) => {
  const [formData, setFormData] = useState({
    clientId: "",
    contactId: "",
    type: "call" as const,
    subject: "",
    description: "",
    date: new Date().toISOString(),
    outcome: "",
    followUpDate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const filteredContacts = contacts.filter(c => c.clientId === formData.clientId);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="clientId">Client</Label>
          <Select value={formData.clientId} onValueChange={(value) => setFormData({...formData, clientId: value, contactId: ""})}>
            <SelectTrigger>
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              {clients.map(client => (
                <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="contactId">Contact</Label>
          <Select value={formData.contactId} onValueChange={(value) => setFormData({...formData, contactId: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select contact" />
            </SelectTrigger>
            <SelectContent>
              {filteredContacts.map(contact => (
                <SelectItem key={contact.id} value={contact.id}>{contact.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Log Interaction</Button>
      </div>
    </form>
  );
};

const OpportunityForm = ({ onSubmit, onCancel, clients }: { onSubmit: (data: Omit<Opportunity, 'id'>) => void, onCancel: () => void, clients: Client[] }) => {
  const [formData, setFormData] = useState({
    clientId: "",
    title: "",
    value: 0,
    stage: "prospecting" as const,
    probability: 50,
    expectedCloseDate: "",
    description: "",
    assignedTo: "",
    products: [] as string[],
    source: "website"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Opportunity Title</Label>
        <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="clientId">Client</Label>
          <Select value={formData.clientId} onValueChange={(value) => setFormData({...formData, clientId: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              {clients.map(client => (
                <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="value">Value ($)</Label>
          <Input id="value" type="number" value={formData.value} onChange={(e) => setFormData({...formData, value: Number(e.target.value)})} />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Add Opportunity</Button>
      </div>
    </form>
  );
};

const ClientDetailsView = ({ client, contacts }: { client: Client, contacts: Contact[] }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-2">Company Information</h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Industry:</span> {client.industry}</p>
            <p><span className="font-medium">Size:</span> {client.size}</p>
            <p><span className="font-medium">Revenue:</span> ${(client.revenue / 1000).toFixed(0)}k</p>
            <p><span className="font-medium">Website:</span> {client.website}</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Relationship</h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Status:</span> <Badge className={getStatusColor(client.status)}>{client.status}</Badge></p>
            <p><span className="font-medium">Satisfaction:</span> {client.satisfactionScore}%</p>
            <p><span className="font-medium">Last Contact:</span> {client.lastContact}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">Contacts ({contacts.length})</h4>
        <div className="space-y-2">
          {contacts.map(contact => (
            <div key={contact.id} className="flex justify-between items-center p-2 border rounded">
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.title}</p>
              </div>
              <div className="text-sm">
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Notes</h4>
        <p className="text-sm">{client.notes}</p>
      </div>
    </div>
  );
};

export default CustomerRelations;
