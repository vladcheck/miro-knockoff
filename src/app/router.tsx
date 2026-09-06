import { createBrowserRouter, redirect } from "react-router";
import { ROUTES } from "@/shared/model/routes";
import { App } from "./App";
import { ProtectedRoute, protectedLoader } from "@/shared/model/ProtectedRoute";
import { AppHeader } from "@/features/header/AppHeader";

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        element: (
          <>
            <AppHeader />
            <ProtectedRoute />
          </>
        ),
        loader: protectedLoader,
        children: [
          {
            path: ROUTES.Boards,
            lazy: async () => import("@/features/boardsList/BoardsListPage"),
          },
          {
            path: ROUTES.Board,
            lazy: async () => import("@/features/board/BoardPage"),
          },
        ],
      },
      {
        path: ROUTES.Login,
        lazy: async () => import("@/features/auth/LoginPage"),
      },
      {
        path: ROUTES.Register,
        lazy: async () => import("@/features/auth/RegisterPage"),
      },
      {
        path: ROUTES.Home,
        loader: async () => redirect(ROUTES.Boards),
      },
    ],
  },
]);
