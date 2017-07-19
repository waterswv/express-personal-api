// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    didIFailToCompleteThis: false, // made you false ;)
    message: "This Documentation contains the profile of github user waterswv",
    documentationUrl: "https://github.com/waterswv/express-personal-api/blob/master/README.md", // changed you
    baseUrl: "https://young-peak-15905.herokuapp.com/", // changed you
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Bryan's Profile "}, // changed you
      {method: "GET", path: "/api/quote", description: "Retrieves a collection of my favorite quotes"},
      {method: "POST", path: "/api/quote", description: "Add to the collection of my favorite quotes"}, // changed you
      {method: "PUT", path: "/api/quote/:id", description: "Updates a document in my quote collection by ID"},
      {method: "GET", path: "/api/quote/:id", description: "Retrieves a document in my quote collection by ID "},
      {method: "DELETE", path: "/api/quote/:id", description: "Deletes a document in my quote collection by ID"}
    ]
  })
});

app.get('/api/profile', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({

    message: "This endpoint contains my profile data: details about how to contact me & my GA project repos",
    documentationUrl: "https://github.com/waterswv/waterswv.github.io/blob/master/README.md", // Personal Page Repo Readme
    baseUrl: "https://waterswv.github.io/", // my hosted personal page URL
    urls: [
      {name: "LinkedIn", path: "https://www.linkedin.com/in/bryanmierke", description: "This is my LinkedIn page"},
      {name: "Twitter", path: "https://twitter.com/bryanmierke", description: "This is my Twitter page"},
      {name: "GitHub", path: "https://github.com/waterswv", description: "This is my GitHub page"},
      {name: "Personal Site Repo", path: "https://github.com/waterswv/waterswv.github.io", description: "This is my Personal site repo"},
      {name: "Project 0 Repo", path: "https://waterswv.github.io/project-0/", description: "This is my Racecar game repo"},
      {name: "Test Driven API Repo", path: "https://github.com/waterswv/test-driven-todo-api", description: "This is my test-driven-todo-api repo"},
      {name: "GeoQuakes API", path: "https://github.com/waterswv/geoquakes", description: "This is my geoquakes repo with Google Maps integration"},

    ]
  })
});

app.post('/api/quote')
/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
console.log('Express server is up and running on http://localhost:3000/');
});
