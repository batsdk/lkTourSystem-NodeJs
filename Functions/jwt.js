const jwt = require("jsonwebtoken");

const createJWT = (user) => {
  const createdjwt = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  return createdjwt;
};

const attachCookiesToResponse = (user, res) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const token = createJWT(user);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay * 2),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = { attachCookiesToResponse };
