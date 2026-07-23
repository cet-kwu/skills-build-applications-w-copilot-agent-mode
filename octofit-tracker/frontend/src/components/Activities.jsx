import { useEffect, useState } from "react";
import { fetchCollection } from "../api";

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
}

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchCollection("activities")
      .then((data) => {
        if (isMounted) setActivities(data);
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
      <h1>Activities</h1>
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {!loading && !error && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Calories burned</th>
              <th>Date</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 && (
              <tr>
                <td colSpan="5">No activities found.</td>
              </tr>
            )}
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes}</td>
                <td>{activity.caloriesBurned ?? "—"}</td>
                <td>{formatDate(activity.date)}</td>
                <td>{activity.user?.name ?? activity.user ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Activities;
