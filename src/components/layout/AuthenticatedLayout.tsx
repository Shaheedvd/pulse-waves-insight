
import React from "react";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  console.log("AuthenticatedLayout rendering with children:", children);
  
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-6">
        {children}
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
