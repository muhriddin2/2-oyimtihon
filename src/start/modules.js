const cors = require("cors");
const cookie = require("cookie-parser");
const fileUpload = require("express-fileupload");
const routes = require("../api/routes/index");
const modules = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookie());
  app.use(fileUpload());
  app.use(express.static(process.cwd() + "/uploads"));
  app.use("/api", routes);
};
module.exports = modules;