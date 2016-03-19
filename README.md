# json-api-express
Demo app built with Express, Mongoose to demonstrate a fully working [JSON API](http://jsonapi.org/) implementation.

It is a work in progress. Some features need to be implement to have a complete working example API. Some missing features : Errors, Payload validation, etc...

Feel free to contribute to build a fully working [JSON API](http://jsonapi.org/) example.

## Installation

1. Clone repo
2. `npm install`
3. `npm start`
4. Browse http://localhost:8080

## Usage

This is a sample app modeling a blog with articles, author, comments, tags, etc...

Try some endpoints :
 * http://localhost:8080/articles
 * http://localhost:8080/articles?page[offset]=1&page[limit]=1
 * http://localhost:8080/articles?page[number]=1&page[size]=1
 * http://localhost:8080/articles?include=author,comments.author&fields[article]=title,body&fields[people]=name
 * http://localhost:8080/peoples
 * http://localhost:8080/comments
 * http://localhost:8080/tags
 * ...

## Features
 * [Sparse Fieldsets](http://jsonapi.org/format/#fetching-sparse-fieldsets)
 * [Sorting](http://jsonapi.org/format/#fetching-sorting)
 * [Pagination](http://jsonapi.org/format/#fetching-pagination)
 * [Inclusion](http://jsonapi.org/format/#fetching-includes)
 * [Links](http://jsonapi.org/format/#document-links)
 * And more...

## Prerequisites
 * MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) - you'll need mongoDB to be installed and have the `mongod` process running.
 * Node.js 4+ or above
