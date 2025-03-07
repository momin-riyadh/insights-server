const express = require("express");
const authRouter = require("./authRoute");
const userRouter = require("./userRouter");
const permissionRouter = require("./permissionRouter");

const router = express.Router();

const commonEndpoint = `/api/v1`;

router.use(`${commonEndpoint}/auth`, authRouter);
router.use(`${commonEndpoint}/user`, userRouter);
router.use(`${commonEndpoint}/permission`, permissionRouter);

module.exports = router;
