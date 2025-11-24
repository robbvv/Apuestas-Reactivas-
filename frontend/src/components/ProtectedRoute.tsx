import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = () => {
  const { user, restoreLogin } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await restoreLogin();  
      setLoading(false);
    };
    init();
  }, [restoreLogin]);

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;