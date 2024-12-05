import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestingPage from "./pages/TestingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import AthleteDashboard from "./pages/AthleteDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import {
  ProtectedRoute,
  RoleProtectedRoute,
  UnauthorizedPage,
} from "./utils/ProtectedRoute";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route element={<RoleProtectedRoute allowedRoles={["athlete"]} />}>
        <Route path="/athlete/dashboard" element={<AthleteDashboard />} />
        <Route path="/testing" element={<TestingPage />} />
      </Route>

      <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* <Route path="/admin/testing" element={<Testing />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
