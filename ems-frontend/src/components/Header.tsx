import React from 'react'
import { userNotExist } from '../redux/reducer/loginReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { taskAPI } from '../redux/api/Admin/taskAPI';
import { employeeTaskAPI } from '../redux/api/taskAPI';
import { employeeTaskCountAPI } from '../redux/api/employeeTaskCountAPI';

const Header = ({name}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");

    // Clear user data from Redux store
    dispatch(userNotExist());

    // Reset task API cache
    dispatch(taskAPI.util.resetApiState()); // This clears any cached data
    dispatch(employeeTaskAPI.util.resetApiState()); // This clears any cached data
    dispatch(employeeTaskCountAPI.util.resetApiState()); // This clears any cached data

    toast.success("Logged out successfully!");

    // Redirect to login page
    navigate("/");
  };
      return (
        <div className='flex items-end justify-between'>
            <h1 className='text-2xl'>Hello <br /> <span className='text-3xl font-semibold'>{name} 🤙</span></h1>
            <button onClick={handleLogout} className='bg-red-600 text-lg text-medium text-white px-5 py-2 rounded-sm'>Log Out</button>
        </div>
      )
}

export default Header