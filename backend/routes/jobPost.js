const express = require("express");
const { createNewComment } = require("../controllers/comment");
const {
  createPostJob,
  getAllJob,
  getJobById,
  updateJob,
  deleteJob,
  
} = require("../controllers/jobPost");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const jobRouter = express.Router();
jobRouter.post(
  "/",
  authentication,
  authorization("CREATE_POST"),
  createPostJob
);
jobRouter.get("/", getAllJob);
jobRouter.get("/com", authentication, getJobById);
jobRouter.put("/update/:id", authentication, updateJob);
jobRouter.delete("/delete/:id", authentication, deleteJob);
jobRouter.post("/:id/comments/", authentication, createNewComment);

module.exports = jobRouter;
