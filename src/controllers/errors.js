// This controller does not need any data from the database

// Create an error so the global error handler can display the error page
const testErrorPage = (req, res, next) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
};

// Make the controller available to the routes
export { testErrorPage };