const { StatusCodes } = require("http-status-codes");
const User = require("../Models/User");
const { attachCookiesToResponse } = require("../Functions");
const Errors = require("../errors");

//! Register User
const register = async (req, res) => {
  const { email, password, name } = req.body;

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const accountType = isFirstAccount ? "admin" : "user";

  const user = await User.create({ email, password, name, accountType });

  attachCookiesToResponse(user, res);
  res.status(StatusCodes.CREATED).json({ msg: "Successfull", user });
};

//! Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Errors.BadRequestError("Must provide both email and password");
  }
  const user = await User.findOne({ email });

  if (!user) throw new Errors.NotFoundError("No User Found");

  const isPasswordMatch = await user.checkPassword(password);

  if (!isPasswordMatch) {
    throw new Errors.unauthorized("Wrong password, Try again");
  }

  attachCookiesToResponse(user, res);
  res.status(StatusCodes.ACCEPTED).json({
    msg: "Login Successfull",
    user: { name: user.name, email: user.email },
  });
};
const logout = async (req, res) => {
  res.clearCookie("token");
  res.send("logout");
};

module.exports = { register, login, logout };
