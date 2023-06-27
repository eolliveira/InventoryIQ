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
import NobreakData from './pages/Nobreak/NobreakData';
import LicenseData from './pages/License/LicenseData';
import Register from './pages/Register';
import PrinterList from './pages/Printer/PrinterList';
import PrinterData from './pages/Printer/PrinterData';
import NobreakList from './pages/Nobreak/NobreakList';

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
            <Route path="mobile" element={<Mobile />} />
            <Route path="workstation" element={<WorkstationList />} />
            <Route
              path="workstation/:workstationId"
              element={<WorkstationData />}
            />
            <Route path="license" element={<LicenseList />} />
            <Route path="license/:licenseId" element={<LicenseData />} />
            <Route path="printer" element={<PrinterList />} />
            <Route path="printer/:printerId" element={<PrinterData />} />
            <Route path="nobreak/" element={<NobreakList />} />
            <Route path="nobreak/:nobreakId" element={<NobreakData />} />
          </Route>
        </Routes>
      </FormContext.Provider>
    </AuthContext.Provider>
  );
}
