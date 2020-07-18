const twitterApp = {
  consumer_key:"your consumer key",//  process.env.CONSUMER_KEY,
  consumer_secret:"your consumer secret",// process.env.CONSUMER_KEY_SECRET,
  access_token:"your access token",// process.env.ACCESS_TOKEN,
  access_token_secret:"your access secret",// process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
};

module.exports = {
  twitterApp,
  userName:"your twitter username",//  process.env.USERNAME
};

//rename this frile from cinfig_sample.js to confiog.js after adding in your credentials to connect to twitter bot
