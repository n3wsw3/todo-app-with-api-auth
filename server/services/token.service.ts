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
  return await User.findById({ _id: t.user });
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

  // /**
  //  * In the future we might switch to NOT using jwt. Jwt's are inherently
  //  * messier than normal session tokens with only marginally improved
  //  * performance.
  //  *
  //  * In that case we will only have an ACCESS token, since we can blacklist
  //  * and remove tokens by removing it from the database.
  //  */

  // // 30 minutes from now
  // const AccessExp = Date.now() + 30 * 60 * 1000;
  // const AccessToken = createToken(user.id, AccessExp, TokenType.ACCESS);

  // // 30 days from now
  // const RefreshExp = Date.now() + 30 * 24 * 60 * 60 * 1000;
  // const RefreshToken = createToken(user.id, AccessExp, TokenType.REFRESH);

  // /**
  //  * When the ACCESS token no longer is valid the refresh token is used to
  //  * create a new ACCESS token.
  //  *
  //  * The reasoning behind this is to be able to remove access.
  //  * If you would store the ACCESS token in the database it would negate
  //  * the performance gains of using jwt.
  //  *
  //  * Using jwt keeps us from checking against the database on every request
  //  * by storing a bit of information helping to identify the user. In out case
  //  * this is the userId. By using jwt, we only need one request to the database.
  //  *
  //  * There is a problem with this approach though. There is no way for us to
  //  * invalidate a token. Every ACCESS token we have signed that haven't gone past
  //  * the expiration date is a VALID token. To combat this we use a really low expiration
  //  * time for the ACCESS token and use a REFRESH token to generate a new ACCESS token
  //  * only when the ACCESS token has expired.
  //  *
  //  * This way, even if the ACCESS token is stolen, the token won't be valid for much longer.
  //  * And if we want to invalidate an ACCESS token we can invalidate the REFRESH token.
  //  *
  //  * When a new ACCESS token is created, a new REFRESH token will also be created.
  //  * This means as long as you're sending at least one authenticated request every month
  //  * you will stay logged in.
  //  */
  // storeToken(RefreshToken, user.id, RefreshExp, TokenType.REFRESH);

  // return {
  //   access: {
  //     expires: AccessExp,
  //     token: AccessToken,
  //   },
  //   refresh: {
  //     expires: RefreshExp,
  //     token: RefreshToken,
  //   },
  // };
};
