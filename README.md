# autocheck-hacker NestJS REST API

A CRUD REST API using the NestJS framework

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

$ Use postman to test the endpoints
```

## API Endpoints

| Request Route     | Methods | Description                                                                                       |
| ----------------- | ------- | ------------------------------------------------------------------------------------------------- |
| /news/custom      | GET     | Get Top 10 most occurring words in the titles of the last 25 stories                              |
| /news/date        | GET     | Top 10 most occurring words in the titles of the post of exactly the last week                    |
| /news/karma-users | GET     | Top 10 most occurring words in titles of the last 600 stories of users with at least 10.000 karma |

## Stay in touch

- Author - Tijani Oluwafemi

## License

[MIT licensed](LICENSE).
