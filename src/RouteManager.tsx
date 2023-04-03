import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import WorkstationList from './pages/Workstation/WorkstationList';
import WorkstationData from './pages/Workstation/WorkstationData';
import License from './pages/License/License';
import Mobile from './pages/Mobile/Mobile';
import Nobreak from './pages/Nobreak/Nobreak';
import Printer from './pages/Printer/PrinterList';
import User from './pages/User/User';
import Login from './pages/Login/Login';

export default function RouteManager() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/workstation" element={<WorkstationList />} />
      <Route path="/workstation/:id" element={<WorkstationData />} />
      <Route path="/license" element={<License />} />
      <Route path="/mobile" element={<Mobile />} />
      <Route path="/nobreak" element={<Nobreak />} />
      <Route path="/printer" element={<Printer />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
}
