import React from "react";
import Header from "./Header";
import TaskListNumber from "../pages/Employee/TaskListNumber";
import TaskList from "../pages/Employee/TaskList";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../types/reducer-types";

const EmployeeDashboard = () => {

  const { user, loading } = useSelector(
    (state: { loginReducer: UserReducerInitialState }) => state.loginReducer
  );

  return (
    <div className="p-10 bg-[#1c1c1c] h-screen">
      <Header name={user?.user.name}/>
      <TaskListNumber id={user?.user.id}/>
      <TaskList empId = {user?.user.empId} id={user?.user.id}/>
    </div>
  );
};

export default EmployeeDashboard;
