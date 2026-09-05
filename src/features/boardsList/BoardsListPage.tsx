import { href, Link } from "react-router";
import { ROUTES } from "@/shared/model/routes";
import { rqClient } from "@/shared/api/instance";
import { CONFIG } from "@/shared/model/config";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";

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
    <div className="container mx-auto p-4">
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
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" id="name" minLength={1} maxLength={100} />
        </div>
        <Button type="submit" disabled={createBoardMutation.isPending}>
          Create board
        </Button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {boardsQuery.data?.map((b) => (
          <Card key={b.id}>
            <CardHeader>
              <Button variant="link">
                <Link to={href(ROUTES.Board, { bid: b.id })}>{b.name}</Link>
              </Button>
            </CardHeader>
            <CardFooter>
              <Button
                variant="destructive"
                disabled={deleteBoardMutation.isPending}
                onClick={() =>
                  deleteBoardMutation.mutate({
                    params: { path: { bid: b.id } },
                  })
                }
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export const Component = BoardsListPage;
