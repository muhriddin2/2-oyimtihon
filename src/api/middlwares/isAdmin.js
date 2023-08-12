const Io = require("../../utils/Io");
const fs = new Io(process.cwd() + "/database/users.json");
const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user_id;
    const readData = await fs.readFile();
    const { role } = readData.find((user) => user.id === userId);
    if (role === "admin") {
      return next();
    } else {
      res.status(401).json({
        message: "Access denied",
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  isAdmin,
};