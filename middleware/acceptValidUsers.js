const { decodeCookie } = require("../Functions");
const Errors = require("../errors");

const onlyUsers = (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new Errors.UnauthenticatedError(
      "Invalid Authentication || Must Register to have access to this route"
    );
  }

  const {
    user: { _id: id, name, email, accountType },
  } = decodeCookie(token);
  console.log(id);
  req.user = {
    userId: id,
    userName: name,
    userEmail: email,
    userAccountType: accountType,
  };
  next();
};

const onlyAdmin = (req, res, next) => {
  const { userAccountType } = req.user;

  if (userAccountType !== "admin") {
    // console.log("userAccountType : " + userAccountType);
    throw new Errors.unauthorized("Not authorized to access this route");
  }

  // console.log("Only admin property");
  next();
};

module.exports = { onlyUsers, onlyAdmin };
