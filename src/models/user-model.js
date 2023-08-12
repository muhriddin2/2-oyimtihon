const { v4: uuid } = require("uuid");

class User {
  constructor(username, phone_number, email, password, role) {
    this.id = uuid();
    this.username = username;
    this.phone_number = phone_number;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
module.exports = User;