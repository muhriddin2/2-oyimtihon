const config = require("../config/index");
const run = (app) => {
  app.listen(config.port, () => {
    console.log("Server listening on port " + config.port);
  });
};
module.exports = run