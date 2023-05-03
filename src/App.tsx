import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import License from './pages/License/License';
import Mobile from './pages/Mobile/Mobile';
import Nobreak from './pages/Nobreak/Nobreak';
import Printer from './pages/Printer/PrinterData';
import User from './pages/User/User';
import WorkstationList from './pages/Workstation/WorkstationList/WorkstationList';
import WorkstationData from './pages/Workstation/WorkstationData/WorkstationData';
import Login from './pages/Login/Login';
import Layout from './pages/Layout/Layout';
import { AuthContext, AuthContextData } from './contexts/AuthContext';
import { useState } from 'react';
import { FormContext, FormContextData } from './contexts/FormContext';

export default function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  const [formContextData, setFormContextData] = useState<FormContextData>({
    isAdding: false,
    isEditing: false,
  });

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <FormContext.Provider value={{ formContextData, setFormContextData }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* ele ta acaindo aqui mais sempre vai cair no login pq o isAuthticated nn muda se não der refrash */}
          {/* <Route path="/" element={isAuthenticated() ? <Layout /> : <Navigate to="/login" replace />}> */}
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="workstation" element={<WorkstationList />} />
            <Route
              path="workstation/:workstationId"
              element={<WorkstationData />}
            />
            {/* verificar se dessa forma esta correto? */}
            <Route path="workstation/create" element={<WorkstationData />} />
            <Route path="license" element={<License />} />
            <Route path="mobile" element={<Mobile />} />
            <Route path="nobreak" element={<Nobreak />} />
            <Route path="printer" element={<Printer />} />
            <Route path="user" element={<User />} />
          </Route>
        </Routes>
      </FormContext.Provider>
    </AuthContext.Provider>
  );
}
