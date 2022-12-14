import ErrorResponse from "../utils/errorResponse";

const errorHandler = (err: any, req: any, res: any) => {
  req;
  let error = { ...err };

  error.message = err.message;

  if (err.code === 11000) {
    const message = "Duplicate Field Value Entered";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(
      (value: any) => value.message
    );
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default errorHandler;
