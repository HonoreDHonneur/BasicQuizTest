import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./css/App.css";

import Home from "./Home";
import Result from "./Result"; // Pages section
import EntrancePage from "./EntrancePage";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/entrancepage" />}></Route>
          <Route path="/home" element={<Home />} /> {/* Routers for pages */}
          <Route path="/result" element={<Result />} />
          <Route path="/entrancepage" element={<EntrancePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
