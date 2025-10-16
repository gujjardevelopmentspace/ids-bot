import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import PhoneNumbers from "./pages/PhoneNumbers";
import Brand from "./pages/Brand";
import CreateBrand from "./pages/CreateBrand";
import Contacts from "./pages/Contacts";
import ContactsImport from "./pages/ContactsImport";
import ContactLabels from "./pages/ContactLabels";
import GroupsManagement from "./pages/GroupsManagement";
import Templates from "./pages/Templates";
import BroadcastCampaigns from "./pages/BroadcastCampaigns";
import ChatsInbox from "./pages/ChatsInbox";
import ReplyBots from "./pages/ReplyBots";
import WhatsAppFlows from "./pages/WhatsAppFlows";
import CommerceCatalogue from "./pages/CommerceCatalogue";
import Integrations from "./pages/Integrations";
import AgencyReseller from "./pages/AgencyReseller";
import ChatAgents from "./pages/ChatAgents";
import AgentManagement from "./pages/AgentManagement";
import WapiSettings from "./pages/WapiSettings";
import API from "./pages/API";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsAuthenticated(loggedIn);
    };
    
    checkAuth();
    
    // Listen for storage changes (in case user logs out in another tab)
    const handleStorageChange = () => checkAuth();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/phone-numbers" 
            element={
              <ProtectedRoute>
                <Layout>
                  <PhoneNumbers />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/brand" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Brand />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-brand" 
            element={
              <ProtectedRoute>
                <Layout>
                  <CreateBrand />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contacts" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Contacts />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contacts-import" 
            element={
              <ProtectedRoute>
                <Layout>
                  <ContactsImport />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contact-labels" 
            element={
              <ProtectedRoute>
                <Layout>
                  <ContactLabels />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/groups-management" 
            element={
              <ProtectedRoute>
                <Layout>
                  <GroupsManagement />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/templates" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Templates />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/broadcast-campaigns" 
            element={
              <ProtectedRoute>
                <Layout>
                  <BroadcastCampaigns />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/chats-inbox" 
            element={
              <ProtectedRoute>
                <Layout>
                  <ChatsInbox />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reply-bots" 
            element={
              <ProtectedRoute>
                <Layout>
                  <ReplyBots />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/whatsapp-flows" 
            element={
              <ProtectedRoute>
                <Layout>
                  <WhatsAppFlows />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/commerce-catalogue" 
            element={
              <ProtectedRoute>
                <Layout>
                  <CommerceCatalogue />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/integrations" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Integrations />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/agency-reseller" 
            element={
              <ProtectedRoute>
                <Layout>
                  <AgencyReseller />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/chat-agents" 
            element={
              <ProtectedRoute>
                <Layout>
                  <ChatAgents />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/agent-management" 
            element={
              <ProtectedRoute>
                <Layout>
                  <AgentManagement />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/wapi-settings" 
            element={
              <ProtectedRoute>
                <Layout>
                  <WapiSettings />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/api" 
            element={
              <ProtectedRoute>
                <Layout>
                  <API />
                </Layout>
              </ProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
