const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", async ({ body }, res) => {
  console.log('apiRoutes post hit')
  const newWorkout = new Workout();
  await newWorkout.save();
  res.json(newWorkout)
});

router.put("/api/workouts/:id", async (req, res) => {
  console.log('apiRoutes put hit')
  const thisWorkout = await Workout.findOne({_id: req.params.id}).exec();
  thisWorkout.exercises.push(req.body);
  await thisWorkout.save();
  res.json(thisWorkout);
});

router.get("/api/workouts", async (req, res) => {
  console.log('apiRoutes get hit')
  const allWorkouts = await Workout.find({});
  res.json(allWorkouts);
});

module.exports = router;
