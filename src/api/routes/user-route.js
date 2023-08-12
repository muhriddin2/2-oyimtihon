const { Router } = require("express");
const userRoute = Router();
const { register, login } = require("../controllers/user-contoller");
const { isAuth } = require("../middlewares/isAuth");
const { isAdmin } = require("../middlewares/isAdmin");
userRoute.post("/login", login);
userRoute.post("/register", register);
userRoute.get("/admin", isAuth, isAdmin);
module.exports = {
  userRoute,
};