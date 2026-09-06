import { enableMocking } from "@/shared/api/mocks/enableMocking";
import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/session";
import { Navigate, Outlet, redirect } from "react-router";

export function ProtectedRoute() {
  const { session } = useSession();

  if (!session) {
    return <Navigate to={ROUTES.Login} />;
  }

  return <Outlet />;
}

export async function protectedLoader() {
  await enableMocking();
  const token = await useSession.getState().refreshToken();

  if (!token) {
    return redirect(ROUTES.Login);
  }

  return null;
}
