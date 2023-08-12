const { v4: uuid } = require("uuid");
class contact {
  constructor(name, phone_number, email, message) {
    this.id = uuid();
    this.name = name;
    this.phone_number = phone_number;
    this.email = email;
    this.message = message;
    this.messageStatus = "not seen";
  }
}
module.exports = contact;