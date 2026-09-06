import { http } from "../http";
import type { ApiSchemas } from "../../schema";
import { delay, HttpResponse } from "msw";

const mockUsers: ApiSchemas["User"][] = [
  { id: "1", email: "admin@gmail.com" },
  { id: "2", email: "non_admin@gmail.com" },
];
const userPasswords = new Map<string, string>();
const mockTokens = new Map<string, string>();

userPasswords.set("admin@gmail.com", "123456");
userPasswords.set("non_admin@gmail.com", "123456");

export const authHandlers = [
  http.post("/auth/register", async ({ request }) => {
    const body = await request.json();

    if (mockUsers.some((u) => u.email === body.email)) {
      return HttpResponse.json(
        {
          message: "Пользователь с такой почтой уже зарегистрирован",
          code: 400,
        },
        { status: 400 },
      );
    }

    const newUser: ApiSchemas["User"] = {
      id: String(mockUsers.length + 1),
      email: body.email,
    };
    mockUsers.push(newUser);
    userPasswords.set(body.email, body.password);

    const accessToken = `mock-token-${Date.now()}`;
    mockTokens.set(body.email, accessToken);

    return HttpResponse.json(
      {
        accessToken,
        user: newUser,
      },
      { status: 201 },
    );
  }),
  http.post("/auth/register", async ({ request }) => {
    const body = await request.json();
    const user = mockUsers.find((u) => u.email === body.email);
    const storedPassword = userPasswords.get(body.email);

    await delay(100);

    if (!user) {
      return HttpResponse.json(
        {
          message: "Пользователь не найден",
          code: 404,
        },
        { status: 404 },
      );
    }

    if (!storedPassword || storedPassword !== body.password) {
      return HttpResponse.json(
        {
          message: "Неверный пароль",
          code: 401,
        },
        { status: 401 },
      );
    }

    const accessToken = `mock-token-${Date.now()}`;
    return HttpResponse.json(
      {
        accessToken,
        user,
      },
      { status: 200 },
    );
  }),
];
