const Joi = require("joi");
const path = require("path");
const { v4: uuid } = require("uuid");
const Io = require("../../utils/Io");
const fs = new Io(process.cwd() + "/database/services.json");
const Service = require("../../models/service-model");
const getAllService = async (req, res) => {
  try {
    const readDaata = await fs.readFile();
    res.json({
      data: readDaata,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const getOneService = async (req, res) => {
  try {
    const { id } = req.params;
    const readDaata = await fs.readFile();
    const oneService = readDaata.find((service) => service.id === id);
    if (!oneService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    res.json({
      data: oneService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const readDaata = await fs.readFile();
    const findService = readDaata.find((service) => service.id === id);
    if (!findService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    const filtredService = readDaata.filter((service) => service.id !== id);
    await fs.writeFile(filtredService);
    res.status(200).json({
      message: "Successfully deleted service",
    });
  } catch (error) {}
};
const addService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const filePhoto = req.files;
    if (!title || !description || !filePhoto) {
      return res.status(400).json({
        message: "title and description are required",
      });
    }
    const schema = Joi.object({
      title: Joi.string().max(30),
      description: Joi.string(),
    });
    const { error } = schema.validate({
      title,
      description,
    });
    if (error) {
      res.status(400).json({
        message: error.message,
      });
    }
    const readData = await fs.readFile();
    const mimeType = path.extname(filePhoto.photo.name);
    const file = uuid() + mimeType;
    const newService = new Service(file, title, description);
    const writeData =
      readData.length > 0 ? [...readData, newService] : [newService];
    await fs.writeFile(writeData);
    filePhoto.photo.mv(`${process.cwd()}/uploads/${file}`);
    res.status(201).json({
      message: "Service created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const updateService = async (req, res) => {
  try {
    const { id } = req?.params;
    const filePhoto = req.files;
    const { title, description } = req.body;
    if (!filePhoto || !title || !description) {
      return res.status(400).json({
        message: "photo, title, description are required!!",
      });
    }
    const readData = await fs.readFile();
    const mimeType = path.extname(filePhoto.photo.name);
    const file = uuid() + mimeType;
    const findService = readData.find((service) => service.id === id);
    (findService.photo = file), (findService.title = title);
    findService.description = description;
    await fs.writeFile(readData);
    res.status(200).json({
      message: "Service edited successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  getAllService,
  getOneService,
  deleteService,
  addService,
  updateService,
};