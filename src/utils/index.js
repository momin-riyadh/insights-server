/**
 * Sends a standardized success response.
 * @param {express.Response} res - The Express response object.
 * @param {number} statusCode - The HTTP status code.
 * @param {string} message - A success message.
 * @param {Object|Array} [data] - The data to return (optional).
 */
const successResponse = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };
  
  /**
   * Sends a standardized error response.
   * @param {express.Response} res - The Express response object.
   * @param {number} statusCode - The HTTP status code.
   * @param {string} message - An error message.
   * @param {Object|Array} [error] - Additional error details (optional).
   */
  const errorResponse = (
    res,
    statusCode = 400,
    message = "something went wrong",
    error = {}
  ) => {
    res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse,
  };