import { CONFIG } from "@/shared/model/config";
import createClient from "openapi-react-query";
import createFetchClient from "openapi-fetch";
import type { ApiPaths } from "./schema";

export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export const rqClient = createClient(fetchClient);
