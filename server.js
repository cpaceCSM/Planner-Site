const express = require('express');
//allows us to recognize build folder
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const app = express();

//MIDDLEWARE - app.use
app.use(logger('dev'));
app.use(express.json());


// 4. Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests - '/' means that it will always be caught. can do /anything
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

// Configure to use port 3001 instead of 3000 during development to avoid collision with React's dev server of 3000
const port = process.env.PORT || 3001;
//checks if process.env.port exists, if not then it will use 3001

  app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
  });
  //app.listen MUST be at the end. Require statements must be at start. Middlewear (app.use) must be in the middle