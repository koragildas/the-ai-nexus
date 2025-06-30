
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import Index from '@/pages/Index';
import Categories from '@/pages/Categories';
import CategoryDetail from '@/pages/CategoryDetail';
import Popular from '@/pages/Popular';
import AIToolDetail from '@/pages/AIToolDetail';
import SubmitTool from '@/pages/SubmitTool';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import SuperAdmin from '@/pages/SuperAdmin';
import Advertise from '@/pages/Advertise';
import LegalMentions from '@/pages/LegalMentions';
import NotFound from '@/pages/NotFound';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <FavoritesProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categorie/:categorySlug" element={<CategoryDetail />} />
                  <Route path="/populaires" element={<Popular />} />
                  <Route path="/outil/:toolSlug" element={<AIToolDetail />} />
                  <Route path="/soumettre-outil" element={<SubmitTool />} />
                  <Route path="/a-propos" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/super-admin" element={
                    <ProtectedRoute adminOnly>
                      <SuperAdmin />
                    </ProtectedRoute>
                  } />
                  <Route path="/publicite" element={<Advertise />} />
                  <Route path="/mentions-legales" element={<LegalMentions />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </div>
            </Router>
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
