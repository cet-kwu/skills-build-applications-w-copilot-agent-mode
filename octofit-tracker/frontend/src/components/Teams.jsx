import { useEffect, useState } from "react";
import { fetchCollection } from "../api";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchCollection("teams")
      .then((data) => {
        if (isMounted) setTeams(data);
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
      <h1>Teams</h1>
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {!loading && !error && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.length === 0 && (
              <tr>
                <td colSpan="2">No teams found.</td>
              </tr>
            )}
            {teams.map((team) => (
              <tr key={team._id}>
                <td>{team.name}</td>
                <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Teams;
