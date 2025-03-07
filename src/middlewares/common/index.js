const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const notFoundHandler = (req, res, next) => {
  next(createHttpError(404, "Your requested content not found!"));
};
const errorHandler = (err, req, res, next) => {
  res.status(400).json(err);
};

const authChecker = (isAdminOnly = false) => {
  return async (req, res, next) => {
    try {
      // Get token from headers (usually passed in the 'Authorization' header)
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "No token provided" });
      }
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (isAdminOnly) {
        if (["admin", "super-admin"].includes(decoded?.role)) {
           (req.user = decoded);
           return next()
        } else {
          throw Error("Only Permission for admin");
        }
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Unauthorized", error: error.message });
    }
  };
};

module.exports = { errorHandler, notFoundHandler, authChecker };
