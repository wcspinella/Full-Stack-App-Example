import "../App.css";
import { TiEdit } from "react-icons/ti";
import { MdOutlineDeleteForever } from "react-icons/md";

function ExerciseItem({ exercise, onDelete, onEdit }) {
  return (
    <tr className="exercise-item">
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date}</td>
      <button className="edit-button">
        <TiEdit
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onEdit(exercise);
          }}
        />
      </button>
      &nbsp;
      <button className = "delete-button">
        <MdOutlineDeleteForever
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onDelete(exercise._id);
          }}
        />
      </button>
    </tr>
  );
}

export default ExerciseItem;
