const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require("path");

const PORT = process.env.PORT || 3000;

const Exercise = require("./models/exercise");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutsdb", {useNewUrlParser: true});

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
    // console.log(req.body);
    // console.log(Exercise);
    const {
      day = new Date().setDate(new Date().getDate() - 10),
      type, name, weight, sets, reps, duration, distance
    } = req.body;
    const newExercise = new Exercise({ day, type, name, weight, sets, reps, duration, distance })
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

// app.get("/:id", (req, res) => {
//     Exercise.find(
//       {
//         _id: mongojs.ObjectId(req.params.id)
//       }
//     )
//     .then(dbExercise => {
//         res.json(dbExercise);
//     })
//     .catch(err => {
//         res.json(err);
//     });    
// })

app.put("api/workouts/:id", ({body, params}, res) => {
    console.log(params.id);
    Exercise.findOneAndUpdate(params.id, { $push: { exercises: body}})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
    // Exercise.update(
    //  {
    //     _id: mongojs.ObjectId(req.params.id)
    //  },
    //  {
    //     $set: {
    //       type: req.body.type,
    //       name: req.body.name,
    //       weight: req.body.weight,
    //       sets: req.body.sets,
    //       reps: req.body.reps,
    //       duration: req.body.duration,
    //       distance: req.body.distance
    //     }
    //   },
    //   (error, data) => {
    //     if (error) {
    //       res.send(error);
    //     } else {
    //       res.send(data);
    //     }
    //   }


    // )
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
    // console.log(req);
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