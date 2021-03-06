const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", async ({ body }, res) => {
  const newWorkout = new Workout();
  await newWorkout.save();
  res.json(newWorkout)
});

router.put("/api/workouts/:id", async (req, res) => {
  const thisWorkout = await Workout.findOne({_id: req.params.id}).exec();
  thisWorkout.exercises.push(req.body);
  await thisWorkout.save();
  res.json(thisWorkout);
});

router.get("/api/workouts", async (req, res) => {
  const allWorkouts = await Workout.find({}).sort({day: 'ascending'});
  res.json(allWorkouts);
});

router.get("/api/workouts/range", async (req, res) => {  
  const allWorkouts = await Workout.find({}).sort({day: 'ascending'}).limit(7);
  res.json(allWorkouts);
});

module.exports = router;
