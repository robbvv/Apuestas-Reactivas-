import mongoose, { Schema } from "mongoose";


interface IUserBet {
  betId: mongoose.Types.ObjectId;
  option: string;                 
  amount: number;                 
  placedAt: Date;                  
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  bets: IUserBet[];
  ownBets: mongoose.Types.ObjectId[];
  coins: number;
};

const userBetSchema = new Schema<IUserBet>({
  betId: { type: mongoose.Schema.Types.ObjectId, ref: "Bet", required: true },
  option: { type: String, required: true },
  amount: { type: Number, required: true },
  placedAt: { type: Date, default: Date.now }
});

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, },
  email: { type: String , required: true, unique: true, },
  passwordHash: { type: String, required: true, },
  bets: {  type: [userBetSchema]  },
  ownBets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bet",
    },
  ],
  coins: { type: Number, default: 0 }
});

const User  = mongoose.model<IUser>("User", userSchema);

userSchema.set("toJSON", {
  transform: (
    _,
    returnedObject: {
      id?: string;
      _id?: mongoose.Types.ObjectId;
      __v?: number;
      passwordHash?: string;
    }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export default User;