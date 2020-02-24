const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require("path");
require('dotenv').config()

const PORT = process.env.PORT || 3000;

const Exercise = require("./models/exercise");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutsdb", ({useNewUrlParser: true, useFindAndModify: false}));

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/your-app-name');
// write routes here...

// html routes

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
});

// api routes

app.post("/api/workouts", (req, res) => {
    const {
      day = new Date().setDate(new Date().getDate() - 10),
      name, weight, sets, reps, totalDuration, distance
    } = req.body;
    const newExercise = new Exercise({ day, name, weight, sets, reps, totalDuration, distance })
    newExercise.save(err => {
      if(err) {
        res.status(500).json({
          success: false,
          message: "Error posting Exercise, please try again"
        })
      } else {
        res.status(200).json({
          success: true,
          message: "posting succesful"
        })
      }
    });
});    

app.get("/:id", (req, res) => {
    let query = req.params.id;
    Exercise.find({
        'request': query 
    })
    .then(dbExercise => {
        res.json(dbExercise);
    })
    .catch(err => {
        res.json(err);
    });    
});

app.put("/api/workouts/:id", ({body, params}, res) => {

  Exercise.findByIdAndUpdate(params.id, { $push: { exercises: body}})
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) =>{
    Exercise.find({})
    .then(dbExercise => {
        res.json(dbExercise);
    })
    .catch(err => {
        res.json(err);
    });
});

app.get("/api/workouts", (req, res) => {
    Exercise.find({})
    .then(dbExercise => {
        res.json(dbExercise);
    })
    .catch(err => {
        res.json(err);
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});