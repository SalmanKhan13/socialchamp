const express = require("express");
const morgan = require('morgan');
const config = require('./config/config');
const mongoose = require('mongoose');
const authUser = require('./app/services/authService');
const https = require('https');
const fs = require('fs');


const app = express();

mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo db connected...')
  });

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.get('/auth', authUser);


app.get('/salman', (request, response) => {
  response.send('Salman is working')
});

app.get('/', (request, response) => {
  response.sendFile('./public/index.html')
});

//app.get('/auth',(req, res)=> {
// console.log(res);
// res.send(req.query.code);
//});


app.get('/login', function (request, response) {
  response.redirect(config.instagram.auth_url);
});

const options = {
  key: fs.readFileSync('/etc/letsencrypt/archive/insta.humwell.com/privkey1.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/archive/insta.humwell.com/cert1.pem')
}

const port = process.env.PORT || 8888;

const server = https.createServer(options, app).listen(port, '0.0.0.0', function () {
  console.log("Express server listening on port " + port);
});














// const express = require("express");
// const morgan = require('morgan');
// const config = require('./config/config');
// const mongoose = require('mongoose');
// var authUser = require('./app/services/authService').default;


// const app = express();

// mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Mongo db connected...')
//   });

// app.use(morgan('dev'));
// app.use(express.static(__dirname + '/public'));
// app.get('/auth', authUser);



// app.get('/', function (request, response) {
//   response.send('Server is working')
// });
// app.get('/', function (request, response) {
//   response.sendfile('./public/index.html')
// });

// app.get('/auth', (req, res) => {
//   res.send(request.query.code);

// });

// app.get('/login', function (request, response) {
//   response.redirect(config.instagram.auth_url);
// });



// const PORT = process.env.PORT || 8888;
// app.listen(PORT, err => {
//   if (err) {
//     throw err
//   }
//   console.log(`Server listening on port ${PORT}`)
// })


