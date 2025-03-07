require("dotenv").config();
module.exports = {
  PORT: process.env.PORT,
  JWT_EXPIRED: process.env?.JWT_EXPIRED,
  JWT_SECRET: process?.env?.JWT_SECRET,
};
