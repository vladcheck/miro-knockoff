import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import type { ReactNode } from "react";

export default function AuthLayout({
  title,
  description,
  form,
  footer,
}: {
  title: ReactNode;
  description: ReactNode;
  form: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="grow flex flex-col justify-center items-center pt-50 p-4">
      <Card className="w-full max-w-100 p-4">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary">
            {footer}
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
