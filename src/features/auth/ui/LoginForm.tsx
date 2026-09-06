import { Button } from "@/shared/ui/kit/button";
import { Field, FieldError, FieldLabel } from "@/shared/ui/kit/field";
import { Input } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "../model/useLogin";

const formSchema = z.object({
  email: z.email("Почта обязательна"),
  password: z.string("Пароль обязателен"),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const { errorMessage, isPending, login } = useLogin();

  const onSubmit = form.handleSubmit(login);

  return (
    <form method="post" className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Почта</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="example@gmail.com"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Пароль</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="password"
              aria-invalid={fieldState.invalid}
              placeholder="************"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {errorMessage && <p className="text-destructive text-sm">{errorMessage}</p>}
      <Button type="submit" disabled={isPending}>
        Войти
      </Button>
    </form>
  );
}
