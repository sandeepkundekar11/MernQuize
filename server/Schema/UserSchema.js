const mongoose = require("mongoose");

// Define the schema for a user
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    
  },
  image: {
    type: String,
   
  },
  bio: {
    type: String,
    
  },
  lastName: {
    type: String,
   
  },
  email: {
    type: String,
 
  },
  password: {
    type: String,
   
  },
  createdquizes: [
    {
      ref: "Quize", // Reference to the Quize model for created quizzes
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  attenedquizes: [
    {
      ref: "Quize", // Reference to the Quize model for attended quizzes
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Default value is the current date and time
  },
  totalMarks: {
    type: Number,
    default: 0, // Default value for total marks is 0
  },
});

// Create the model for a user
const user = mongoose.model("User", userSchema);
// const user this variable store the reference to compile the model
// model name is User
// and collection is users
// basically mongodb convert the model name to lower case and make it plural

// Export the user model
module.exports = { user };
