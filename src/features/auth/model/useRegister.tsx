import { rqClient } from "@/shared/api/instance";
import type { ApiSchemas } from "@/shared/api/schema";
import { ROUTES } from "@/shared/model/routes";
import { useNavigate } from "react-router";

export default function useRegister() {
  const navigate = useNavigate();

  const registerMutation = rqClient.useMutation("post", "/auth/register", {
    onSuccess() {
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
