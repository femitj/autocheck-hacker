import { NewsService } from './news.service';
import { Item } from './interfaces/item.interface';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    findAll(query: any): Promise<Item[]>;
}
