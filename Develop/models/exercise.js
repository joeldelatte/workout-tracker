const mongoose = require("mongoose");
const {Schema} = mongoose;
// I copied this over to referrence for the syntax...change as needed:
const exerciseSchema = new Schema({
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
const Exercise = mongoose.model("Exercise", exerciseSchema);
// name export same as above
module.exports = Exercise;
