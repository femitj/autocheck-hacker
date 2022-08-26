"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const news_service_1 = require("./news.service");
let NewsController = class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
    }
    async findAll() {
        const data = await this.newsService.fetchNewStories(20);
        const result = (0, news_service_1.findOccuringWords)(data, 10);
        return result;
    }
    async findAllByDate() {
        const data = await this.newsService.fetchNewStoriesByLastWeek();
        const result = (0, news_service_1.findOccuringWords)(data, 10);
        return result;
    }
    async findAllByKarmaUsers() {
        const data = await this.newsService.fetchNewStoriesByKarmaUsers();
        console.log('>>>>', data);
        const result = (0, news_service_1.findOccuringWords)(data, 10);
        return result;
    }
};
__decorate([
    (0, common_1.Get)('/custom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/date'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "findAllByDate", null);
__decorate([
    (0, common_1.Get)('/karma-users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "findAllByKarmaUsers", null);
NewsController = __decorate([
    (0, common_1.Controller)('news'),
    __metadata("design:paramtypes", [news_service_1.NewsService])
], NewsController);
exports.NewsController = NewsController;
//# sourceMappingURL=news.controller.js.map