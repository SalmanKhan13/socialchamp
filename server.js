const express = require("express");
const morgan = require('morgan');
const config = require('./config/config');
const mongoose = require('mongoose');
var authUser = require('./app/services/authService');


const app = express();

mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo db connected...')
  });

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.get('/handleauth', authUser);



app.get('/', function (request, response) {
  response.send('Server is working')
});
app.get('/', function (request, response) {
  response.sendfile('./public/index.html')
});

app.get('/handleauth', function (request, response) {
  response.send(request.query.code);
});

app.get('/login', function (request, response) {
  response.redirect(config.instagram.auth_url);
});



const PORT = process.env.PORT || 8888;
app.listen(PORT, err => {
  if (err) {
    throw err
  }
  console.log(`Server listening on port ${PORT}`)
})


