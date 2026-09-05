import { useParams } from "react-router";
import { type PathParams, ROUTES } from "@/shared/model/routes";

function BoardPage() {
  const { bid } = useParams<PathParams[typeof ROUTES.Board]>();
  return <div>Board page {bid}</div>;
}

export const Component = BoardPage;
