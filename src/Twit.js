const Twit = require("twit");
const config = require("../.github/workflows/config.js");
const T = new Twit(config.twitterApp);

module.exports = T;