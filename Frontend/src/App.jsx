import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Explanation from "./Components/Explanation/Explanation";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/try" element={<Explanation />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;