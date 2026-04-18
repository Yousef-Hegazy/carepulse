import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../../stores/authStore";

export function ProfileNeededRoute() {
  const profile = useAuthStore((s) => s.profile);
  const location = useLocation();

  return profile ? <Outlet /> : <Navigate to="/auth-success" state={{ from: location }} replace />;
}
