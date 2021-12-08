import mongoose from "mongoose";
import validator from "validator";
import { generatePasswordHash, isPasswordMatch } from "../utils/password";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface UserDoc extends IUser, mongoose.Document {
  isPasswordMatch: (password: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema<UserDoc>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: (value: string) => {
        return new Promise((resolve, reject) => {
          if (!validator.isEmail(value)) {
            reject(new Error("Email validation failed"));
          }
          resolve(true);
        });
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate: (/*value: string*/) => {
        // TODO: Maybe add requirements for passwords?
        Promise.resolve(true);
      },
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

/**
 * Every time the password field is updated in the user document
 * and then saved to the database, it will automatically convert
 * the plaintext password to the password hash.
 *
 * This means you should never call generatePasswordHash when
 * updating the password for a user. This will cause the password
 * to be double hashed.
 */
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await generatePasswordHash(this.password);
  }
  next();
});

UserSchema.methods.isPasswordMatch = async function (password: string) {
  return await isPasswordMatch(this.password, password);
};

export const User: mongoose.Model<UserDoc> = mongoose.model<UserDoc>(
  "User",
  UserSchema
);
