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
exports.NewsService = exports.findOccuringWords = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const axios = require('axios').default;
const url = 'https://hacker-news.firebaseio.com/v0';
function findOccuringWords(arr, limit) {
    var hs = {};
    arr.forEach((item) => {
        const eachTitleArr = item.title.split(' ');
        eachTitleArr.forEach((x) => {
            if (hs.hasOwnProperty(x)) {
                hs[x] = hs[x] + 1;
            }
            else {
                hs[x] = 1;
            }
        });
    });
    return Object.entries(hs)
        .sort((a, b) => b[1] - a[1])
        .map((item) => item[0])
        .slice(0, limit);
}
exports.findOccuringWords = findOccuringWords;
let NewsService = class NewsService {
    constructor() { }
    async findSingleStory(id, index) {
        const rank = index + 1;
        return new Promise(async (resolve) => {
            const { data } = await axios.get(`${url}/item/${id}.json`);
            resolve(data);
        });
    }
    async findSingleStoryWithinWeek(id, index) {
        const rank = index + 1;
        return new Promise(async (resolve) => {
            const { data } = await axios.get(`${url}/item/${id}.json`);
            const aWeekAgo = moment.unix(data.time).subtract(7, 'days');
            if (moment.unix(data.time).isAfter(aWeekAgo)) {
                resolve(data);
            }
        });
    }
    async fetchNewStories(limit) {
        try {
            const { data } = await axios.get(`${url}/showstories.json`);
            const storiesId = data.slice(0, limit);
            const actions = storiesId.map(this.findSingleStory);
            let results = Promise.all(actions);
            return results;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
                throw error;
            }
        }
    }
    async fetchNewStoriesByLastWeek() {
        try {
            const { data } = await axios.get(`${url}/showstories.json`);
            const actions = data.map(this.findSingleStoryWithinWeek);
            let results = Promise.all(actions);
            return results;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
                throw error;
            }
        }
    }
    async fetchSingleUser(id) {
        return new Promise(async (resolve) => {
            const { data } = await axios.get(`${url}/user/${id}.json`);
            if (data.karma >= 10000) {
                const itemIds = data.submitted;
                const storiesId = itemIds.slice(0, 600);
                const userActions = storiesId.map(this.findSingleStory);
                let userStories = Promise.all(userActions);
                console.log('story', userStories);
                resolve(storiesId);
            }
        });
    }
    async fetchNewStoriesByKarmaUsers() {
        try {
            const { data } = await axios.get(`${url}/updates.json`);
            const actions = await data.profiles.map(this.fetchSingleUser);
            let users = Promise.all(actions);
            console.log('+++', users);
            return users;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
                throw error;
            }
        }
    }
};
NewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map