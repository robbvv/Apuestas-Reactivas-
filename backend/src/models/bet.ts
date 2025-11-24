import mongoose, { Schema } from "mongoose";

export interface IOption {
  name: string;
  payout: number;
}

interface IBet {
  title: string;
  organizer: string;
  email: string;
  description: string;
  sport: string;
  location: string;
  date: Date;
  createdAt: Date;
  updatedAt?: Date | null;
  minBet: number;
  pool: number;
  betsCount: number;
  options: IOption[];
  owner: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  status: "open" | "locked" | "resolved";
  winningOption?: string | null;
}

const optionSchema = new Schema<IOption>({
  name: { type: String, required: true },
  payout: { type: Number, required: true, min: 1 }
});

const betSchema = new Schema<IBet>({
  title: { type: String, required: true },
  organizer: { type: String, required: true },
  email: { type: String, },
  description: { type: String, required: true },
  sport: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  minBet: { type: Number, required: true },
  pool: { type: Number, },
  betsCount: { type: Number, },
  options: { type: [optionSchema], required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  status: { type: String, enum: ["open", "locked", "resolved"], default: "open" },
  winningOption: { type: String },
});

betSchema.set("toJSON", {
  transform: (
    _,
    returnedObject: {
      id?: string;
      _id?: mongoose.Types.ObjectId;
      __v?: number;
    }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Bet = mongoose.model<IBet>("Bet", betSchema);

export default Bet;