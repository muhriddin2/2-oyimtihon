const Joi = require("joi");
const Io = require("../../utils/Io");
const fs = new Io(process.cwd() + "/database/contacts.json");
const Contact = require("../../models/contact-model");
const sendContact = async (req, res) => {
  try {
    const { name, phone_number, email, message } = req.body;
    if (!name || !phone_number || !email || !message) {
      return res.status(400).json({
        message: "name, phone_number,email,message are required",
      });
    }
    const schema = Joi.object({
      name: Joi.string().min(3).max(15),
      phone_number: Joi.string().regex(
        /^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/
      ),
      email: Joi.string().email(),
      message: Joi.string(),
    });
    const { error } = schema.validate({
      name,
      phone_number,
      email,
      message,
    });
    if (error) {
      res.status(400).json({
        message: error.message,
      });
    }
    const readData = await fs.readFile();

    const findContact = readData.find(
      (contact) => contact.phone_number === phone_number
    );
    if (!findContact) {
      const newContact = new Contact(name, phone_number, email, message);
      newContact.request = 1;
      const writeDaata =
        readData.length > 0 ? [...readData, newContact] : [newContact];
      await fs.writeFile(writeDaata);
      res.status(201).json({
        message: "contact created successfully",
      });
    } else {
      findContact.request += 1;
      fs.writeFile(readData);
      res.status(201).json({
        message: "contact created successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const readData = await fs.readFile();
    const findContact = readData.find((contact) => contact.id === id);
    findContact.messageStatus = "seen";
    res.json({
      data: findContact,
    });
    fs.writeFile(readData);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const getAllContact = async (req, res) => {
  try {
    const readData = await fs.readFile();
    const filtredData = readData.map((contact) => {
      contact.messageStatus = "seen";
      return contact;
    });
    await fs.writeFile(filtredData);
    res.json({
      data: filtredData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  sendContact,
  getContact,
  getAllContact,
};