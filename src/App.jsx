import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import DetailPage from './pages/DetailPage';
import DoctorPage from './pages/DoctorPage';

function App() {
  return (
    <Routes>
      <Route path="auth/signin" />
      <Route path="/" element={<ProtectedRoute component={AppLayout} />}>
        <Route index element={<DetailPage />} />
        <Route path="/reserve" element={<DoctorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
