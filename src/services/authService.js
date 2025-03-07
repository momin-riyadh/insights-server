const prisma = require("../lib/prisma");

const authService = {};

authService.createUser = async (data) => {
  try {
    return await prisma.user.create({
      data: {
        ...data,
        permissions: { connect: data?.permissions.map((id) => ({ id })) },
      },
    });
  } catch (err) {
    throw err;
  }
};

authService.login = async (data) => {
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

module.exports = authService;
