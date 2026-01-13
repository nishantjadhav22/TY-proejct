import jwt from "jsonwebtoken";
import crypto from "crypto";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = "7d";
const REFRESH_COOKIE_NAME = "refreshToken";

const getRefreshSecret = () => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  if (!refreshSecret) {
    throw new Error("Missing JWT secret configuration");
  }
  return refreshSecret;
};

export const generateAccessToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT secret configuration");
  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL,
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, getRefreshSecret(), {
    expiresIn: REFRESH_TOKEN_TTL,
  });
};

export const hashToken = (token) =>
  crypto.createHash("sha512").update(token).digest("hex");

const buildCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const baseOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  };

  if (process.env.COOKIE_DOMAIN) {
    baseOptions.domain = process.env.COOKIE_DOMAIN;
  }

  return baseOptions;
};

export const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, buildCookieOptions());
};

export const clearRefreshTokenCookie = (res) => {
  const options = buildCookieOptions();
  res.clearCookie(REFRESH_COOKIE_NAME, {
    ...options,
    maxAge: 0,
  });
};

export const verifyRefreshToken = (token) =>
  jwt.verify(token, getRefreshSecret());

export const REFRESH_COOKIE_KEY = REFRESH_COOKIE_NAME;
