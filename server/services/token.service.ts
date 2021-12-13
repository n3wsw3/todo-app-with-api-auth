import { User, UserDoc } from "../models/user.model";
import { v4 as UUIDv4 } from "uuid";
import { Token, TokenDoc } from "../models/token.model";
import { ObjectId } from "mongoose";

/**
 * Generates a token used as an ACCESS token.
 *
 * Does NOT make sure it is the only token with that uuid.
 *
 * TODO: Check to make sure no other tokens has the same uuid.
 * @returns UUIDv4 token
 */
export const generateToken = (): string => {
  return UUIDv4();
};

/**
 * Retrieves the user from the database whose token it is.
 *
 * If the token does not exist in the database or if it is
 * expired, null will be returned.
 * Otherwise, if the token exist, the user will be returned.
 */
export const userFromToken = async (token: string): Promise<UserDoc | null> => {
  const t = await Token.findOne({ token });
  if (!t || t.exp < Date.now()) {
    return null;
  }
  return await User.findById(t.user);
};

export const storeToken = async (
  token: string,
  userId: ObjectId,
  exp: number
): Promise<TokenDoc> => {
  return await Token.create({
    token,
    user: userId,
    exp,
  });
};

export const createAuthenticationTokens = (
  user: UserDoc
): { token: string; expires: number } => {
  // 30 days from now
  const expires = Date.now() + 30 * 24 * 60 * 60 * 1000;
  const token = generateToken();

  storeToken(token, user.id, expires);

  return {
    token,
    expires,
  };
};
