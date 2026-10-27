import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import AlmoghaniLayout from "./components/AlmoghaniLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import {
  ContentManagement,
  DashboardOverview,
  LivePage,
  NotificationsPage,
  SupportPage,
  SystemSettings,
  UsersSubscriptions,
} from "./pages/ControlPages";

function Router() {
  return (
    <AlmoghaniLayout>
      <Switch>
        <Route path="/" component={DashboardOverview} />
        <Route path="/live" component={LivePage} />
        <Route path="/content" component={ContentManagement} />
        <Route path="/users" component={UsersSubscriptions} />
        <Route path="/notifications" component={NotificationsPage} />
        <Route path="/support" component={SupportPage} />
        <Route path="/settings" component={SystemSettings} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </AlmoghaniLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster position="top-center" richColors />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
