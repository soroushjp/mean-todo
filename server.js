var express = require('express'); //Express
var mongoose = require('mongoose'); //Mongoose
var morgan = require('morgan'); //Log requests to console (express4)
var bodyParser = require('body-parser'); //Pull info from HTTP POST (express4)
var methodOverride = require('method-override'); //Simulate HTTP PUT and DELETE (express4)

var app = express();

// Put your mongodb url here.
// mongoose.connect('mongodb://node:node@proximus.modulusmongo.net:27017/Oquxos9o');

//Config
app.use(express.static(__dirname + '/public')); //setup static files at /public
app.use(morgan('dev')); // Log all requests to console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //Parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

//Mongo models
var Todo = mongoose.model('Todo', {
	text: String
});

//API Routes

//get all todos
app.get('/api/todos', function(req, res) {
	Todo.find(function(err, todos) {
		if(err) res.send(err);
		res.json(todos);
	});
});

//create todo and return new todos
app.post('/api/todos/', function(req,res) {
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todo) {
		if(err) res.send(err);
		
		Todo.find(function(err, todos) {
			res.json(todos);
		});

	});
});

//delete a todo and return new todos
app.delete('/api/todos/:todo_id', function(req,res) {
	Todo.remove({
		_id: req.params.todo_id
	}, function(err, success) {
		if(err) res.send(err);
		
		Todo.find(function(err,todos) {
			res.json(todos);
		});
	});
});

//Let Angular frontend handle all other routes
app.get('*', function(req,res) {
	res.sendfile('./public/index.html');
});

//Start server
app.listen(8080);
console.log("App listening on port 8080 ...");