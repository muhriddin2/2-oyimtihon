const { v4: uuid } = require("uuid");
class service {
  constructor(photo, title, description) {
    this.id = uuid();
    this.photo = photo;
    this.title = title;
    this.description = description;
  }
}
module.exports = service;