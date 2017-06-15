Recipe Book
==========

An experimental exercise client-side/single page application built with JavaScript, MySQL and [Node.js](http://www.nodejs.org) (as both a server and a REST API). This project aims to come up with some possible methods of tackling some of the more involved components used when creating client-side applications (e.g. user authentication, authorization, sign-in and sign-out, error handling, notifications, and relational data). As a result, if you happen to have any suggestions for better ways to handle different components of this application, please feel free to offer up any potential solutions for discussion.

Current libraries demonstrated...

* [Backbone.js](http://backbonejs.org/)
* [AngularJS 1](http://angularjs.org/)
* [React](https://facebook.github.io/react/)

Perhaps more will be used in the future...

**Disclaimer:** At present, not all of this code is 100% production ready (far from it actually, lol). Both the client side and the server side need additional refinements with regard to validation, error handling, messaging and a number of other areas. While features will continue to be improved over time, the primary aim of this project is to implement things conceptually and show potential starting points to solving various problems encountered in client side application development. (So please don't just change a couple class names and ship it off it a client). Also, I make no grandiose claims about being a Kung Fu master at coming up with the greatest possible solution for everything using any of the frameworks demonstrated. So, as mentioned above, if have any suggestions for better ways to handle different components of this application, please feel free to offer them up. 

### Setting Up

This project uses Node.js as a both a server and a REST API. You will want to install the dependencies for the project by running the following command in a terminal or command window... 

```
$ npm install 
```

This will pull down all the project dependencies and put them in a "node_modules" folder.

#### Config Files

You'll want to configure your to set your database settings so that you can properly establish a database connection and save your data. The database connection object is in the /utilities/SQL.js file. See below for an example...

```javascript
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'recipebook',
    multipleStatements: true  
});
```

Change any of the properties that you need to change there for your environment. We'll create the database in the next section.

#### Database Setup

As an example, on my server I created the database named 'recipebook.' You can name your database whatever you want, you just need to be sure to set the name of the database in your connection object as was shown above.

The easiest thing to do after this would probably be to just import the recipebook.sql file found in the "sql" directory into the database. This file pre-populates the database with a single user with the login...

```javascript
username: demo
password: demo
```

So you can just sign in with those credentials right away. There are also a couple of sample recipes created under this user as well.

But if you want to start from scratch or do things manually, the following SQL should do it for you...

Recipes Table:

```sql
CREATE TABLE `recipes` (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    name VARCHAR(255) COLLATE utf8_general_ci NOT NULL,
    UNIQUE KEY id (id)
)
```

Ingredients Table:

```sql
CREATE TABLE `ingredients` (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT(11) NOT NULL,
    name VARCHAR(255) COLLATE utf8_general_ci NOT NULL,
    UNIQUE KEY id (id)
)
```

Directions Table:

```sql
CREATE TABLE `directions` (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT(11) NOT NULL,
    name TEXT COLLATE utf8_general_ci NOT NULL,
    UNIQUE KEY id (id)
)
```

Users Table:

```sql
CREATE TABLE `users` (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) COLLATE utf8_general_ci NOT NULL,
    password VARCHAR(255) COLLATE utf8_general_ci NOT NULL,
    avatar VARCHAR(255) COLLATE utf8_general_ci NOT NULL,
    UNIQUE KEY id (id)
)
```

To create a user account, go to the "Sign Up" section when you run the application. Look for a link in the top right hand corner...

#### Running the Project

To run the server/project simply run the following in a terminal/command window...

```
$ node server
```

This will start the server and run the project at http://localhost:8080. Go to that URL to view the home page. From there you can navigate to the different applications.
