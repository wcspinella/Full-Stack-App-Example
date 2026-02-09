import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const EditExercisePage = ({ exerciseToEdit }) => {
  const [name, setName] = useState(exerciseToEdit.name);
  const [reps, setReps] = useState(exerciseToEdit.reps);
  const [weight, setWeight] = useState(exerciseToEdit.weight);
  const [unit, setUnit] = useState(exerciseToEdit.unit);
  const [date, setDate] = useState(exerciseToEdit.date);

  const navigate = useNavigate();

  const editExercise = async () => {
    const editedExercise = { name, reps, weight, unit, date };
    const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(editedExercise),
    });
    if (response.status === 200) {
      alert("Exercise successfully updated");
    } else {
      alert(`Failed to edit exercise. Response code: ${response.status}`);
    }
    navigate("/");
  };

  return (
    <div className="edit-container">
      <h2 className="edit-page-header">Edit Exercise</h2>
      <div className="edit-input-rows">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.valueAsNumber)}
        />
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.valueAsNumber)}
        />
        <select name="unit" onChange={(e) => setUnit(e.target.value)}>
          <option value="">Unit</option>
          <option value="lbs">lbs</option>
          <option value="kgs">kgs</option>
        </select>
        <input
          type="string"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button onClick={editExercise} className="update-button">
        Update
      </button>
    </div>
  );
};

export default EditExercisePage;
