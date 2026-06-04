import { Switch, Route, Router as WouterRouter } from "wouter";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Volunteer from "@/pages/Volunteer";
import Juniors from "@/pages/Juniors";
import Register from "@/pages/Register";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";

function useHashLocation(): [string, (to: string) => void] {
  const [loc, setLoc] = useState(() => window.location.hash.slice(1) || "/");
  useEffect(() => {
    const handler = () => setLoc(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  const navigate = (to: string) => { window.location.hash = to; };
  return [loc, navigate];
}

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/volunteer" component={Volunteer} />
          <Route path="/juniors" component={Juniors} />
          <Route path="/register" component={Register} />
          <Route path="/register/signup" component={SignUp} />
          <Route path="/register/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter hook={useHashLocation}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
