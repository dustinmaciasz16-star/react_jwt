import { BrowserRouter } from 'react-router-dom';
import './App.css'
import {AuthProvider} from './context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Perfil from './pages/Perfil';
import Registrar from './pages/Registrar';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route element={<ProtectedRoute />}>
              <Route path="/perfil" element={<Perfil />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;