import { Outlet } from "react-router";
import { AppHeader } from "@/features/header";

export function App() {
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
}
