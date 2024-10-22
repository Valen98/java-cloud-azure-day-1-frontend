import "./App.css";
import Dashboard from "./components/dashboard/dashboard";
import { Routes, Route } from "react-router-dom";
import NewMusic from "./components/forms/newMusic";

function App() {
  return (
    <div className="mainBody">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="createNew" element={<NewMusic />}/>
      </Routes>
    </div>
  );
}

export default App;
