# Timestamp Microservice

As part of FreeCodeCamp's Backend Development and APIs course with their boilerplate code to get started I've built out a small timestamp microservice.


## Test it with Gitpod
 - copy this link in to the searchbar: https://gitpod.io/#newhttps://github.com/lampenny/fcc-timestamp-microservice
 - inside gitpod's workspace, copy the Simple Browser link.
 - go to https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/timestamp-microservice
 - paste the relevant links and hit enter
 - tests should all pass!

## Getting started in your local
 - clone this repo
 - run `yarn install`
 - now run `./node_modules/.bin/nodemon index.js` to start the app


## Endpoint
 It accepts a date string as a parameter and returns:

 `/api/:date`

```yaml
{ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
```
 
