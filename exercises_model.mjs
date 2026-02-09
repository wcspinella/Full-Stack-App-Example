/**
 * Add your first name and last name.
 * William Spinella
 */
import mongoose from "mongoose";
import "dotenv/config";

const EXERCISE_DB_NAME = "exercise_db";

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect() {
  try {
    connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
      dbName: EXERCISE_DB_NAME,
    });
    console.log("Successfully connected to MongoDB using Mongoose!");
  } catch (err) {
    console.log(err);
    throw Error(`Could not connect to MongoDB ${err.message}`);
  }
}

//Define the schema
const exerciseSchema = mongoose.Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: String, required: true },
});

const Exercise = mongoose.model(EXERCISE_DB_NAME, exerciseSchema);

//Create an exercise
const createExercise = async (name, reps, weight, unit, date) => {
  const exercise = new Exercise({
    name: name,
    reps: reps,
    weight: weight,
    unit: unit,
    date: date,
  });
  return exercise.save();
};

//Read an exercise
const findExercises = async () => {
  return Exercise.find();
};

//Read and exercise via ID
const findExerciseById = async (filter) => {
  const query = Exercise.findOne(filter);
  return query.exec();
};

//Update exercise via ID
const updateExercise = async (filter, updatedFields) => {
  const result = await Exercise.findOneAndUpdate(filter, updatedFields, {
    new: true,
  });
  return result;
};

//Delete exercise via ID
const deleteExercise = async (filter) => {
  const result = await Exercise.deleteOne(filter);
  return result.deletedCount;
};

export {
  connect,
  createExercise,
  findExercises,
  findExerciseById,
  updateExercise,
  deleteExercise,
};
