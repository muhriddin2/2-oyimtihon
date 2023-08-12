const { userRoute } = require("./user-route");
const { serviceRoute } = require("./service-route");
const { feedbackRoute } = require("./feedback-route");
const { contactRoute } = require("./contact-route");
module.exports = [
  userRoute,
  serviceRoute,
  feedbackRoute,
  contactRoute,
];