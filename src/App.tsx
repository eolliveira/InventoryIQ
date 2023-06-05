import { Route, Routes } from 'react-router-dom';

import { AuthContext, AuthContextData } from './contexts/AuthContext';
import { useState } from 'react';
import { FormContext, FormContextData } from './contexts/FormContext';
import WorkstationList from './pages/Workstation/WorkstationList';
import WorkstationData from './pages/Workstation/WorkstationData';
import Login from './pages/Login';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import LicenseList from './pages/License/LicenseList';
import Mobile from './pages/Mobile';
import Nobreak from './pages/Nobreak';
import Printer from './pages/Printer';

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
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="workstation" element={<WorkstationList />} />
            <Route
              path="workstation/:workstationId"
              element={<WorkstationData />}
            />
            <Route path="license" element={<LicenseList />} />
            <Route path="mobile" element={<Mobile />} />
            <Route path="nobreak" element={<Nobreak />} />
            <Route path="printer" element={<Printer />} />
          </Route>
        </Routes>
      </FormContext.Provider>
    </AuthContext.Provider>
  );
}
