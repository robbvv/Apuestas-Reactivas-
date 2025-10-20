import mongoose, { Schema } from "mongoose";

interface IOption {
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
  stars: number;
  minBet: number;
  pool: number;
  betsCount: number;
  options: IOption[];
}

const optionSchema = new Schema<IOption>({
  name: { type: String, required: true },
  payout: { type: Number, required: true }
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
  stars: { type: Number, },
  minBet: { type: Number, required: true },
  pool: { type: Number, },
  betsCount: { type: Number, },
  options: { type: [optionSchema], required: true },
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