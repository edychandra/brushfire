# Sails.js in Action

Trying out Sails through **[Sails.js in Action](https://www.manning.com/books/sails-js-in-action)** by **Mike McNeil** and **Irl Nathan**

>Sails.js in Action is a comprehensive guide to building enterprise-capable web applications using Node and Sails. Written by the creators of the Sails.js framework, this book carefully introduces each concept, technique, and tool with real-world examples and crystal clear explanations.

## Run
```bash
git clone https://github.com/eddyyanto/brushfire.git
npm install
sailsjs lift
```


## Chapter 4

**Shortcut blueprint routes and actions for video API**

|Verb	|Path/routes		|Action	|Eg														|
|-------|-------------------|-------|-------------------------------------------------------|
|GET	|/video/find		|find	|http://localhost:1337/video							|
|GET	|/video/find/:id 	|find	|http://localhost:1337/video/1							|
|GET	|/video/create		|create	|http://localhost:1337/video/create?title=title&src=src |
|GET	|/video/update/:id 	|update	|http://localhost:1337/video/update/3?title=new title 	|
|GET	|/video/destroy/:id	|destroy|http://localhost:1337/video/destroy/4					|

**Restful blueprint routes and actions for video API**

|Verb	|Path/Route		|Action |
|-------|---------------|-------|	
|GET	|/video/		|find 	|
|GET	|/video/:id		|find 	|
|POST	|/video			|create |
|PUT	|/video/:id		|update |
|DELETE	|/video/:id		|destroy|
