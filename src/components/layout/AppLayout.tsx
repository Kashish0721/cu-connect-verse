
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./Header";
import React from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background">
        <Header />
        <div className="flex flex-grow">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
