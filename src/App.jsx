// import AppLayout from './layout/AppLayout';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* <Route index element={<DetailPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
