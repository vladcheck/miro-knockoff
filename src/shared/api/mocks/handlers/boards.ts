import { HttpResponse } from "msw";
import type { ApiSchemas } from "@/shared/api/schema";
import { http } from "../http";
import { verifyTokenOrThrow } from "../../session";

const boards: ApiSchemas["Board"][] = [
  { id: "board-1", name: "Markering Campaign" },
  { id: "board-2", name: "Product Roadmap" },
];

export const boardsHandlers = [
  http.get("/boards", async (ctx) => {
    await verifyTokenOrThrow(ctx.request);

    return HttpResponse.json(boards);
  }),
  http.post("/boards", async (ctx) => {
    await verifyTokenOrThrow(ctx.request);
    const data = await ctx.request.json();

    const board = {
      id: crypto.randomUUID(),
      name: data.name,
    };
    boards.push(board);

    return HttpResponse.json(board);
  }),
  http.delete("/boards/{bid}", async (ctx) => {
    await verifyTokenOrThrow(ctx.request);
    const { bid } = ctx.params;
    const index = boards.findIndex((b) => b.id === bid);
    boards.splice(index, 1);

    if (index === -1) {
      return HttpResponse.json(
        {
          message: "Board not found",
          code: 404,
        },
        {
          status: 404,
        },
      );
    }
    return HttpResponse.json({ message: "Board deleted", code: 200 });
  }),
];
