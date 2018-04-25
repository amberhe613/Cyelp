# Cyelp
### Slack
cyelp.slack.com

## Team Member

| Email                    | CCIS ID       |
| -------------------------|:-------------:|
| lu.yuj@husky.neu.edu     | yujialu       |
| he.zh@husky.neu.edu      | amberhe       |
| ouyang.f@husky.neu.edu   | fayeoyaee     |

## Project Name
Cyelp(Chinese Resturant Yelp) 

## Heroku Link
https://cyelp.herokuapp.com/ (please use Chrome to access)

## Documentation
1. [URL diagram](https://drive.google.com/file/d/1dACySKbPXIwAe0M6piYnkQ7dECkR_sRc/view?usp=sharing)
2. [RESTful Routing](https://docs.google.com/spreadsheets/d/1q1rLYEOoPYDXK2NWAR92IBXi7gIQJ4GXA5B2fWfZTDc/edit#gid=1490315922)

## Description
Cyelp is a yelp-like website for the Bay Area customers to post, search and read reviews about chinese resturants that they are interested in. Users can rate the resturant and write comments for those resturants as well. Users can login to the website with their Github or Google account so that they can manage posts and comments without registering for our website.

## Intended Users
People in the Bay Area who are interested in chinese food.

## Technology Stacks
### Platform
1. Heroku

### Server
1. Express.js
2. Node.js
3. Passport.js
4. Mongoose

### Database
1. MongoDB
2. MLab

### Client
1. React JS
2. Reactstrap
3. Availity reactstrap Validation
4. jQuery

## Application Functions
1. Post new resturants.
2. Creators of resturants can fire deletion of the restaurants.
3. Search exsiting resturants based on location(zip code), food type, and lowest rating. Sort results on saved times, reviewed times and rating.
4. Leave reviews about resturants and edit or delete comments whenever users need.
5. Rate resturants on a five-star rating scale.
6. Login with github and google account.

## Challenges
1. React: 
⋅⋅* reuse code by using components 
⋅⋅* manage state and props to communicate between child and parent components
⋅⋅* use react strap to beautify webpage
2. Heroku:
⋅⋅* use a mixture of http (server) and https (frontend) 
⋅⋅* use CORS to deal with cross domain security issues
⋅⋅* use cloudiary to store media files on the cloud (original: multer on local machine)
3. Trouble storing images on Heroku. 
