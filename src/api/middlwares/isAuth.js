const JWT = require("jsonwebtoken");
const config = require("../../config/index");
const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    const { user_id } = JWT.verify(token, config.jwt_key);
    req.user_id = user_id;
    return next()
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  isAuth,
};