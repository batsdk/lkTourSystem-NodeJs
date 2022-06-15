const CustomAPIError = require("./custom-api");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");
const unauthorized = require("./unauthorized");

module.exports = {
  unauthorized,
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
};
