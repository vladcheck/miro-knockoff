import { href, Link } from "react-router";
import { ROUTES } from "@/shared/model/routes";

function BoardsListPage() {
  return (
    <ul>
      <li>
        <Link to={href(ROUTES.Board, { bid: "1" })}>Board 1</Link>
      </li>
      <li>
        <Link to={href(ROUTES.Board, { bid: "2" })}>Board 2</Link>
      </li>
      <li>
        <Link to={href(ROUTES.Board, { bid: "3" })}>Board 3</Link>
      </li>
    </ul>
  );
}

export const Component = BoardsListPage;
