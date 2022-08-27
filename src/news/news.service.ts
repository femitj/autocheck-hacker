import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Item, User } from './interfaces/item.interface';
const axios = require('axios').default;

const url = 'https://hacker-news.firebaseio.com/v0';

@Injectable()
export class NewsService {
  constructor() {}

  // query a single story
  async findSingleStory(id: number): Promise<Item> {
    return new Promise(async (resolve) => {
      const { data } = await axios.get(`${url}/item/${id}.json`);
      resolve(data);
    });
  }

  // query story with the last week
  async findSingleStoryWithinWeek(id: number, index: number): Promise<Item> {
    const rank = index + 1;
    return new Promise(async (resolve) => {
      const { data } = await axios.get(`${url}/item/${id}.json`);
      const aWeekAgo = moment.unix(data.time).subtract(7, 'days');
      if (moment.unix(data.time).isAfter(aWeekAgo)) {
        resolve(data);
      }
    });
  }

  // query new users filter karma with 10.000 above
  async fetchSingleUser(id: string) {
    const { data } = await axios.get(`${url}/user/${id}.json`);
    if (data.karma >= 10000) {
      const itemIds = data.submitted;
      if (itemIds.length > 600) {
        const storiesId = itemIds.slice(0, 600);
        return storiesId;
      }
    }
  }

  // fetch stories
  async fetchNewStories(limit: number): Promise<Item[]> {
    try {
      const { data } = await axios.get(`${url}/showstories.json`);
      const storiesId = data.slice(0, limit);
      const actions = storiesId.map(this.findSingleStory);
      let results = Promise.all(actions);
      return results;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        throw error;
      }
    }
  }

  // query new stories
  async fetchNewStoriesByLastWeek(): Promise<Item[]> {
    try {
      const { data } = await axios.get(`${url}/showstories.json`);
      // const storiesId = data.slice(0, limit);
      const actions = data.map(this.findSingleStoryWithinWeek);
      let results = Promise.all(actions);
      return results;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        throw error;
      }
    }
  }

  // query new stories by karma users
  async fetchNewStoriesByKarmaUsers(): Promise<Item[]> {
    try {
      const { data } = await axios.get(`${url}/updates.json`);
      const actions = data.profiles.map(this.fetchSingleUser);
      console.log(actions);
      let users = await Promise.all(actions);
      users = users.flat();
      // call stories of users
      const userActions = users.map(async (item) => {
        if (item && item !== undefined && item !== null) {
          const res = await this.findSingleStory(item);
          return res;
        }
      });
      let userStories = await Promise.all(userActions);
      return userStories;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        throw error;
      }
    }
  }
}
