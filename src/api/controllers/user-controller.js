const Joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
const config = require("../../config/index");
const Io = require("../../utils/Io");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  try {
    const { username, email, phone_number, password } = req.body;
    const fs = new Io(process.cwd() + "/database/users.json");
    if (!username || !email || !phone_number || !password || !password) {
      return res.status(400).json({
        message: "username,email,phone_number,password is required",
      });
    }
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(15),
      email: Joi.string().email(),
      phone_number: Joi.string().regex(
        /^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/
      ),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    const { error } = schema.validate({
      username,
      email,
      phone_number,
      password,
    });
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User(
      username,
      phone_number,
      email,
      hashPassword,
      "user"
    );
    const token = jwt.sign(
      {
        user_id: newUser.id,
      },
      config.jwt_key,
      {
        expiresIn: "200h",
      }
    );
    const readData = await fs.readFile();
    const findUser = readData.find((user) => user.username === username);
    if (!findUser) {
      res.cookie("token", token);
      const writeData =
        readData.length > 0 ? [...readData, newUser] : [newUser];
      await fs.writeFile(writeData);
      res.status(201).json({
        message: "User created",
      });
    } else {
      res.status(400).json({
        message: "User already exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const fs = new Io(process.cwd() + "/database/users.json");
    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required",
      });
    }
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(15),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    const { error } = schema.validate({
      username,
      password,
    });
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const readData = await fs.readFile();
    const findUser = readData.find((user) => user.username === username);
    if (!findUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (findUser && checkPassword) {
      return res.status(200).json({
        message: "Success",
      });
    } else {
      res.status(401).json({
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  register,
  login,
};