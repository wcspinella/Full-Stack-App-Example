import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddExercisePage from "./pages/AddExercisePage";
import EditExercisePage from "./pages/EditExercisePage";
import { useState } from "react";
import Navigation from "./components/Navigation";

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="app">
      <header>
        <h1>LogFit</h1>
        <p className="slogan">
          The all in one exercise tracking app that helps you log your workouts
          and see your progress over time.
        </p>
      </header>
      <Router>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={<HomePage setExerciseToEdit={setExerciseToEdit} />}
          ></Route>
          <Route path="/add" element={<AddExercisePage />}></Route>
          <Route
            path="/edit"
            element={<EditExercisePage exerciseToEdit={exerciseToEdit} />}
          ></Route>
        </Routes>
      </Router>
      <footer>&copy; William Spinella</footer>
    </div>
  );
}

export default App;
