
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { ToolsProvider } from '@/contexts/ToolsContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Pages
import Index from '@/pages/Index';
import Categories from '@/pages/Categories';
import CategoryDetail from '@/pages/CategoryDetail';
import AIToolDetail from '@/pages/AIToolDetail';
import SubmitTool from '@/pages/SubmitTool';
import Popular from '@/pages/Popular';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import SuperAdmin from '@/pages/SuperAdmin';
import NotFound from '@/pages/NotFound';
import LegalMentions from '@/pages/LegalMentions';
import Advertise from '@/pages/Advertise';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <FavoritesProvider>
            <ToolsProvider>
              <Router>
                <div className="min-h-screen bg-background">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categories/:slug" element={<CategoryDetail />} />
                    <Route path="/outils/:slug" element={<AIToolDetail />} />
                    <Route path="/soumettre" element={
                      <ProtectedRoute>
                        <SubmitTool />
                      </ProtectedRoute>
                    } />
                    <Route path="/populaire" element={<Popular />} />
                    <Route path="/a-propos" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/super-admin" element={
                      <ProtectedRoute requireSuperAdmin>
                        <SuperAdmin />
                      </ProtectedRoute>
                    } />
                    <Route path="/mentions-legales" element={<LegalMentions />} />
                    <Route path="/annoncer" element={<Advertise />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Toaster />
                </div>
              </Router>
            </ToolsProvider>
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
