import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./components/Home";
import Dashboard from "./components/dashboard/Dashboard";
import HeartForm from "./components/HeartForm";
import DiabetesForm from "./components/DiabetesForm";
import LiverForm from "./components/LiverForm";
import ResultPage from "./pages/ResultPage";
import ProcessingPage from "./pages/ProcessingPage";
import ChoosePrediction from "./pages/ChoosePrediction";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/heart" element={<HeartForm />} />
        <Route path="/diabetes" element={<DiabetesForm />} />
        <Route path="/liver" element={<LiverForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        <Route path="/choose" element={<ChoosePrediction />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;