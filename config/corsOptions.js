const { allowedOrigins } = require("../config/allowedOrigins")

const corsOptions = {
	origin: function (origin, callback) {
		// @NOTE: check if origin is in the allowedOrigins || origin is not undefined/empty
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			// ExpressJS has built-in error handler
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionSuccessStatus: 200,
};

module.exports = corsOptions;