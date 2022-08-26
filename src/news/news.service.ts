import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Item } from './interfaces/item.interface';
const axios = require('axios').default;

// const url = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
const url = 'https://hacker-news.firebaseio.com/v0';

export function findOccuringWords(arr: any[], limit: number) {
  // Create Dictionary to store word
  // and it's frequency
  var hs = {};
  // Iterate through array of words
  arr.forEach((item: any) => {
    const eachTitleArr = item.title.split(' ');
    eachTitleArr.forEach((x) => {
      // If word already exist in Dictionary
      // then increase it's count by 1
      if (hs.hasOwnProperty(x)) {
        hs[x] = hs[x] + 1;
      } else {
        // Otherwise add word to Dictionary
        hs[x] = 1;
      }
    });
  });

  return Object.entries(hs)
    .sort((a: any, b: any) => b[1] - a[1])
    .map((item) => item[0])
    .slice(0, limit);
}

@Injectable()
export class NewsService {
  constructor() {}

  async findSingleStory(id: number, index: number): Promise<Item> {
    const rank = index + 1;
    return new Promise(async (resolve) => {
      const { data } = await axios.get(`${url}/item/${id}.json`);
      console.log(data);
      resolve(data);
    });
  }

  async findSingleStoryWithinWeek(id: number, index: number): Promise<Item> {
    const rank = index + 1;
    return new Promise(async (resolve) => {
      const { data } = await axios.get(`${url}/item/${id}.json`);
      const aWeekAgo = moment.unix(data.time).subtract(7, 'days');
      // console.log('....{{{', aWeekAgo, moment(new Date()).isAfter(aWeekAgo));
      if (moment.unix(data.time).isAfter(aWeekAgo)) {
        resolve(data);
      }
    });
  }

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

  async fetchUsers(id: string): Promise<Item[]> {
    try {
      const { data } = await axios.get(`${url}/user/${id}.json`);
      if (data.karma >= 10.0) {
        const itemIds = data.submitted;
        // const actions = itemIds.map(this.findSingleStory);
        // console.log('action', itemIds);
        // let results = Promise.all(itemIds);
        return itemIds;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        throw error;
      }
    }
  }

  async fetchNewStoriesByKarmaUsers(): Promise<Item[]> {
    try {
      const { data } = await axios.get(`${url}/updates.json`);
      const actions = await data.profiles.map(this.fetchUsers);
      let users: any = Promise.all(actions);
      console.log(users);
      // call stories of users
      const userActions = users.map(this.findSingleStory);
      let userStories = Promise.all(userActions);
      return userStories;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        throw error;
      }
    }
  }
}
