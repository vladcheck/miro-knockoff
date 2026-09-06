import "./index.css";
import { Outlet, useLocation } from "react-router";
import AppHeader from "@/features/header/AppHeader";
import { Providers } from "./Providers";
import { ROUTES } from "@/shared/model/routes";

export function App() {
  const location = useLocation();

  const isAuthPage = location.pathname === ROUTES.Login || location.pathname === ROUTES.Register;

  return (
    <Providers>
      <div className="min-h-screen flex flex-col">
        {!isAuthPage && <AppHeader />}
        <Outlet />
      </div>
    </Providers>
  );
}
