const { updateUser } = require("../services/userService");
const { errorResponse, successResponse } = require("../utils");

const userController = {};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

userController.update = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const data = {};
    Object.keys(body).forEach((key) => {
      if (body[key]) {
        data[key] = body[key];
      }
    });
    delete data?.password;
    delete data?.email;
    const user = await updateUser(parseInt(id), data);
    return successResponse(res, 200, "Update user success.", user);
  } catch (err) {
    return errorResponse(res, 500, err?.message, err);
  }
};

module.exports = userController;
