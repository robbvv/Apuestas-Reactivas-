import type { UserData } from "./user";

export type EventOption = {
    name: string;
    payout: number;
}

export type EventData = {
    id: string;
    title: string;
    organizer: string;
    email: string;
    description: string;
    sport: string;
    location: string;
    date: string;
    createdAt: string;
    updatedAt: string | null;
    minBet: number;
    pool: number;
    betsCount: number;
    options: EventOption[];
    owner: Partial<UserData>;
    participants: string[];
    status: "open" | "locked" | "resolved";
    winningOption?: string | null;
}

