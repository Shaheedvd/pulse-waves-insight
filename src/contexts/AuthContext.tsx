import React, { createContext, useContext, useState, useEffect } from "react";

// Define user roles with their permission levels
export type UserRole = "superuser" | "admin" | "manager" | "evaluator" | "viewer";

// Define permission types
export interface Permissions {
  canViewReports: boolean;
  canCreateReports: boolean;
  canEditReports: boolean;
  canDeleteReports: boolean;
  canManageUsers: boolean;
  canManageSystem: boolean;
  canEditSettings: boolean;
  canViewEvaluations: boolean;
  canCreateEvaluations: boolean;
  canEditEvaluations: boolean;
  canDeleteEvaluations: boolean;
  canViewClients: boolean;
  canEditClients: boolean;
  canCreateAuditSheets: boolean;
}

// Define user interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permissions;
}

// Role-based permission mapping
const rolePermissions: Record<UserRole, Permissions> = {
  superuser: {
    canViewReports: true,
    canCreateReports: true,
    canEditReports: true,
    canDeleteReports: true,
    canManageUsers: true,
    canManageSystem: true,
    canEditSettings: true,
    canViewEvaluations: true,
    canCreateEvaluations: true,
    canEditEvaluations: true,
    canDeleteEvaluations: true,
    canViewClients: true,
    canEditClients: true,
    canCreateAuditSheets: true,
  },
  admin: {
    canViewReports: true,
    canCreateReports: true,
    canEditReports: true,
    canDeleteReports: false,
    canManageUsers: true,
    canManageSystem: false,
    canEditSettings: true,
    canViewEvaluations: true,
    canCreateEvaluations: true,
    canEditEvaluations: true,
    canDeleteEvaluations: false,
    canViewClients: true,
    canEditClients: true,
    canCreateAuditSheets: true,
  },
  manager: {
    canViewReports: true,
    canCreateReports: true,
    canEditReports: false,
    canDeleteReports: false,
    canManageUsers: false,
    canManageSystem: false,
    canEditSettings: false,
    canViewEvaluations: true,
    canCreateEvaluations: true,
    canEditEvaluations: true,
    canDeleteEvaluations: false,
    canViewClients: true,
    canEditClients: false,
    canCreateAuditSheets: true,
  },
  evaluator: {
    canViewReports: true,
    canCreateReports: false,
    canEditReports: false,
    canDeleteReports: false,
    canManageUsers: false,
    canManageSystem: false,
    canEditSettings: false,
    canViewEvaluations: true,
    canCreateEvaluations: true,
    canEditEvaluations: false,
    canDeleteEvaluations: false,
    canViewClients: true,
    canEditClients: false,
    canCreateAuditSheets: false,
  },
  viewer: {
    canViewReports: true,
    canCreateReports: false,
    canEditReports: false,
    canDeleteReports: false,
    canManageUsers: false,
    canManageSystem: false,
    canEditSettings: false,
    canViewEvaluations: true,
    canCreateEvaluations: false,
    canEditEvaluations: false,
    canDeleteEvaluations: false,
    canViewClients: true,
    canEditClients: false,
    canCreateAuditSheets: false,
  },
};

// Initial users including the superuser
const initialUsers: User[] = [
  {
    id: "1",
    email: "shaheed@pulsepointcx.com",
    name: "Shaheed Van Dawson",
    role: "superuser",
    permissions: rolePermissions.superuser,
  },
  {
    id: "2",
    email: "admin@pulsepointcx.com",
    name: "Admin User",
    role: "admin",
    permissions: rolePermissions.admin,
  },
  {
    id: "3",
    email: "manager@pulsepointcx.com",
    name: "Sarah Manager",
    role: "manager",
    permissions: rolePermissions.manager,
  },
  {
    id: "4",
    email: "evaluator@pulsepointcx.com",
    name: "Eric Evaluator",
    role: "evaluator",
    permissions: rolePermissions.evaluator,
  },
  {
    id: "5",
    email: "viewer@pulsepointcx.com",
    name: "Victor Viewer",
    role: "viewer",
    permissions: rolePermissions.viewer,
  },
];

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  addUser: (user: Omit<User, "id" | "permissions">) => void;
  updateUser: (id: string, updates: Partial<Omit<User, "id" | "permissions">>) => void;
  deleteUser: (id: string) => void;
  hasPermission: (permission: keyof Permissions) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a password map (in a real app, these would be hashed)
const passwordMap: Record<string, string> = {
  "shaheed@pulsepointcx.com": "Shaheed1!",
  "admin@pulsepointcx.com": "admin123",
  "manager@pulsepointcx.com": "manager123",
  "evaluator@pulsepointcx.com": "evaluator123",
  "viewer@pulsepointcx.com": "viewer123",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    // In a real app, this would be a server request with proper authentication
    const correctPassword = passwordMap[email];
    
    if (correctPassword && correctPassword === password) {
      const user = users.find((u) => u.email === email);
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem("currentUser", JSON.stringify(user));
        return user;
      }
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
  };

  const addUser = (newUser: Omit<User, "id" | "permissions">) => {
    if (!currentUser?.permissions.canManageUsers) return;
    
    const user: User = {
      ...newUser,
      id: Date.now().toString(),
      permissions: rolePermissions[newUser.role],
    };
    
    setUsers((prevUsers) => [...prevUsers, user]);
    // In a real app, we would also add the user to the passwordMap with a hashed password
  };

  const updateUser = (id: string, updates: Partial<Omit<User, "id" | "permissions">>) => {
    if (!currentUser?.permissions.canManageUsers) return;
    
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === id) {
          const updatedUser = {
            ...user,
            ...updates,
          };
          
          // Update permissions if role changed
          if (updates.role && updates.role !== user.role) {
            updatedUser.permissions = rolePermissions[updates.role];
          }
          
          return updatedUser;
        }
        return user;
      })
    );
  };

  const deleteUser = (id: string) => {
    if (!currentUser?.permissions.canManageUsers) return;
    
    // Prevent deleting yourself
    if (currentUser?.id === id) return;
    
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const hasPermission = (permission: keyof Permissions): boolean => {
    if (!currentUser) return false;
    return currentUser.permissions[permission];
  };

  const value = {
    currentUser,
    users,
    login,
    logout,
    addUser,
    updateUser,
    deleteUser,
    hasPermission,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
