export type UserBet = {
  betId: string;
  option: string;  
  amount: number;   
  placedAt: string; 
};

export type UserData = {
  id: string;
  username: string;
  email: string;
  bets: UserBet[];
  ownBets: string[];
};