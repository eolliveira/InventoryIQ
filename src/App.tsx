import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import License from './pages/License/License';
import Mobile from './pages/Mobile/Mobile';
import Nobreak from './pages/Nobreak/Nobreak';
import Printer from './pages/Printer/PrinterData';
import User from './pages/User/User';
import WorkstationList from './pages/Workstation/WorkstationList';
import Workstation from './pages/Workstation/Workstation';
import Login from './pages/Login/Login';
import Layout from './pages/Layout/Layout';
import { AuthContext, AuthContextData } from './contexts/AuthContext';
import { useState } from 'react';

export default function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* ele ta acaindo aqui mais sempre vai cair no login pq o isAuthticated nn muda se não der refrash */}
        {/* <Route path="/" element={isAuthenticated() ? <Layout /> : <Navigate to="/login" replace />}> */}
        <Route path="/" element={<Layout /> } >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="workstation" element={<WorkstationList />} />
          <Route path="workstation/:id" element={<Workstation />} />
          <Route path="license" element={<License />} />
          <Route path="mobile" element={<Mobile />} />
          <Route path="nobreak" element={<Nobreak />} />
          <Route path="printer" element={<Printer />} />
          <Route path="user" element={<User />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}
