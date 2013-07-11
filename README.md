Recipe Book
==========

An experimental exercise client-side/single page application built with JavaScript & [Slim PHP Framework](http://www.slimframework.com/) as a REST API. This project aims to come up with some possible methods of tackling some of the more involved components used when creating client-side applications (e.g. user authentication, authorization, sign-in and sign-out, error handling, notifications, and relational data). As a result, if you happen to have any suggestions for better ways to handle different components of this application, please feel free to offer up any potential solutions for discussion.

Current libraries demonstrated...

* [Backbone.js](http://backbonejs.org/)
* [AngularJS](http://angularjs.org/)

Perhaps more will be used in the future...

**Disclaimer:** At present, not all of this code is 100% production ready (far from it actually, lol). Both the client side and the server side need additional refinements with regard to validation, error handling, messaging and a number of other areas. While features will continue to be improved over time, the primary aim of this project is to implement things conceptually and show potential starting points to solving various problems encountered in client side application development. (So please don't just change a couple class names and ship it off it a client). Also, I make no grandiose claims about being a Kung Fu master at coming up with the greatest possible solution for everything using any of the frameworks demonstrated. So, as mentioned above, if have any suggestions for better ways to handle different components of this application, please feel free to offer them up. 

###Set Up

To get this project set up you have to do a couple things to configure the API and application files for where you are hosting/running your project. To do this, we need to so the following...

1. Edit application config.js files.
2. Edit API config.php file
2. Create a database and tables for data storage

#### Config Files

**JavaScript Config Files**

In each project's "app" directory there should be a config.js file. What you'll want to to do is edit the "apiURL" property to set a path to point to the "api" directory found in this project (wherever you decide to put it) *without the trailing slash*. The config syntax will look a little bit different for different frameworks, but hopefully they're similar enough to understand what values need to be edited where. An example config.js file for the Backbone.js application is below...

```javascript
define([], function(){
    
    // config file to define any useful "constants" quickly and easily elsewhere in application
    // e.g. config.property or config['property'].
    return { 
	debug: true,
	apiURL: 'http://localhost/development/javascript/RecipeBook/api',
	applicationName: 'Recipe Book',
	applicationAuthor: '9bit Studios'
    };	
    
});
```

So you'd want to change the "apiURL" property to wherever it is you have put the file on your server.

**API Config Files**

You'll also want to configure your API config.php file inside of the "api" directory to set your database settings so that you can hook up your database with the API PHP files. See below for an example config.php file...

```php
define('RECIPE_BOOK_DB_DATABASE', 'recipebook');
define('RECIPE_BOOK_DB_HOST', 'localhost');
define('RECIPE_BOOK_DB_USER', 'root');
define('RECIPE_BOOK_DB_PASSWORD', '');
define('RECIPE_BOOK_DB_SALT', '$2a$07$R.gJb2U2N.FmZ4hPp1y2CN$'); // don't actually do this in production. store a unique salt per user in db
```

We'll create the database in the next section.

#### Database Setup

As an example, on my server I created the database named 'recipebook.' You can name your database whatever you want, you just need to be sure to set the name of the 'RECIPE_BOOK_DB_DATABASE' value in your config.php file.

The easiest thing to do after this would probably be to just import the recipebook.sql file found in the "sql" directory into the database. This file pre-populates the database with a single user with the login...

```javascript
username: demo
password: demo
```

So you can just login with those credentials right away. There are also a couple of sample recipes created under this user as well.

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