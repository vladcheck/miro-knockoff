import { CONFIG } from "@/shared/model/config";
import createClient from "openapi-react-query";
import createFetchClient from "openapi-fetch";
import type { ApiPaths, ApiSchemas } from "./schema";
import { useSession } from "../model/session";

export const privateFetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});
export const privateRqClient = createClient(privateFetchClient);

export const publicFetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});
export const publicRqClient = createClient(publicFetchClient);

privateFetchClient.use({
  async onRequest({ request }) {
    const token = await useSession.getState().refreshToken();

    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    } else {
      return new Response(
        JSON.stringify({
          message: "You are not authorized to access this resource",
          code: 401,
        } as ApiSchemas["Error"]),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  },
});
