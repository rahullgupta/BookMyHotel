import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Bookings from "./pages/Bookings";
import Remove from "./pages/Remove";
import Change from "./pages/Change";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/addbooking" exact element={<Bookings />} />
        <Route path="/editbooking" exact element={<Change />} />
        <Route path="/deletebooking" exact element={<Remove />} />
        <Route path="/viewbooking" exact element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
