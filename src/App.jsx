import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontendLayout from "./layouts/FrontendLayout"; 
import Home from "./pages/Home";  
import DoctorsList from "./pages/Dashboard/Admin/DoctorsList";
import PatientsList from "./pages/Dashboard/Admin/PatientsList"; 
import TotalAppointments from "./pages/Dashboard/Doctor/TotalAppointments"; 
import Advices from "./pages/Dashboard/Doctor/Advices"; 
import MyAppointments from "./pages/Dashboard/Patient/MyAppointments";
import DoctorUpdate from "./pages/Dashboard/Patient/DoctorUpdate";  
import DoctorProfile from "./pages/Dashboard/Doctor/DoctorProfile";
import AdminProfile from "./pages/Dashboard/Admin/AdminProfile";
import PatientProfile from "./pages/Dashboard/Patient/PatientProfile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DoctorsListForPatient from "./pages/Dashboard/Patient/DoctorsListForPatient"; 
import FeedbackList from "./pages/Dashboard/Admin/FeedbackList";

function App() {
  return (
    <Router>
      <Routes>
        {/* Frontend Route */}
        <Route path="/" element={<FrontendLayout> <Home /> </FrontendLayout>} />
        <Route path="/signIn" element={<FrontendLayout> <SignIn /> </FrontendLayout>} />
        <Route path="/signUp" element={<FrontendLayout> <SignUp /> </FrontendLayout>} />

        <Route path="/admin/doctors-list" element={<DoctorsList />} />
        <Route path="/admin/patients-list" element={<PatientsList />} />
        <Route path="/admin/feedback-list" element={<FeedbackList />} />
        <Route path="/admin/profile" element={<AdminProfile />} />

        <Route path="/doctor/total-appointments" element={<TotalAppointments />} />
        <Route path="/doctor/Advices" element={<Advices />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />

        <Route path="/patient/doctors-list" element={<DoctorsListForPatient />} />
        <Route path="/patient/doctors-update" element={<DoctorUpdate />} />
        <Route path="/patient/my-appointments" element={<MyAppointments />} />
        <Route path="/patient/profile" element={<PatientProfile />} />






      </Routes>
    </Router>
  );
}

export default App;
