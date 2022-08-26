import { Item, User } from './interfaces/item.interface';
export declare function findOccuringWords(arr: any[], limit: number): string[];
export declare class NewsService {
    constructor();
    findSingleStory(id: number, index: number): Promise<Item>;
    findSingleStoryWithinWeek(id: number, index: number): Promise<Item>;
    fetchNewStories(limit: number): Promise<Item[]>;
    fetchNewStoriesByLastWeek(): Promise<Item[]>;
    fetchSingleUser(id: string): Promise<User>;
    fetchNewStoriesByKarmaUsers(): Promise<User[]>;
}
