import { Link } from "react-router-dom";
import ExerciseCollection from "../components/ExerciseCollection";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage({ setExerciseToEdit }) {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  const loadExercises = async () => {
    const response = await fetch("/exercises");
    const data = await response.json();
    setExercises(data);
  };

  useEffect(() => {
    loadExercises();
  }, []);

  const onDelete = async (_id) => {
    const response = await fetch(`/exercises/${_id}`, { method: "DELETE" });
    if (response.status === 204) {
      setExercises(exercises.filter((m) => m._id !== _id));
    } else {
      alert(`Failed to delete exercise, response code ${response.status}`);
    }
  };

  const onEdit = (exercise) => {
    setExerciseToEdit(exercise);
    navigate("/edit");
  };

  return (
    <div className = "home-page-body">
      <h2>Exercise Tracker</h2>
      <p>Log your exercises here!</p>
      <ExerciseCollection
        exercises={exercises}
        onDelete={onDelete}
        onEdit={onEdit}
      ></ExerciseCollection>
    </div>
  );
}

export default HomePage;
