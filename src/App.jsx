import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import DetailPage from './pages/DetailPage';
import DoctorPage from './pages/DoctorPage';
import Signup from './components/Signup';
import LoginPage from './components/user/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/auth/sign_in" element={<LoginPage />} />
      <Route path="/auth/register" element={<Signup />} />
      <Route path="/" element={<ProtectedRoute component={AppLayout} />}>
        <Route index element={<DetailPage />} />
        <Route path="/reserve" element={<DoctorPage />} />
        <Route path="/detailsPage/:id" element={<DetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
