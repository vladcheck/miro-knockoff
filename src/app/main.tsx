import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";

async function enableMocking() {
  if (import.meta.env.PROD) return;

  const { worker } = await import("@/shared/api/mocks/browser");
  return worker.start();
}

enableMocking().then(() => {
  const rootEl = document.querySelector("#root");
  if (rootEl) {
    const root = createRoot(rootEl);
    root.render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    );
  }
});
