import { useEffect, useState } from "react";
import { fetchCollection } from "../api";

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchCollection("leaderboard")
      .then((data) => {
        if (isMounted) {
          const sorted = [...data].sort((a, b) => {
            if (a.rank != null && b.rank != null) return a.rank - b.rank;
            return (b.points ?? 0) - (a.points ?? 0);
          });
          setEntries(sorted);
        }
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
      <h1>Leaderboard</h1>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {!loading && !error && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 && (
              <tr>
                <td colSpan="4">No leaderboard entries found.</td>
              </tr>
            )}
            {entries.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.rank ?? "—"}</td>
                <td>{entry.user?.name ?? entry.user ?? "—"}</td>
                <td>{entry.team?.name ?? entry.team ?? "—"}</td>
                <td>{entry.points ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leaderboard;
