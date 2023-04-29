import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Add from "./pages/Add";
import Items from "./pages/Items";
import Update from "./pages/Update";
import Signup from "./pages/Signup";
import Login from "./pages/Login";


function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
