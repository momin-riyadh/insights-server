const express = require("express");
const { authChecker } = require("../middlewares/common");
const permissionController = require("../controllers/permissionController");

const permissionRouter = express.Router();

permissionRouter.post(`/`, authChecker(true), permissionController.create);
permissionRouter.get(
  `/`,
  authChecker(),
  permissionController.getPermissionUserById
);

permissionRouter.patch("/:userId", authChecker(true), permissionController.add);
permissionRouter.delete(
  "/:userId",
  authChecker(true),
  permissionController.delete
);

module.exports = permissionRouter;
