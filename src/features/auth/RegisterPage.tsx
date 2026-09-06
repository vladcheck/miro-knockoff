import { Link } from "react-router";
import { ROUTES } from "@/shared/model/routes";
import { AuthLayout } from "./ui/AuthLayout";
import { RegisterForm } from "./ui/RegisterForm";

function RegisterPage() {
  return (
    <AuthLayout
      title="Зарегистрироваться"
      description="Введите ваши данные для регистрации в системе"
      form={<RegisterForm />}
      footer={
        <>
          Есть аккаунт? <Link to={ROUTES.Login}>Войдите</Link>
        </>
      }
    />
  );
}

export const Component = RegisterPage;
