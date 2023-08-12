const { Router } = require("express");
const contactRoute = Router();
const { isAdmin } = require("../middlewares/isAdmin");
const {
  sendContact,
  getContact,
  getAllContact,
} = require("../controllers/contact-controller");
const { isAuth } = require("../middlewares/isAuth");
contactRoute.post("/contact", isAuth, sendContact);
contactRoute.get("/contact/:id", isAuth, isAdmin, getContact);
contactRoute.get("/contacts", isAuth, isAdmin, getAllContact);
module.exports = {
  contactRoute,
};