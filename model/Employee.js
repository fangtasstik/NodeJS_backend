const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
});

// Mongoose automatically looks for the plural, lowercased version of your model name. employees in this case.
module.exports = mongoose.model("Employee", employeeSchema);
