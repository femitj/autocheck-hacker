import { Controller, Get } from '@nestjs/common';
import { findOccuringWords } from 'src/helper';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/custom')
  async findAll(): Promise<String[]> {
    const data = await this.newsService.fetchNewStories(20);
    // find 10 most occuring words
    const result = findOccuringWords(data, 10);
    return result;
  }

  @Get('/date')
  async findAllByDate(): Promise<String[]> {
    const data = await this.newsService.fetchNewStoriesByLastWeek();
    // find 10 most occuring words
    const result = findOccuringWords(data, 10);
    return result;
  }

  @Get('/karma-users')
  async findAllByKarmaUsers(): Promise<any[]> {
    const data = await this.newsService.fetchNewStoriesByKarmaUsers();
    // find 10 most occuring words
    const result = findOccuringWords(data, 10);
    return result;
  }
}
