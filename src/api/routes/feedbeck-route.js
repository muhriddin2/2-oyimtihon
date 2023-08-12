const { Router } = require("express");
const feedbackRoute = Router();
const { isAdmin } = require("../middlewares/isAdmin");
const {
  getAllFeedbacks,
  getOneFeedback,
  deleteFeedback,
  addFeedback,
  updateFeedback,
} = require("../controllers/feedback-controller");
const { isAuth } = require("../middlewares/isAuth");
feedbackRoute.get("/feedbacks", isAuth, getAllFeedbacks);
feedbackRoute.get("/feedbacks/:id", isAuth, getOneFeedback);
feedbackRoute.delete("/feedbacks/:id", isAuth, isAdmin, deleteFeedback);
feedbackRoute.post("/feedback", isAuth, addFeedback);
feedbackRoute.put("/feedbacks/:id", isAuth, isAdmin, updateFeedback);
module.exports = {
  feedbackRoute,
};