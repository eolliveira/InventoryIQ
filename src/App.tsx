import { Navigate, Route, Routes } from 'react-router-dom';
import { isAuthenticated } from './http/requests';
import Dashboard from './pages/Dashboard/Dashboard';
import License from './pages/License/License';
import Mobile from './pages/Mobile/Mobile';
import Nobreak from './pages/Nobreak/Nobreak';
import Printer from './pages/Printer/PrinterData';
import User from './pages/User/User';
import WorkstationList from './pages/Workstation/WorkstationList';
import WorkstationData from './pages/Workstation/WorkstationData';
import Login from './pages/Login/Login';
import Layout from './pages/Layout/Layout';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* ele ta acaindo aqui mais sempre vai cair no login pq o isAuthticated nn muda se não der refrash */}
      <Route path="/" element={ isAuthenticated() ? ( <Layout /> ) : ( <Navigate to="/login" replace />) }>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="workstation" element={<WorkstationList />} />
        <Route path="workstation/:id" element={<WorkstationData />} />
        <Route path="license" element={<License />} />
        <Route path="mobile" element={<Mobile />} />
        <Route path="nobreak" element={<Nobreak />} />
        <Route path="printer" element={<Printer />} />
        <Route path="user" element={<User />} />
      </Route>
    </Routes>
  );
}