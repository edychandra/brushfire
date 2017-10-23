# Sails.js in Action

Trying out Sails through **[Sails.js in Action](https://www.manning.com/books/sails-js-in-action)** by **Mike McNeil** and **Irl Nathan**

>Sails.js in Action is a comprehensive guide to building enterprise-capable web applications using Node and Sails. Written by the creators of the Sails.js framework, this book carefully introduces each concept, technique, and tool with real-world examples and crystal clear explanations.


## Run
Clone, install dependencies and run sailsjs:
```bash
git clone https://github.com/eddyyanto/brushfire.git
npm install
sailsjs lift
```


## Chapter 1, 2, 3 — Getting Started
General web development, introduction to Sailsjs and static assets generator.



## Chapter 4 — Using the blueprint API

**Shortcut blueprint routes and actions for video API**:

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

**Install postgres adapter:**
```bash
npm install sails-postgresql --save
```

Sails console : interactive REPL (read, eval, print loop) tools that allows you to interact with models.
Sails uses [Waterline ORM](http://sailsjs.com/documentation/concepts/models-and-orm/query-language) to interact with records from any supported database.

```bash
sails console
```

**Query examples:**
```javascript
// create new record
User.create({email:'sailsinaction@gmail.com', username:'sailsinaction', deleted:false, banned:false, admin:false}).exec(function(err, foundRecords){
	if(err) console.log(err);
	console.log(foundRecords);
});

// list all records
User.find().exec(function(err, foundRecords){
	if(err) console.log(err);
	console.log('The user records: ', foundRecords);
});

// find records matching parameter arrays
User.find({username: ['sailsinaction', 'nikolateslaidol']}).exec(function(err, foundRecords){
	if (err) console.log(err);
	console.log(foundRecords);
});

// find single record matching param
User.findOne({email: 'sailsinaction@gmail.com'}).exec(function(err, found) {
	if (err) console.log(err);
	console.log(found);
});

// update record matching param
User.update({username: 'sailsinaction'}, {admin: true}).exec(function(err, updatedRecord){
	if (err) console.log(err);
	console.log(updatedRecord);
});

// delete record matching param
User.destroy({deleted: true}).exec(function(err, deletedRecord){
	if (err) console.log(err);
	console.log(deletedRecord);
});
```


## Chapter 7 — Custom actions

> [Lodash](https://lodash.com/) describes itself as a modern JavaScript utility library. The library is accessible via the global underscore (\_) symbol. As its name suggests, it checks to see if a value is undefined.

```bash
npm install machinepack-emailaddresses --save
npm install machinepack-passwords --save
```

**Using try/catch block**:
The usage of **.execSync()** has two distinct differences in the synchronous usage of a machine:
1. There’s no callback that passes an error and any result of the machine — you need to provide a variable that will be assigned the value of a successfully returned result.
2. You're wrapping the machine in a try/catch. This will handle any errors without crashing the application. 

**Responses**

| Code 	| Response 		 		|
|-------|-----------------------|
| 200	| OK					|
| 400	| Request Invalid		|
| 409	| Conflict				|
| 403	| Forbidden				|
| 404	| Not Found				|
| 500	| Internal Server Error	|

Sailsjs built-in response : http://sailsjs.com/documentation/reference/response-res

* res.negotiate(err) : given an error (err), attempt to guess which error response should be called (badRequest, forbidden, notFound, or serverError) by inspecting the status property. If err is not a dictionary, or the status property does not match a known HTTP status code, then default to serverError.

Sailsjs custom responses can be added in **api/responses** folder eg: api/responses/alreadyInUse.js

**Exec() vs execSync()**
* exec() : can be used with any node-machine
* execSync() : only relevant for machines with guaranteed immediate/synchronous behaviour

More detailed explanation on exec() vs execSync() : https://groups.google.com/forum/#!topic/node-machine/-qhqq2kUyGM


## Chapter 8 — Server-rendered views

By default, Sailsjs uses [Embedded Javascript/EJS](http://www.embeddedjs.com/) template engine to combine the templates and data to produce HTML.

```javascript
// return profile template with json data
return res.view('profile', {
	me: {
		id: user.id,
		email: user.email,
		gravatarURL: user.gravatarURL,
		admin: user.admin
	}
});
```

## Chapter 9 — Authentication and sessions

```javascript
req.session.userId = createdUser.id;
```

## Chapter 10 — Policies and access control

**Policy** : provide the ability to inject a reusable set of code before a request executes a controller action. Policies’ main benefits are that they can be written once and applied to any controller action. Policies can be used like middleware, meaning you can do almost anything you can imagine with them.

> Middleware is code that can get in the middle of the request/response cycle. For example, the Sails router is middleware. Policies act like middleware and are executed before controller actions, making them ideal for managing access to endpoints.

Add custom policies in : **api/policies** folder and enable them in **config/policies.js**

Best practices for policies include not basing policies on parameters but instead relying on session properties and the results from database queries.

**Logging**

Default (log level)[http://sailsjs.com/documentation/concepts/logging] is info and it can be changed in **config/log.js**
```javascript
// to print log to console, depending on log level
sails.log.info(req.session.userId);
```