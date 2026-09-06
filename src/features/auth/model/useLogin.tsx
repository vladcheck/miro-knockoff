import { rqClient } from "@/shared/api/instance";
import type { ApiSchemas } from "@/shared/api/schema";
import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/session";
import { useNavigate } from "react-router";

export default function useLogin() {
  const navigate = useNavigate();
  const session = useSession();

  const loginMutation = rqClient.useMutation("post", "/auth/login", {
    onSuccess(data) {
      session.login(data.accessToken);
      navigate(ROUTES.Home);
    },
  });

  const login = (data: ApiSchemas["LoginRequest"]) => {
    loginMutation.mutate({ body: data });
  };

  const errorMessage = loginMutation.isError ? loginMutation.error.message : null;

  return {
    login,
    isPending: loginMutation.isPending,
    errorMessage,
  };
}
