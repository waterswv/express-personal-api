// require express and other modules
var express = require('express'),
  app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

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

var db = require('./models');

// TEST DATA

var quoteData = [{
    quote: "And that government of the people, by the people, for the people, shall not perish from this earth",
    author: "Abraham Lincoln",
    year: 1863
  },
  {
    quote: "What is past is prologue",
    author: "William Shakespeare",
    year: 1610
  }
]

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
    endpoints: [{
        method: "GET",
        path: "/api",
        description: "Describes all available endpoints"
      },
      {
        method: "GET",
        path: "/api/profile",
        description: "Bryan's Profile "
      }, // changed you
      {
        method: "GET",
        path: "/api/quote",
        description: "Retrieves a collection of my favorite quotes"
      },
      {
        method: "POST",
        path: "/api/quote",
        description: "Add to the collection of my favorite quotes"
      }, // changed you
      {
        method: "PUT",
        path: "/api/quote/:id",
        description: "Updates a document in my quote collection by ID"
      },
      {
        method: "GET",
        path: "/api/quote/:id",
        description: "Retrieves a document in my quote collection by ID "
      },
      {
        method: "DELETE",
        path: "/api/quote/:id",
        description: "Deletes a document in my quote collection by ID"
      }
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
    data: [{
        name: "My first name",
        path: "Bryan",
        description: "My first name"
      },
      {
        name: "My GitHub username",
        path: "waterswv",
        description: "My GitHub username"
      },
      {
        name: "San Francisco",
        description: "My current home location"
      },
      {
        name: "LinkedIn",
        path: "https://www.linkedin.com/in/bryanmierke",
        description: "This is my LinkedIn page"
      },
      {
        name: "Twitter",
        path: "https://twitter.com/bryanmierke",
        description: "This is my Twitter page"
      },
      {
        name: "GitHub",
        path: "https://github.com/waterswv",
        description: "This is my GitHub page"
      },
      {
        name: "Personal Site Repo",
        path: "https://github.com/waterswv/waterswv.github.io",
        description: "This is my Personal site repo"
      },
      {
        name: "Project 0 Repo",
        path: "https://waterswv.github.io/project-0/",
        description: "This is my Racecar game repo"
      },
      {
        name: "Test Driven API Repo",
        path: "https://github.com/waterswv/test-driven-todo-api",
        description: "This is my test-driven-todo-api repo"
      },
      {
        name: "GeoQuakes API",
        path: "https://github.com/waterswv/geoquakes",
        description: "This is my geoquakes repo with Google Maps integration"
      },
      {
        name: "GitHub Profile Image",
        path: "https://avatars3.githubusercontent.com/u/8486789?v=4&u=61d07b2c97a69d17be136998d831e658ae077a11&s=400",
        description: "The picture used on my GitHub Account currently"
      }

    ]
  })
});

app.get('/api/quote', function(req, res) {
  // Post code here
  // var theData = req.quoteData;
  db.Quote.find({}, function(err, quotes) {
    if (err) {
      return console.log(err)
    }
    res.json(quotes);
  })

});

app.post('/api/quote', function(req, res) {
  // Post code here
  var newQuote = new db.Quote({
    quote: req.body.quote,
    author: req.body.author,
    year: req.body.year
  });
  console.log('newQuote should be stored here', newQuote)
  newQuote.save(function(err, quote) {
    if (err) {
      return console.log(err)
    }

    res.json(quote)
  });


});

app.get('/api/quote/:id', function(req, res) {

  // conversely you can skip storing the id by replacing qtID with {_id: req.params.id} <--need object brackets
  // AND with the above syntax you could use either ById or One ... whereas findOne doens't work w/ a variable since it...
  // ... wouldn't know what the key:value pair it was searching equates to.
  // GET the ID passed from browser
  qtID = req.params.id;

  db.Quote.findById(qtID, function(err, theQuote) {
    if (err) {
      console.log("Error getting quote", err);
    }
    res.json(theQuote);
  });
});

app.put('/api/quote/:id', function(req, res) {
  // Post code here
  db.Quote.findOne({_id: req.params.id}, function (err, myQuote){
    if(err){
      console.log("Error finding ID", err);
    }

    myQuote.quote = req.body.quote;
    myQuote.author = req.body.author;
    myQuote.year = req.body.year;
    myQuote.save();
    res.json(myQuote);

  });
});

app.delete('/api/quote/:id', function(req, res) {
  // Post code here
  db.Quote.findOneAndRemove({ _id: req.params.id }, function (err, deletedQuote) {
    res.json(deletedQuote);
  });
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('Express server is up and running on http://localhost:3000/');
});
