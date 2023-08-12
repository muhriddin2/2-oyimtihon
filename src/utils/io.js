const fs = require("fs").promises;
class Io {
  #dir;
  constructor(dir) {
    this.#dir = dir;
  }
  async readFile() {
    let res = await fs.readFile(this.#dir, "utf8");
    return res.length ? JSON.parse(res) : [];
  }
  async writeFile(data) {
    return await fs.writeFile(this.#dir, JSON.stringify(data, null, 2), "utf8");
  }
}
module.exports = Io;