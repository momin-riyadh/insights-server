const express = require("express");
const { update, get } = require("../controllers/userController");
const { authChecker } = require("../middlewares/common");

const userRouter = express.Router();

userRouter.patch("/:id", authChecker(true), update);
userRouter.get("/", authChecker(), get);

module.exports = userRouter;
