const router = require("express").Router();
const Exercise = require("../models/exercise");

router.post("/api/workouts", ({ body }, res) => {
    Exercise.create(body)
      .then(dbExercise => {
        res.json(dbExercise);
      })
      .catch(err => {
        res.status(400).json(err);
      });
});

router.put("/api/workouts/:id", (req, res) => {
    Exercise.update(
     {
        _id: mongojs.ObjectId(req.params.id)
     },
        
    )
});

router.get("/api/workouts", (req, res) => {
    console.log(res);
    Exercise.find({})
    .then(dbExercise => {
        res.json(dbExercise);
    })
    .catch(err => {
        res.json(err);
    })
})

module.exports = router;