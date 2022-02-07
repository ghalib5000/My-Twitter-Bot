const twitterApp = {
  consumer_key: env.CONSUMER_KEY,
  consumer_secret: env.CONSUMER_KEY_SECRET,
  access_token: env.ACCESS_TOKEN,
  access_token_secret: env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
};
console.log(twitterApp.consumer_key)
module.exports = {
  twitterApp,
  userName:  process.env.USERNAME
};
