import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/page/Home";
import EditUserModal from "./components/page/EditUserModal";
import AddUser from "./users/AddUser";
function App() {
  return (
    <div className="App">

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/editUser/:id" element={<EditUserModal />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
