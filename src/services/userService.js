const prisma = require("../lib/prisma");

const userServer = {};

userServer.updateUser = async (id, data) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: data,
    });
  } catch (err) {
    throw err;
  }
};

userServer.login = async (data) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: data?.email },
      include: { permissions: true },
    });
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = userServer;
