import "./index.css";
import { Outlet } from "react-router";
import { Providers } from "./Providers";

export function App() {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col">
        <Outlet />
      </div>
    </Providers>
  );
}
