import { rqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router";
import AuthLayout from "./AuthLayout";

function LoginPage() {
  const loginMutation = rqClient.useMutation("post", "/auth/login");

  return (
    <AuthLayout
      title="Войти в систему"
      description="Введите ваши данные для входа в систему"
      form={<form method="post"></form>}
      footer={
        <>
          Нет аккаунта? <Link to={ROUTES.Register}>Зарегистрируйтесь</Link>
        </>
      }
    />
  );
}

export const Component = LoginPage;
