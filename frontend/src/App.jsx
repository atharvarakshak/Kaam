import { Routes, Route } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import HomePage from "./pages/HomePage";
import TestingPage from "./pages/TestingPage";
// import DrugTest from "./pages/DrugTest";
import Resources from "./pages/Resources";
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
import DrugTest from "./pages/DrugTest";
import Navbar from "./components/Navbar";
import TermsAndConditions from "./components/TermsAndConditions";
import ContactPage from "./pages/ContactPage";
import Search from "./pages/Search";
import SearchResult from "./pages/SearchResult";


function App() {
  const { user, isSignedIn } = useUser();
  const hasAcceptedTerms = isSignedIn && user?.unsafeMetadata?.termsAccepted;
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            isSignedIn && !hasAcceptedTerms ? (
              <TermsAndConditions redirectTo="/" />
            ) : (
              <HomePage />
            )
          }
        />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route element={<RoleProtectedRoute allowedRoles={["athlete"]} />}>
          <Route path="/athlete/dashboard" element={<AthleteDashboard />} />
          {/* <Route path="/resources" element={<Resources />} /> */}
        </Route>

        <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/testing" element={<TestingPage />} />
          <Route path="/drugtest" element={<DrugTest />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:id" element={<SearchResult />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* <Route path="/admin/testing" element={<Testing />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
