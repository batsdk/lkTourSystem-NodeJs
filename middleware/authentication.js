const Errors = require("../errors");
const { verifyToken } = require("../Utils/jwt");

// Check for token and passing req.user
const authMiddleware = (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new Errors.UnauthenticatedError("Invalid Authentication");
  }

  try {
    const { userId, name, role } = verifyToken(token);
    console.log(verifyToken(token));
    req.user = {
      userId,
      name,
      role,
    };
  } catch (error) {
    console.log(error);
  }

  next();
};

// Checking is admin in req.user

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.log(req.user);
      console.log(roles);
      throw new Errors.unauthorized("Does not have acces to this route");
    }
    next();
  };
};

module.exports = { authMiddleware, authorizePermissions };
