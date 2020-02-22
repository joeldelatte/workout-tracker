const mongoose = require("mongoose");
const {Schema} = mongoose;
// I copied this over to referrence for the syntax...change as needed:
const exerciseSchema = new Schema({
  type: {
    type: String, 
    required: false
  },
  name: {
    type: String, 
    required: false
  },
  weight: {
    type: Number, 
    required: false
  },
  sets: {
    type: Number, 
    required: false
  },
  reps: {
    type: Number, 
    required: false
  },
  duration: {
    type: Number, 
    required: false
  },
  distance: {
    type: Number, 
    required: false
  }
});
// chande the name of the variable after writing proper Schema above
const Exercise = mongoose.model("Exercise", exerciseSchema);
// name export same as above
module.exports = Exercise;
