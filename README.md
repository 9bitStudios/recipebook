Recipe Book
==========

An experimental exercise application built with Backbone.js & Slim PHP Framework as a REST API

For data storage: 

Created database 'RecipeBook' then ran the following to create the "recipes" table...

```sql
CREATE TABLE `recipes` (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    recipe_name VARCHAR(255) COLLATE utf8_general_ci NOT NULL,
    UNIQUE KEY id (id)
)
```

and the "users" table...

```sql
CREATE TABLE `users` (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) COLLATE utf8_general_ci NOT NULL,
    password VARCHAR(255) COLLATE utf8_general_ci NOT NULL,
    avatar VARCHAR(255) COLLATE utf8_general_ci NOT NULL,
    UNIQUE KEY id (id)
)
```
