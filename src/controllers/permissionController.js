const {
  createPermission,
  addPermission,
  deletePermission,
  getPermissionUserById,
} = require("../services/permissionService");
const { errorResponse, successResponse } = require("../utils");

const permissionController = {};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

permissionController.create = async (req, res) => {
  try {
    const { name } = req.body;
    const permission = await createPermission({ name });
    return successResponse(res, 201, "Permission created success.", permission);
  } catch (err) {
    return errorResponse(res, 500, err?.message, err);
  }
};
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
permissionController.add = async (req, res) => {
  try {
    const { userId } = req.params;
    const { permissions = [] } = req?.body;
    const updatePermission = await addPermission(parseInt(userId), permissions);
    return successResponse(
      res,
      201,
      "Added Permission success.",
      updatePermission
    );
  } catch (err) {
    return errorResponse(res, 500, err?.message, err);
  }
};
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
permissionController.delete = async (req, res) => {
  try {
    const { userId } = req.params;
    const { permissions = [] } = req?.body;
    if (!permissions?.length || !Array.isArray(permissions)) {
      throw Error("Empty Permission");
    }
    const updatePermission = await deletePermission(
      parseInt(userId),
      permissions
    );
    return successResponse(
      res,
      200,
      "Delete Permission success.",
      updatePermission
    );
  } catch (err) {
    return errorResponse(res, 500, err?.message, err);
  }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
permissionController.getPermissionUserById = async (req, res) => {
  try {
    const { id } = await req?.user;
    const permissions = await getPermissionUserById(id);
    return successResponse(
      res,
      200,
      "Permission fetching success",
      permissions
    );
  } catch (err) {
    return errorResponse(res, 500, err?.message, err);
  }
};

module.exports = permissionController;
