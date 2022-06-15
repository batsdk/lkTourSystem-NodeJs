const jwt = require("jsonwebtoken");
const Errors = require("../errors");

const decodeCookie = (token) => {
  if (!token) throw new Errors.BadRequestError("Please Provide A Cookie Token");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

module.exports = decodeCookie;
