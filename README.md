# My Movie Database

This app is was designed to sort through your movies and find the one that you want to watch.
It also gives additional information on your movie based on IMDB information.

## Screenshots

### Homepage
![Alt text](GA/Unit 2/Movies/home-screen.png)

### Movie search
![Alt text](GA/Unit 2/Movies/search.png?raw=true "Optional Title")

### Search Results
![Alt text](GA/Unit 2/Movies/results?raw=true "Optional Title")

### All Movies

![Alt text](GA/Unit 2/Movies/all-movies?raw=true "Optional Title")
## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express
- OMDB API
- IMDB API
- Postgres

## Process

### Approach

First, I put myself in the seat of the user and decided what functionality I wanted in the app.
Afterwards, I pseudo-coded the routes that I would need to build. Then, I created mock-ups of
what the pages should look like. Finally, I began to write the code.

View mock-ups here: http://res.cloudinary.com/stevens1434/image/upload/v1507625163/1507625145914955567942_bdxqu3.jpg

### User Story

User has many movies and is looking for information on a movie in his or her database. The user can search his
or her movies and, by referencing the IMDB API, the user can find ratings, movie synopsis, and much more
information.

## Installation

Fork and clone repository. Install dependencies, including express.

## Unfinished Work

I would like to be able to add genre, actors, etc to the user's database from the data collected from
the IMDB and OMDB API's.

## Authors

AJ Stevens

## Additional Instructions for Download

* Run `npm install` to install dependencies
  * Use `npm run lint:js` to lint your JS
  * Use `npm run lint:css` to lint your CSS
  * Use `npm test` to run tests
* Setup the databases
  * Change the database names in `config/config.json` to reflect your project
  * Run `createdb project_name_development` to create the development database
  * Run `createdb project_name_test` to create the test database
