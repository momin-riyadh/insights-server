const bcrypt = require("bcryptjs");
const { createUser, login } = require("../services/authService");
const { successResponse, errorResponse } = require("../utils");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRED } = require("../config");
const authController = {};
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

authController.register = async (req, res) => {
  try {
    const { email, password, role, company, permissions = [], name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      email,
      name,
      password: hashedPassword,
      role,
      permissions,
      company,
    });

    return successResponse(res, 201, "Registration successful", user);
  } catch (error) {
    return errorResponse(res, 500, error?.message);
  }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login({ email });
    const matched = await bcrypt.compare(password, user?.password);
    if (matched) {
      delete user.password;
      delete user.permissions;
      const accessToken = jwt.sign(user, JWT_SECRET, {
        expiresIn: JWT_EXPIRED,
      });
      return successResponse(res, 200, "Login successfully done", {
        ...user,
        accessToken,
      });
    } else {
      throw Error("Credentials invalid!");
    }
  } catch (err) {
    return errorResponse(res, 500, err?.message, err);
  }
};

module.exports = authController;
