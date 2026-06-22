import {
  Navigate,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import FamilyLogin from "./pages/FamilyLogin";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const isFamilyLoggedIn =
    localStorage.getItem("familyLoggedIn") === "true";

  if (!isFamilyLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return children;
}

function App() {
  return (

      <Routes>
        <Route
          path="/login"
          element={<FamilyLogin />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:phone"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-login"
          element={
            <ProtectedRoute>
              <AdminLogin />
            </ProtectedRoute>
          }
        />        

      </Routes>

  );
}

export default App;
