import { Link, NavLink, Route, Routes } from "react-router-dom";
import logo from "./assets/octofitapp-small.png";
import Activities from "./components/Activities";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import Users from "./components/Users";
import Workouts from "./components/Workouts";
import "./App.css";

function Home() {
  return (
    <div>
      <h1>Welcome to Octofit Tracker</h1>
      <p>
        Track activities, join teams, follow workout suggestions, and climb the
        leaderboard.
      </p>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>Page not found</h1>
      <p>
        Return to <Link to="/">home</Link>.
      </p>
    </div>
  );
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={logo}
              alt="Octofit Tracker logo"
              width="32"
              height="32"
              className="me-2"
            />
            Octofit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">
                  Workouts
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
