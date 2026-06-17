import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (

      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />        

      </Routes>

  );
}

export default App;