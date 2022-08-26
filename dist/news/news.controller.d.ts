import { NewsService } from './news.service';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    findAll(): Promise<String[]>;
    findAllByDate(): Promise<String[]>;
    findAllByKarmaUsers(): Promise<any[]>;
}
