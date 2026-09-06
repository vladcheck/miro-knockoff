import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/session";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { session } = useSession();

  if (!session) {
    return <Navigate to={ROUTES.Login} />;
  }

  return <Outlet />;
}
