import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { FormContext, FormContextData } from './contexts/FormContext';
import { AuthContext, AuthContextData } from './contexts/AuthContext';
import WorkstationList from './pages/Workstation/WorkstationList';
import WorkstationData from './pages/Workstation/WorkstationData';
import Login from './pages/Login';
import Layout from './pages/Layout';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AccessDenied from './pages/AccessDenied';
import MobileData from './pages/Mobile/MobileData';
import MobileList from './pages/Mobile/MobileList';
import LicenseList from './pages/License/LicenseList';
import NobreakData from './pages/Nobreak/NobreakData';
import LicenseData from './pages/License/LicenseData';
import PrinterList from './pages/Printer/PrinterList';
import PrinterData from './pages/Printer/PrinterData';
import NobreakList from './pages/Nobreak/NobreakList';
import CollectorList from './pages/Collector/CollectorList';
import CollectorData from './pages/Collector/CollectorData';

export default function App() {
  const [formContextData, setFormContextData] = useState<FormContextData>({ isAdding: false, isEditing: false });
  const [authContextData, setAuthContextData] = useState<AuthContextData>({ authenticated: false });

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <FormContext.Provider value={{ formContextData, setFormContextData }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="forbidden" element={<AccessDenied />} />
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="register" element={<Register />} />
            <Route path="workstation" element={<WorkstationList />} />
            <Route path="workstation/:workstationId" element={<WorkstationData />} />
            <Route path="license" element={<LicenseList />} />
            <Route path="license/:licenseId" element={<LicenseData />} />
            <Route path="printer" element={<PrinterList />} />
            <Route path="printer/:printerId" element={<PrinterData />} />
            <Route path="nobreak/" element={<NobreakList />} />
            <Route path="nobreak/:nobreakId" element={<NobreakData />} />
            <Route path="mobile/" element={<MobileList />} />
            <Route path="mobile/:deviceId" element={<MobileData />} />
            <Route path="collector/" element={<CollectorList />} />
            <Route path="collector/:collectorId" element={<CollectorData />} />
          </Route>
        </Routes>
      </FormContext.Provider>
    </AuthContext.Provider>
  );
}
