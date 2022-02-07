const twitterApp = {
  consumer_key: secrets.CONSUMER_KEY,
  consumer_secret: secrets.CONSUMER_KEY_SECRET,
  access_token: secrets.ACCESS_TOKEN,
  access_token_secret: secrets.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
};

module.exports = {
  twitterApp,
  userName:  secrets.USERNAME
};
