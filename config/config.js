var in_client_id = '445969309446550',
  in_client_secret = '291958d2c06000112ee51d34657b6beb',
  in_redirect_uri = 'https://insta.humwell.com:8888/handleauth',
  in_auth_url = 'https://api.instagram.com/oauth/authorize?app_id=' + in_client_id +
    '&redirect_uri=' + in_redirect_uri + '&scope=user_profile,user_media' + '&response_type=code'

var db_user = 'salman',
  db_password = 'salman11',
  db_uri = 'mongodb://'
    + db_user + ':'
    + db_password + '@ds051740.mlab.com:51740/devconnector1';

module.exports = {
  // port: process.env.PORT || 8888,
  db: {
    uri: db_uri
  },
  instagram: {
    app_id: in_client_id,
    app_secret: in_client_secret,
    auth_url: in_auth_url
  }
};