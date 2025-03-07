const prisma = require("../lib/prisma");

const permissionServer = {};

permissionServer.createPermission = async (data) => {
  try {
    return await prisma.permission.create({
      data,
    });
  } catch (err) {
    throw err;
  }
};
permissionServer.addPermission = async (userId, permissions = []) => {
  try {
    const perms = await prisma.user.update({
      where: { id: userId },
      data: {
        permissions: {
          connect: permissions.map((id) => ({ id: parseInt(id) })),
        },
      },
      include: { permissions: true },
    });
    return perms;
  } catch (err) {
    throw err;
  }
};
permissionServer.deletePermission = async (userId, permissions = []) => {
  try {
    const perms = await prisma.user.update({
      where: { id: userId },
      data: {
        permissions: {
          disconnect: permissions.map((id) => ({ id: parseInt(id) })),
        },
      },
      include: { permissions: true },
    });
    return perms;
  } catch (err) {
    throw err;
  }
};

permissionServer.getPermissionUserById = async (userId) => {
  try {
    const permissions = await prisma.user.findMany({
      where: { id: userId },
      select: { permissions: true },
    });
    return permissions;
  } catch (err) {
    throw err;
  }
};
module.exports = permissionServer;
