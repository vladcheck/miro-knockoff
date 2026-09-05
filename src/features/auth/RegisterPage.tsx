import { rqClient } from "@/shared/api/instance";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router";
import { ROUTES } from "@/shared/model/routes";

function RegisterPage() {
  const registerMutation = rqClient.useMutation("post", "/auth/register");

  return (
    <AuthLayout
      title="Зарегистрироваться"
      description="Введите ваши данные для регистрации в системе"
      form={<form method="post"></form>}
      footer={
        <>
          Есть аккаунт? <Link to={ROUTES.Login}>Войдите</Link>
        </>
      }
    />
  );
}

export const Component = RegisterPage;
