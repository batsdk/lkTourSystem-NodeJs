const { attachCookiesToResponse } = require("../Functions/jwt");
const decodeCookie = require("./tokens");

module.exports = { decodeCookie, attachCookiesToResponse };
