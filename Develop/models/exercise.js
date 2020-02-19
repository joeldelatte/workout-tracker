const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// I copied this over to referrence for the syntax...change as needed:
const ExerciseSchema = new Schema({
  type: {
    type: String, 
    required: true
  },
  name: {
    type: String, 
    required: true
  },
  weight: {
    type: Number, 
    required: true
  },
  sets: {
    type: Number, 
    required: true
  },
  reps: {
    type: Number, 
    required: true
  },
  duration: {
    type: Number, 
    required: true
  },
  distance: {
    type: Number, 
    required: true
  }
});
// chande the name of the variable after writing proper Schema above
const Exercise = mongoose.model("Exercise", ExerciseSchema);
// name export same as above
module.exports = Exercise;
