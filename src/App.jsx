import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import DetailPage from './pages/DetailPage';
import DoctorPage from './pages/DoctorPage';
import Signup from './components/Signup';
import LoginPage from './components/user/LoginPage';
import HomePage from './pages/HomePage';
import UserReserve from './pages/UserReserve';
import Reservations from './pages/Reservations';
import DeleteDoctorPage from './pages/DeleteDoctorPage';

function App() {
  return (
    <Routes>
      <Route path="/auth/sign_in" element={<LoginPage />} />
      <Route path="/auth/register" element={<Signup />} />
      <Route path="/" element={<ProtectedRoute component={AppLayout} />}>
        <Route index element={<HomePage />} />
        <Route path="/add-doctor" element={<DoctorPage />} />
        <Route path="/detailsPage/:id" element={<DetailPage />} />
        <Route path="/reserve-doctor" element={<UserReserve />} />
        <Route path="/my-reservations" element={<Reservations />} />
        <Route path="/delete-doctor" element={<DeleteDoctorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
