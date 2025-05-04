import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, Edit, UserPlus, Search, Filter, Users } from "lucide-react";
import { useAuth, UserRole, Department } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const UserManagement = () => {
  const { users, addUser, updateUser, deleteUser, currentUser } = useAuth();
  const { toast } = useToast();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<Department | "all">("all");
  const [filterRole, setFilterRole] = useState<UserRole | "all">("all");
  
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "viewer" as UserRole,
    department: "operations" as Department,
    position: "",
    requiresMFA: false,
  });
  
  const [editingUser, setEditingUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "viewer" as UserRole,
    department: "operations" as Department,
    position: "",
    requiresMFA: false,
  });

  const roleLabels: Record<UserRole, string> = {
    superuser: "Super User",
    power_manager: "Power Manager",
    manager: "Manager",
    lead_admin: "Lead Admin",
    admin: "Admin",
    restricted_admin: "Restricted Admin",
    viewer: "Viewer",
  };

  const departmentLabels: Record<Department, string> = {
    operations: "Operations",
    finance: "Finance & Accounting",
    hr: "Human Resources",
    marketing: "Marketing",
    sales: "Sales",
    product: "Product / Service",
    it: "IT / Technology",
    customer_support: "Customer Support",
    legal: "Legal",
    facilities: "Facilities",
  };

  const getRoleBadgeVariant = (role: UserRole): "default" | "destructive" | "orange" | "purple" | "blue" | "outline" | "secondary" => {
    switch (role) {
      case "superuser": return "destructive";
      case "power_manager": return "orange";
      case "manager": return "purple";
      case "lead_admin": return "blue";
      case "admin": return "default";
      case "restricted_admin": return "outline";
      case "viewer": return "secondary";
      default: return "default" as "default";
    }
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.position) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addUser(newUser);
    toast({
      title: "User Added",
      description: `${newUser.name} has been added as a ${roleLabels[newUser.role]} in ${departmentLabels[newUser.department]}`,
    });
    setNewUser({ 
      name: "", 
      email: "", 
      role: "viewer", 
      department: "operations", 
      position: "",
      requiresMFA: false,
    });
    setIsAddUserOpen(false);
  };

  const handleUpdateUser = () => {
    if (!editingUser.name || !editingUser.email || !editingUser.position) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const { id, ...updates } = editingUser;
    updateUser(id, updates);
    toast({
      title: "User Updated",
      description: `${editingUser.name}'s information has been updated`,
    });
    setIsEditUserOpen(false);
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (id === currentUser?.id) {
      toast({
        title: "Cannot Delete",
        description: "You cannot delete your own account",
        variant: "destructive",
      });
      return;
    }

    deleteUser(id);
    toast({
      title: "User Deleted",
      description: `${name} has been removed from the system`,
    });
  };

  const openEditDialog = (user: typeof users[0]) => {
    setEditingUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department || "operations",
      position: user.position || "",
      requiresMFA: user.requiresMFA || false,
    });
    setIsEditUserOpen(true);
  };

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.position && user.position.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = 
      filterDepartment === "all" || 
      user.department === filterDepartment;
    
    const matchesRole = 
      filterRole === "all" || 
      user.role === filterRole;
    
    return matchesSearch && matchesDepartment && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <Button onClick={() => setIsAddUserOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>
            Manage user accounts and their role-based permissions
          </CardDescription>
          
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-4">
              <div className="w-[180px]">
                <Select 
                  value={filterDepartment} 
                  onValueChange={(value) => setFilterDepartment(value as Department | "all")}
                >
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="finance">Finance & Accounting</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="product">Product / Service</SelectItem>
                    <SelectItem value="it">IT / Technology</SelectItem>
                    <SelectItem value="customer_support">Customer Support</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="facilities">Facilities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-[180px]">
                <Select 
                  value={filterRole} 
                  onValueChange={(value) => setFilterRole(value as UserRole | "all")}
                >
                  <SelectTrigger>
                    <Users className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="superuser">Super User</SelectItem>
                    <SelectItem value="power_manager">Power Manager</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="lead_admin">Lead Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="restricted_admin">Restricted Admin</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Employees</TabsTrigger>
              <TabsTrigger value="management">Management</TabsTrigger>
              <TabsTrigger value="admin">Admins</TabsTrigger>
              <TabsTrigger value="other">Other Roles</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="pt-2">
              <EmployeeTable
                users={filteredUsers}
                roleLabels={roleLabels}
                departmentLabels={departmentLabels}
                getRoleBadgeVariant={getRoleBadgeVariant}
                onEdit={openEditDialog}
                onDelete={handleDeleteUser}
                currentUserId={currentUser?.id || ""}
              />
            </TabsContent>
            
            <TabsContent value="management" className="pt-2">
              <EmployeeTable
                users={filteredUsers.filter(user => 
                  user.role === "superuser" || 
                  user.role === "power_manager" || 
                  user.role === "manager"
                )}
                roleLabels={roleLabels}
                departmentLabels={departmentLabels}
                getRoleBadgeVariant={getRoleBadgeVariant}
                onEdit={openEditDialog}
                onDelete={handleDeleteUser}
                currentUserId={currentUser?.id || ""}
              />
            </TabsContent>
            
            <TabsContent value="admin" className="pt-2">
              <EmployeeTable
                users={filteredUsers.filter(user => 
                  user.role === "lead_admin" || 
                  user.role === "admin" || 
                  user.role === "restricted_admin"
                )}
                roleLabels={roleLabels}
                departmentLabels={departmentLabels}
                getRoleBadgeVariant={getRoleBadgeVariant}
                onEdit={openEditDialog}
                onDelete={handleDeleteUser}
                currentUserId={currentUser?.id || ""}
              />
            </TabsContent>
            
            <TabsContent value="other" className="pt-2">
              <EmployeeTable
                users={filteredUsers.filter(user => 
                  user.role === "viewer"
                )}
                roleLabels={roleLabels}
                departmentLabels={departmentLabels}
                getRoleBadgeVariant={getRoleBadgeVariant}
                onEdit={openEditDialog}
                onDelete={handleDeleteUser}
                currentUserId={currentUser?.id || ""}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Create a new user account with specific role and permissions
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={newUser.department}
                  onValueChange={(value: Department) =>
                    setNewUser({ ...newUser, department: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="finance">Finance & Accounting</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="product">Product / Service</SelectItem>
                    <SelectItem value="it">IT / Technology</SelectItem>
                    <SelectItem value="customer_support">Customer Support</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="facilities">Facilities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Access Level / Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value: UserRole) =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="superuser">Super User</SelectItem>
                    <SelectItem value="power_manager">Power Manager</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="lead_admin">Lead Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="restricted_admin">Restricted Admin</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">Position / Job Title</Label>
              <Input
                id="position"
                value={newUser.position}
                onChange={(e) =>
                  setNewUser({ ...newUser, position: e.target.value })
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="requiresMFA"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                checked={newUser.requiresMFA}
                onChange={(e) =>
                  setNewUser({ ...newUser, requiresMFA: e.target.checked })
                }
              />
              <Label htmlFor="requiresMFA">Require Multi-Factor Authentication (MFA)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Add Employee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Update employee information and access permissions
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-department">Department</Label>
                <Select
                  value={editingUser.department}
                  onValueChange={(value: Department) =>
                    setEditingUser({ ...editingUser, department: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="finance">Finance & Accounting</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="product">Product / Service</SelectItem>
                    <SelectItem value="it">IT / Technology</SelectItem>
                    <SelectItem value="customer_support">Customer Support</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="facilities">Facilities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Access Level / Role</Label>
                <Select
                  value={editingUser.role}
                  onValueChange={(value: UserRole) =>
                    setEditingUser({ ...editingUser, role: value })
                  }
                  disabled={editingUser.id === currentUser?.id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="superuser">Super User</SelectItem>
                    <SelectItem value="power_manager">Power Manager</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="lead_admin">Lead Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="restricted_admin">Restricted Admin</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                {editingUser.id === currentUser?.id && (
                  <p className="text-sm text-muted-foreground">
                    You cannot change your own role
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-position">Position / Job Title</Label>
              <Input
                id="edit-position"
                value={editingUser.position}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, position: e.target.value })
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-requiresMFA"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                checked={editingUser.requiresMFA}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, requiresMFA: e.target.checked })
                }
              />
              <Label htmlFor="edit-requiresMFA">Require Multi-Factor Authentication (MFA)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>Update Employee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Extracted Employee Table component
interface EmployeeTableProps {
  users: any[];
  roleLabels: Record<UserRole, string>;
  departmentLabels: Record<Department, string>;
  getRoleBadgeVariant: (role: UserRole) => string;
  onEdit: (user: any) => void;
  onDelete: (id: string, name: string) => void;
  currentUserId: string;
}

const EmployeeTable = ({ 
  users, 
  roleLabels, 
  departmentLabels, 
  getRoleBadgeVariant,
  onEdit, 
  onDelete,
  currentUserId
}: EmployeeTableProps) => {
  if (users.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No employees found matching your criteria</div>;
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-center">MFA</TableHead>
          <TableHead className="w-[100px] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.department ? departmentLabels[user.department as Department] : "—"}</TableCell>
            <TableCell>{user.position || "—"}</TableCell>
            <TableCell>
              <Badge variant={getRoleBadgeVariant(user.role)}>{roleLabels[user.role]}</Badge>
            </TableCell>
            <TableCell className="font-mono text-sm">{user.email}</TableCell>
            <TableCell className="text-center">
              {user.requiresMFA ? "✓" : "—"}
            </TableCell>
            <TableCell>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(user)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDelete(user.id, user.name)}
                  disabled={user.id === currentUserId}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserManagement;
