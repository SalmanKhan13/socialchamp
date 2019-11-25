//var httpRequest = require('request');
const axios = require('axios');
const instagram = require('../../config/config');

module.exports = function (req, res) {


  var params = {
    app_id: instagram.app_id,
    app_secret: instagram.app_secret,
    grant_type: 'authorization_code',
    redirect_uri: instagram.redirect_uri,
    code: req.query.code
  }
  axios.post('https://api.instagram.com/oauth/access_token', params).then(response => {
    console.log(response.data);
    res.send(response.data);


  }).catch(err => res.status(404).json(err));
}

  // var options = {
  //   url: 'https://api.instagram.com/oauth/access_token',
  //   method: 'POST',
  //   form: {
  //     client_id: config.instagram.client_id,
  //     client_secret: config.instagram.client_secret,
  //     grant_type: 'authorization_code',
  //     redirect_uri: config.instagram.redirect_uri,
  //     code: req.query.code
  //   }
  // };

  // httpRequest(options, function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     var user = JSON.parse(body);
  //     console.log(user)
  //   }
  // });

