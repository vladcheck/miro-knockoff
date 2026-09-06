import { rqClient } from "@/shared/api/instance";
import type { ApiSchemas } from "@/shared/api/schema";
import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/session";
import { useNavigate } from "react-router";

export default function useRegister() {
  const navigate = useNavigate();
  const session = useSession();

  const registerMutation = rqClient.useMutation("post", "/auth/register", {
    onSuccess(data) {
      session.login(data.accessToken);
      navigate(ROUTES.Home);
    },
  });

  const register = (data: ApiSchemas["RegisterRequest"]) => {
    registerMutation.mutate({ body: data });
  };

  const errorMessage = registerMutation.isError ? registerMutation.error.message : null;

  return {
    register,
    isPending: registerMutation.isPending,
    errorMessage,
  };
}
