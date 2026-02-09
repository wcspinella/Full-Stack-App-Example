/**
 * Add your first name and last name.
 * William Spinella
 */
import "dotenv/config";
import express from "express";
import asyncHandler from "express-async-handler";
import * as exercises from "./exercises_model.mjs";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
const ERROR_NOT_FOUND = { Error: "Not found" };
const ERROR_INVALID_REQUEST = { Error: "Invalid request" };

app.listen(PORT, async () => {
  await exercises.connect();
  console.log(`Server listening on port ${PORT}...`);
});

function isDateValid(date) {
  const format = /^\d\d-\d\d-\d\d$/;
  return format.test(date);
}

//Create an exercise
app.post(
  "/exercises",
  asyncHandler(async (req, res) => {
    if (
      !req.body.name ||
      !req.body.reps ||
      req.body.reps < 0 ||
      // typeof req.body.reps !== Number.isInteger ||
      typeof req.body.reps !== "number" ||
      !req.body.weight ||
      req.body.weight < 0 ||
      typeof req.body.weight !== "number" ||
      // typeof req.body.weight !== Number.isInteger ||
      !req.body.unit ||
      (req.body.unit !== "kgs" && req.body.unit !== "lbs") ||
      !isDateValid(req.body.date)
    ) {
      return res.status(400).json(ERROR_INVALID_REQUEST);
    }

    const exercise = await exercises.createExercise(
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date
    );
    res.status(201).json(exercise);
  })
);

//Read an exercise
app.get(
  "/exercises",
  asyncHandler(async (req, res) => {
    const exerciseList = await exercises.findExercises();
    res.status(200).json(exerciseList);
  })
);

//Read an exercise via ID
app.get(
  "/exercises/:id",
  asyncHandler(async (req, res) => {
    const exercise = await exercises.findExerciseById({ _id: req.params.id });
    if (exercise === null) {
      res.status(404).json(ERROR_NOT_FOUND);
    } else {
      res.status(200).json(exercise);
    }
  })
);

//Update exercise via ID
app.put(
  "/exercises/:id",
  asyncHandler(async (req, res) => {
    if (
      !req.body.name ||
      !req.body.reps ||
      req.body.reps < 0 ||
      // typeof req.body.reps !== Number.isInteger ||
      typeof req.body.reps !== "number" ||
      !req.body.weight ||
      req.body.weight < 0 ||
      typeof req.body.weight !== "number" ||
      // typeof req.body.weight !== Number.isInteger ||
      !req.body.unit ||
      (req.body.unit !== "kgs" && req.body.unit !== "lbs") ||
      !isDateValid(req.body.date)
    ) {
      return res.status(400).json(ERROR_INVALID_REQUEST);
    }
    const exercise = await exercises.updateExercise(
      { _id: req.params.id },
      {
        name: req.body.name,
        reps: req.body.reps,
        weight: req.body.weight,
        unit: req.body.unit,
        date: req.body.date,
      }
    );
    if (exercise === null) {
      res.status(404).json(ERROR_NOT_FOUND);
    } else {
      res.status(200).json(exercise);
    }
  })
);

//Delete exercise via ID
app.delete(
  "/exercises/:id",
  asyncHandler(async (req, res) => {
    const exercise = await exercises.deleteExercise({ _id: req.params.id });
    if (exercise === 0) {
      res.status(404).json(ERROR_NOT_FOUND);
    } else {
      res.status(204).send();
    }
  })
);
