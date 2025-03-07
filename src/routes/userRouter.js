const express = require("express");
const { update } = require("../controllers/userController");
const { authChecker } = require("../middlewares/common");

const userRouter = express.Router();

userRouter.patch("/:id", authChecker(true), update);

module.exports = userRouter;
