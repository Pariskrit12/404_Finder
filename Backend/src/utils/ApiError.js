class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something Went Wrong",
        errors = [],
        stack = ""
    ) {
        super(message);  // Call parent constructor with the message
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;

        // If stack is provided, use it; otherwise, capture the stack trace
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export {ApiError}