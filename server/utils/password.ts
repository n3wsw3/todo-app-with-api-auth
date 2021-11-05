/**
 * All helper functions for generating password.
 * These are the only functions to be used when generating
 * and verifying password hashes.
 */
import { createHmac, scryptSync, randomBytes, timingSafeEqual } from "crypto";

export const generatePepperedPassword = (password: string): string => {
  return createHmac("sha256", process.env.pepper ?? "Test")
    .update(password)
    .digest("base64");
};

export const generatePasswordHash = (
  password: string,
  salt: string = randomBytes(16).toString("hex")
): string => {
  const hashedPassword = scryptSync(
    generatePepperedPassword(password),
    salt,
    64
  ).toString("base64");

  return `${salt}:${hashedPassword}`;
};

export const isPasswordMatch = (hash: string, password: string): boolean => {
  const [salt, key] = hash.split(":");
  const [_, testKey] = generatePasswordHash(password, salt).split(":");

  const keyBuffer = Buffer.from(key, "base64");
  const testKeyBuffer = Buffer.from(testKey, "base64");

  return (
    keyBuffer.length === testKeyBuffer.length &&
    timingSafeEqual(keyBuffer, testKeyBuffer)
  );
};
