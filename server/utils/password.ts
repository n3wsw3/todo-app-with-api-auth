/**
 * All helper functions for generating password.
 * These are the only functions to be used when generating
 * and verifying password hashes.
 */
import argon from "argon2";
const { hash, argon2id, verify } = argon;

const OPTIONS = {
  saltLength: 16,
  hashLength: 32,
  secret: Buffer.from(process.env.pepper ?? "Test"),
  parallelism: 1,
  timeCost: 3, // Iteration count
  memoryCost: 1 << 11,
  type: argon2id,
};

export const generatePasswordHash = (password: string) => {
  return argonHash(password);
};

export const isPasswordMatch = async (argonhash: string, password: string) => {
  return await verify(argonhash, password, OPTIONS);
};

const argonHash = (password: string) => {
  return hash(password, OPTIONS);
};
