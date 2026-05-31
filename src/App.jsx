import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import AnnouncementPage from './pages/AnnouncementPage';
import NdaCompliancePage from './pages/NdaCompliancePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminAnnouncementsPage from './pages/admin/AdminAnnouncementsPage';
import AdminCareersPage from './pages/admin/AdminCareersPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/announcement" element={<AnnouncementPage />} />
        <Route path="/nda-compliance" element={<NdaCompliancePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="announcements" element={<AdminAnnouncementsPage />} />
          <Route path="careers" element={<AdminCareersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
