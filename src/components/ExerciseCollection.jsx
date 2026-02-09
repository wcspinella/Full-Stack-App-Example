import ExerciseItem from "./ExerciseItem";

function ExerciseCollection({ exercises, onDelete, onEdit }) {
  return (
    <>
      <table className="collection-container">
        <thead className="table-header">
          <tr>
            <th className="table-name-header">Name</th>
            <th className="table-reps-header">Reps</th>
            <th className="table-weight-header">Weight</th>
            <th className="table-unit-header">Unit</th>
            <th className="table-date-header">Date</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise, i) => (
            <ExerciseItem
              exercise={exercise}
              onDelete={onDelete}
              onEdit={onEdit}
              key={i}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ExerciseCollection;
