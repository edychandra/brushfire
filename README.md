# Sails.js in Action

Trying out Sails through **[Sails.js in Action](https://www.manning.com/books/sails-js-in-action)** by **Mike McNeil** and **Irl Nathan**

>Sails.js in Action is a comprehensive guide to building enterprise-capable web applications using Node and Sails. Written by the creators of the Sails.js framework, this book carefully introduces each concept, technique, and tool with real-world examples and crystal clear explanations.


## Run
```bash
git clone https://github.com/eddyyanto/brushfire.git
npm install
sailsjs lift
```


## Chapter 4 — Using the blueprint API

**Shortcut blueprint routes and actions for video API**

|Verb	|Path/routes		|Action	|Eg														|
|-------|-------------------|-------|-------------------------------------------------------|
|GET	|/video/find		|find	|http://localhost:1337/video							|
|GET	|/video/find/:id 	|find	|http://localhost:1337/video/1							|
|GET	|/video/create		|create	|http://localhost:1337/video/create?title=title&src=src |
|GET	|/video/update/:id 	|update	|http://localhost:1337/video/update/3?title=new title 	|
|GET	|/video/destroy/:id	|destroy|http://localhost:1337/video/destroy/4					|

**RESTful blueprint routes and actions for video API**

|Verb	|Path/Route		|Action |
|-------|---------------|-------|	
|GET	|/video/		|find 	|
|GET	|/video/:id		|find 	|
|POST	|/video			|create |
|PUT	|/video/:id		|update |
|DELETE	|/video/:id		|destroy|

**Angular ajax requests vs Sails socket requests**

|Angular ajax 	|Sails socket   	|
|---------------|-------------------|
|$http.get()	|io.socket.get()	|
|$http.post()	|io.socket.post()	|
|$http.put()	|io.socket.put()	|
|$http.delete()	|io.socket.delete()	|


## Chapter 5 — Custom backend code

* [**config/bootstrap.js**](http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html)
: an asynchronous function that runs before your Sails app gets lifted. This gives you an opportunity to set up your data model, run jobs, or perform some special logic.

* [**Machinepacks**](http://node-machine.org/machinepacks)
: a sets of related utilities for performing common, repetitive development tasks with Node.js.

* [**config/local.js**](http://sailsjs.org/#!/documentation/anatomy/myApp/config/local.js.html)
: a special file that allows you to set custom configuration without checking it in to version control, useful for plugging in sensitive credentials, like API keys.


## Chapter 6 — Using models

Sails looks for database connection in the following order (using User API):
1. **user model**	: api/models/User.js
2. **setttings**	: config/models.js
3. **connection**	: config/connections.js
4. **adapter**		: .tmp/localDiskDb.db

Install postgres adapter
```bash
npm install sails-postgresql --save
```

Sails console : interactive REPL (read, eval, print loop) tools that allows you to interact with models

```javascript
User.create({email:'sailsinaction@gmail.com', username:'sailsinaction', delete:false, banned:false, admin:false}).exec(function(err, foundRecords){
	if(err) console.log(err);
	console.log(foundRecords);
});

User.find().exec(function(err, foundRecords){
	if(err) console.log(err);
	console.log('The user records: ', foundRecords);
});

User.findOne({username: ['sailsinaction', 'nikolateslaidol']}).exec(function(err, foundRecords){
	if (err) console.log(err);
	console.log(foundRecords);
});
```