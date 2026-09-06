import { http } from "../http";
import type { ApiSchemas } from "../../schema";
import { delay, HttpResponse } from "msw";
import { createRefreshTokenCookie, generateTokens, verifyToken } from "../../session";

class UserNotFoundError extends Error {
  constructor() {
    super("Пользователь не найден");
  }
}

const mockUsers: ApiSchemas["User"][] = [
  { id: "1", email: "admin@gmail.com" },
  { id: "2", email: "non_admin@gmail.com" },
];

const userPasswords = new Map<string, string>();
userPasswords.set("admin@gmail.com", "123456123456123456");
userPasswords.set("non_admin@gmail.com", "123456123456123456");

export const authHandlers = [
  http.post("/auth/register", async ({ request }) => {
    const body = await request.json();

    await delay();

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

    const { accessToken, refreshToken } = await generateTokens({
      userId: newUser.id,
      email: newUser.email,
    });

    return HttpResponse.json(
      {
        accessToken,
        user: newUser,
      },
      {
        status: 201,
        headers: {
          "Set-Cookie": createRefreshTokenCookie(refreshToken),
        },
      },
    );
  }),
  http.post("/auth/login", async ({ request }) => {
    const body = await request.json();
    const user = mockUsers.find((u) => u.email === body.email);
    const storedPassword = userPasswords.get(body.email);

    await delay();

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

    const { accessToken, refreshToken } = await generateTokens({
      userId: user.id,
      email: user.email,
    });

    return HttpResponse.json(
      {
        accessToken,
        user,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": createRefreshTokenCookie(refreshToken),
        },
      },
    );
  }),
  http.post("/auth/refresh", async ({ cookies }) => {
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return HttpResponse.json(
        {
          message: "Refresh token не найден",
          code: 401,
        },
        { status: 401 },
      );
    }

    try {
      const session = await verifyToken(refreshToken);
      const user = mockUsers.find((u) => u.id === session.userId);

      if (!user) {
        throw new UserNotFoundError();
      }

      const { accessToken, refreshToken: newRefreshToken } = await generateTokens({
        userId: user.id,
        email: user.email,
      });

      await delay();

      return HttpResponse.json(
        {
          user,
          accessToken,
        },
        {
          status: 200,
          headers: {
            "Set-Cookie": createRefreshTokenCookie(newRefreshToken),
          },
        },
      );
    } catch (err: unknown) {
      console.error("Error refreshing token:", err);
      return HttpResponse.json(
        {
          message: "Недействительный refresh token",
          code: 401,
        },
        { status: 401 },
      );
    }
  }),
];
