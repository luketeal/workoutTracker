const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", async ({ body }, res) => {
  console.log('apiRoutes post hit')
  // console.log(body)
  // Workout.create(body)
  //   .then(dbWorkout => {
  //     res.json(dbWorkout);
  //   })
  //   .catch(err => {
  //     res.status(400).json(err);
  //   });

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

router.get("/api/workouts", (req, res) => {
  console.log('apiRoutes get hit')
  // console.log(req)
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
