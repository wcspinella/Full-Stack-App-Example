import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddExercisePage = () => {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const addExercise = async () => {
    const newExercise = { name, reps, weight, unit, date };
    const response = await fetch("/exercises", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newExercise),
    });
    if (response.status === 201) {
      alert("Exercise successfully created");
    } else {
      alert(`Failed to add exercise. Response code: ${response.status}`);
    }
    navigate("/");
  };

  return (
    <div className = "add-container">
      <h2 className="add-page-header">Add Exercise</h2>
      <div className = "add-input-rows">
      <input
        type="text"
        placeholder="Exercise Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        value={reps}
        placeholder="Reps"
        onChange={(e) => setReps(e.target.valueAsNumber)}
      />
      <input
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.valueAsNumber)}
      />
      <select
        name = "unit"
        onChange={(e) => setUnit(e.target.value)}>
          <option value = "">Unit</option>
          <option value = "lbs">lbs</option>
          <option value = "kgs">kgs</option>
      </select>
      <input
        type="string"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      </div>
      <button onClick={addExercise} className ="add-page-button">Add</button>
    </div>
  );
};

export default AddExercisePage;
