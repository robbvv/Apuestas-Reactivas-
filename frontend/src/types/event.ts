export type EventData = {
    id: number;
    title: string;
    organizer: string;
    email: string;
    description: string;
    sport: string;
    location: string;
    date: string;
    createdAt: string;
    updatedAt: string | null;
    stars: number;
    minBet: number;
    pool: number;
    betsCount: number;
}