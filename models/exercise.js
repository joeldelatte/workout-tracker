const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  day: Date,
  exercises:  [
    {
        formType: String,
        name: String,
        totalDuration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number
    }
  ]
});
// chande the name of the variable after writing proper Schema above
const Exercise = mongoose.model("Exercise", ExerciseSchema);
// name export same as above
module.exports = Exercise;
