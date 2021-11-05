import mongoose from "mongoose";

export interface TokenDoc extends mongoose.Document {
  token: string;
  user: mongoose.ObjectId;
  exp: number; // Unix time
}

const TokenSchema = new mongoose.Schema<TokenDoc>({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  exp: {
    type: Number,
    required: true,
  },
});

export const Token = mongoose.model<TokenDoc>("Token", TokenSchema);
