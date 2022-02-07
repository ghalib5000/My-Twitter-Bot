var t = require(".github/workflows/run.yml");
//import github actions secret

const twitterApp = {
  consumer_key:  t.CONSUMER_KEY,
  consumer_secret: t.CONSUMER_KEY_SECRET,
  access_token: t.ACCESS_TOKEN,
  access_token_secret: t.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
};

module.exports = {
  twitterApp,
  userName:  t.USERNAME
};
