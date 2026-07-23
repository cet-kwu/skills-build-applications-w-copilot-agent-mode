import { useEffect, useState } from "react";
import { fetchCollection } from "../api";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchCollection("workouts")
      .then((data) => {
        if (isMounted) setWorkouts(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h1>Workouts</h1>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {!loading && !error && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Difficulty</th>
              <th>Suggested for</th>
            </tr>
          </thead>
          <tbody>
            {workouts.length === 0 && (
              <tr>
                <td colSpan="4">No workouts found.</td>
              </tr>
            )}
            {workouts.map((workout) => (
              <tr key={workout._id}>
                <td>{workout.name}</td>
                <td>{workout.description ?? "—"}</td>
                <td>{workout.difficulty}</td>
                <td>
                  {Array.isArray(workout.suggestedFor)
                    ? `${workout.suggestedFor.length} user(s)`
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Workouts;
