import React, { useEffect } from 'react'
import Login from './pages/Login'
import AdminDashboard from './components/AdminDashboard'
import EmployeeDashboard from './components/EmployeeDashboard'
import {Toaster} from 'react-hot-toast'
import Loader from './components/Loader'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { useDispatch, useSelector } from 'react-redux'
import { UserReducerInitialState } from './types/reducer-types'
import { userExist } from './redux/reducer/loginReducer'
const App = () => {
  const { user, loading } = useSelector(
    (state: { loginReducer: UserReducerInitialState }) => state.loginReducer
  );
  
  const dispatch = useDispatch();
  const storedUser = localStorage.getItem("user");
  
  useEffect(() => {
    if (storedUser && !user) {
      dispatch(userExist(JSON.parse(storedUser)));
    }
  }, [dispatch, storedUser, user]);
  const isAuthenticated = !!user?.user;
  const role = user?.user?.role;

  return loading ? (
    <Loader />
  ) : (
    <> 
      <Router>
        <Routes>
          {/* Login Route */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={role === "admin" ? "/admin/dashboard" : "/employee/dashboard"} />
              ) : (
                <Login />
              )
            }
          />

          {/* Employee Dashboard Route */}
          <Route
            path="/employee/dashboard"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={role}
                requiredRole="employee"
                element={<EmployeeDashboard />}
              />
            }
          />

          {/* Admin Dashboard Route */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={role}
                requiredRole="admin"
                element={<AdminDashboard />}
              />
            }
          />

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster position="bottom-center" />
      </Router>
    </>
  );
}

export default App