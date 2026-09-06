import { ROUTES } from "@/shared/model/routes";
import { Link } from "react-router";
import AuthLayout from "./ui/AuthLayout";
import LoginForm from "./ui/LoginForm";

function LoginPage() {
  return (
    <AuthLayout
      title="Войти в систему"
      description="Введите ваши данные для входа в систему"
      form={<LoginForm />}
      footer={
        <>
          Нет аккаунта? <Link to={ROUTES.Register}>Зарегистрируйтесь</Link>
        </>
      }
    />
  );
}

export const Component = LoginPage;
