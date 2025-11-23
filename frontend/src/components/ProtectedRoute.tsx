import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = () => {
  // Obtenemos el usuario del estado global
  const user = useAuthStore((state) => state.user);

  // Si no hay usuario logueado, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, renderizar el contenido de la ruta (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;