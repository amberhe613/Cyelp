# Cyelp
A full-stack Node.js web application for recommending Chinese restaurants

## Initial Setup (finish by March 12)
* Set up Front-end framework (React / Angular)
* Set up server (Express)
* Set up remote MongoDB mLab
* Set up Heroku Environment

## Implement Home Page
* Top: Access to Login, Register, Profile
* Main: Display a list of links to restaurants 
* Buttom: Contact information

## Layout and Basic Styling
* Create header and footer partials
* Add in Bootstrap

## Authentication Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model 

## Authentication Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

## Authentication Pt. 3 - Login
* Add login routes
* Add login template

## Authentication Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
<!---
## Authentication Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar 
--->
## Add Restaurant Model
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of routes

## Creating New Restaurants
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

## Editing Restaurants
* Add Method-Override
* Add Edit Route for Restaurants
* Add Link to Edit Page
* Add Update Route

## Deleting Restaurants
* Add Destroy Route
* Add Delete button

## Style the Restaurants page
* Add a better header/title
* Make campgrounds display in a grid
<!---
## Show Page
* Review the RESTful routes we've seen so far
* Add description to the campground model
* Show db.collection.drop()
* Add a show route/template
-->
<!---
## Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!
-->
<!---
## Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts
-->
## Add the Comment model!
* Make comment errors go away!
* Display comments on campground show page

## Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form
<!---
## Style Show Page
* Add sidebar to show page
* Display comments nicely
-->
<!---
## Finish Styling Show Page
* Add public directory
* Add custom stylesheet
-->
<!---
## Refactor The Routes
* Use Express router to reoragnize all routes
-->
## Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

## Users + Restaurant
* Prevent an unauthenticated user from creating a restaurant
* Save username+id to newly created restaurants

## Authorization Part 1: Restaurants
* User can only edit his/her restaurants
* User can only delete his/her restaurants
* Hide/Show edit and delete buttons

## Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

## Deleting Comments
* Add Destroy route
* Add Delete button

## Authorization: Comments + User
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware to a single file

## Adding in Flash!
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header

## Adding dynamic price tag
* Show user-defined price
* Edit new or old price
* Change model for campground
