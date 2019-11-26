const express = require("express");
const morgan = require('morgan');
const config = require('./config/config');
const mongoose = require('mongoose');
const authUser = require('./app/services/authService');
const https = require('https');
const http = require('http');
const fs = require('fs');


const app = express();

mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo db connected...')
  });

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
//app.get('/auth', authUser);


app.get('/salman', (request, response) => {
  response.redirect('/test');
});

app.post('/salmanpost', (request, response) => {
  console.log("Hello salman from post");
  response.send('post is working')
});


app.get('/', (request, response) => {
  response.sendFile('./public/index.html')
});

app.get('/auth', (req, res) => {
  //console.log(req.query.code);
  res.redirect('/access_token_request.html');
  console.log("it hits the access page");
});

// app.post('/test', (req, res) => {
//   var params = {
//     app_id: '445969309446550',
//     app_secret: '291958d2c06000112ee51d34657b6beb',
//     grant_type: 'authorization_code',
//     redirect_uri: 'https://insta.humwell.com:8888/auth',
//     code: 'AQCuNZINhXOKGOnD7QKGSLlFw-I1D32ZlO07BmdpEDNKK3D1qwYpcQSRgqMbNW-S6Aj0Q1q4yS8XM8fn3PqZOn-Y1vmQlfMKEHtnDOeF0YMt7YEyLNvg_sltrP-zIZtkC3-NcYnEJfebEO_iUMhG_PWZWpfjGEw5CioITiW8yVo6i__Rg19snWZtQr3L3Z5k_TUXobaOqMDkfyP8EEVZhvAWY5yR_wY9B1CbVcWUDVMKXA'
//   }
//   axios.post('https://api.instagram.com/oauth/access_token', params).then(response => {
//     console.log(response);
//     res.send(response.data);
//   }).catch(err => res.status(404).json(err));
// })

app.get('/login', function (request, response) {
  response.redirect(config.instagram.auth_url);
});


const options = {
  key: fs.readFileSync('/etc/letsencrypt/archive/insta.humwell.com/privkey1.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/archive/insta.humwell.com/cert1.pem')
}

const port = process.env.PORT || 8888;
const port1 = process.env.PORT || 88;
const server1 = http.createServer(app).listen(port1, function () {

  console.log("Express http server listening on port " + port1);
});
const server = https.createServer(app).listen(port, '0.0.0.0', function () {

  console.log("Express https server listening on port " + port);
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


