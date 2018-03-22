# Cyelp
A full-stack Node.js web application for recommending Chinese restaurants

## Initial Setup (By March 12)
* Set up Front-end framework (React / Angular)
* Set up server (Express)
* Set up remote MongoDB mLab
* Set up Heroku Environment

## Implement Home Page (By March 19)
* Top: Access to Login, Register, Profile
* Main: Display a list of links to restaurants 
* Buttom: Contact information

## Layout and Basic Styling (By March 19)
* Create header and footer partials
* Add in Bootstrap

## Authentication Pt. 1 - Add User Model (By March 26)
* Install and configure Mongoose
* Install all packages needed for auth
* Define User model 

## Authentication Pt. 2 - Register (By March 26)
* Configure Passport
* Add register routes
* Add register template

## Authentication Pt. 3 - Login (By March 26)
* Add login routes
* Add login template

## Authentication Pt. 4 - Logout/Navbar (By March 26)
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

## Add Restaurant Model (By April 2)
* Setup restaurant model
* Use restaurant model inside of routes

## Creating New Restaurants (By April 2)
* Setup new restaurant POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

## Editing Restaurants (By April 2)
* Add Method-Override
* Add Edit Route for Restaurants
* Add Link to Edit Page
* Add Update Route

## Deleting Restaurants (By April 2)
* Add Destroy Route
* Add Delete button

## Style the Restaurants page (By April 2)
* Add a better header/title
* Make restaurants display in a grid

## Add the Comment model! (By April 9)
* Make comment errors go away!
* Display comments on restaurant show page

## Comment New/Create (By April 9)
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

## Users + Comments (By April 9)
* Associate users and comments
* Save author's name to a comment automatically

## Users + Restaurant (By April 9)
* Prevent an unauthenticated user from creating a restaurant
* Save username+id to newly created restaurants

## Authorization Part 1: Restaurants (By April 9)
* User can only edit his/her restaurants
* User can only delete his/her restaurants
* Hide/Show edit and delete buttons

## Editing Comments (By April 16)
* Add Edit route for comments
* Add Edit button
* Add Update route

## Deleting Comments (By April 16)
* Add Destroy route
* Add Delete button

## Authorization: Comments + User (By April 16)
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware to a single file

## Adding in Flash! (By April 16)
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header
