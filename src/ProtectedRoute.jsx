import React from 'react'
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token");
    let location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
};

export default ProtectedRoute;