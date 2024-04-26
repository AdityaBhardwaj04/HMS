import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import RegistrationPage from "./pages/RegistrationPage";
import AppointmentWidget from "./components/AppointmentWidget";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/patient" element={<AppointmentWidget />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
