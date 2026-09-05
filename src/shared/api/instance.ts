import { CONFIG } from "@/shared/model/config";
import createClient from "openapi-react-query";
import createFetchClient from "openapi-fetch";
import type { paths } from "./schema/generated";

export const fetchClient = createFetchClient<paths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export const rqClient = createClient(fetchClient);
