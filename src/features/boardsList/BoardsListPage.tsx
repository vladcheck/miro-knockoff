import { href, Link } from "react-router";
import { ROUTES } from "@/shared/model/routes";
import { rqClient } from "@/shared/api/instance";
import { CONFIG } from "@/shared/model/config";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

function BoardsListPage() {
  const formRef = useRef<HTMLFormElement>(null!);
  const queryClient = useQueryClient();
  const boardsQuery = rqClient.useQuery("get", "/boards");

  const createBoardMutation = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions("get", "/boards"));
    },
  });
  const deleteBoardMutation = rqClient.useMutation("delete", "/boards/{bid}", {
    onSettled: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions("get", "/boards"));
    },
  });

  return (
    <div>
      <h1>Boards list {CONFIG.API_BASE_URL}</h1>

      <form
        ref={formRef}
        action="post"
        onSubmit={(e) => {
          if (!formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
          }
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          createBoardMutation.mutate({
            body: { name: formData.get("name") as string },
          });
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" minLength={1} maxLength={100} />
        </div>
        <button type="submit" disabled={createBoardMutation.isPending}>
          Create board
        </button>
      </form>

      <ul>
        {boardsQuery.data?.map((b) => (
          <li key={b.id}>
            <Link to={href(ROUTES.Board, { bid: b.id })}>{b.name}</Link>
            <button
              disabled={deleteBoardMutation.isPending}
              onClick={() =>
                deleteBoardMutation.mutate({
                  params: { path: { bid: b.id } },
                })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Component = BoardsListPage;
