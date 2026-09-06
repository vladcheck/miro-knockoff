import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { enableMocking } from "@/shared/api/mocks/enableMocking";

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
