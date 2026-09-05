export const ROUTES = {
  Home: "/",
  Register: "/register",
  Login: "/login",
  Board: "/b/:bid",
  Boards: "/boards",
} as const;

export type PathParams = {
  [ROUTES.Board]: {
    bid: string;
  };
};

declare module "react-router" {
  interface Register {
    params: PathParams;
  }
}
