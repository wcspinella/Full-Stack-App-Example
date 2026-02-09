import { Link } from "react-router-dom";
import "../App.css";

function Navigation() {
  return (
    <nav className="app-nav">
      <Link to="/" className="home-link">
        Home
      </Link>
      <Link to="/add" className="add-link">
        Add New Exercise
      </Link>
    </nav>
  );
}

export default Navigation;
