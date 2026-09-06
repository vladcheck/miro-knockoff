import { jwtVerify, SignJWT } from "jose";
import { HttpResponse } from "msw";

interface Session {
  userId: string;
  email: string;
  [key: string]: string;
}

const JWT_SECRET = new TextEncoder().encode("your-secret-key");
const MAX_AGE = 604800;
const ACCESS_TOKEN_EXPIRY = "3s";
const REFRESH_TOKEN_EXPIRY = "7d";
const PROTECTED_HEADER_PARAMS = { alg: "HS256" };

export function createRefreshTokenCookie(refreshToken: string) {
  return `refreshToken=${refreshToken}; Max-Age=${MAX_AGE}`;
}

export async function generateTokens(session: Session) {
  const accessToken = await new SignJWT(session)
    .setProtectedHeader(PROTECTED_HEADER_PARAMS)
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET);

  const refreshToken = await new SignJWT(session)
    .setProtectedHeader(PROTECTED_HEADER_PARAMS)
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(JWT_SECRET);

  return { accessToken, refreshToken };
}

export async function verifyTokenOrThrow(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const session = token ? await verifyToken(token).catch(() => null) : null;
  if (!session) {
    throw HttpResponse.json(
      {
        message: "Invalid token",
        code: 401,
      },
      { status: 401 },
    );
  }
  return session;
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, JWT_SECRET);
  return payload as Session;
}
