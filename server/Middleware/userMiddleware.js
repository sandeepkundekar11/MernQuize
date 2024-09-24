const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Middleware to protect routes and ensure the user is authenticated
const protect = asyncHandler(async (req, res, next) => {
    // Get the token from the authorization header
    let token = req.headers["authorization"];
    if (token) {
        // Split the token to get the actual token value
        let token = token.split(" ")[1];
        try {
            // Verify the token using the secret key
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            if (decode) {
                // If the token is valid, set the userId in the request object
                req.userId = decode._id;
                next();
            }
            else {
                // If the token is invalid, respond with a 401 status
                res.status(401);
                throw new Error("Not authorized, token is invalid");
            }
        } catch (error) {
            // Log any errors that occur during token verification
            console.log(error);
        }
    }
    else {
        // If the token is missing, respond with a 401 status
        res.status(401);
        throw new Error("Not authorized, token is missing");
    }
});

module.exports = { protect };
