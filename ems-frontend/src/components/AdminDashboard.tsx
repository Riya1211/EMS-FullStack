import React from "react";
import Header from "./Header";
import CreateTask from "../pages/Admin/CreateTask";
import AllTask from "../pages/Admin/AllTask";
import { UserReducerInitialState } from "../types/reducer-types";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { user, loading } = useSelector(
    (state: { loginReducer: UserReducerInitialState }) => state.loginReducer
  );

  return (
    <div className="h-screen w-full p-10">
      <Header name={user?.user.name}/>
      <CreateTask />
      <AllTask />
    </div>
  );
};

export default AdminDashboard;
