import { Item } from './interfaces/item.interface';
export declare function findOccuringWords(arr: any[], limit: number): string[];
export declare class NewsService {
    constructor();
    findSingleStory(id: number, index: number): Promise<Item>;
    findSingleStoryWithinWeek(id: number, index: number): Promise<Item>;
    fetchNewStories(limit: number): Promise<Item[]>;
    fetchNewStoriesByLastWeek(): Promise<Item[]>;
    fetchUsers(id: string): Promise<Item[]>;
    fetchNewStoriesByKarmaUsers(): Promise<Item[]>;
}
