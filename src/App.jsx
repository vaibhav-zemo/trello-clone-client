import Default from "./layouts/Default";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Default />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<Default />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
