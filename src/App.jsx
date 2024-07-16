import Default from "./layouts/Default";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import TaskBoard from "./pages/TaskBoard";

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
        <Route path="/" index element={<Home />} />
        <Route path="/tasks/:projectId" element={<TaskBoard />} />
      </Route>
      <Route element={<Default />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
