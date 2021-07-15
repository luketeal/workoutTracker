const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
    required: true
  },
  exercises: [
    {    
      type: {
        type: String,
        trim: true,
        required: "Enter a type for exercise"
      },
      name: {
        type: String,
        trim: true,
        required: "Enter a name for exercise"
      },
      duration: {
        type: Number,
        required: "Enter a duration for exercise"
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: {
        type: Number,
      },
    }
  ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;