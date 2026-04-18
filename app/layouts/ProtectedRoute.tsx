import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../../stores/authStore";

export function ProtectedRoute() {
  const isAuth = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  return isAuth() ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
}
