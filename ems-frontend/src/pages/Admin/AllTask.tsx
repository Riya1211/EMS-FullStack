import React, from "react";
// import { getAllUserTask } from "../../redux/api/logInAPI";
import { useGetAllUserTaskAPIQuery } from "../../redux/api/Admin/taskAPI";
import { AdminAllUserTaskResponse } from "../../types/api-types";

const AllTask = () => {
  
  const {data} = useGetAllUserTaskAPIQuery<AdminAllUserTaskResponse>("");
  const userData = data?.users;
  return (
    <div className="bg-[#1c1c1c] p-5 rounded mt-5">
      <div className="bg-red-400 mb-2 py-2 px-4 flex justify-between rounded">
        <h2 className="text-lg font-medium w-1/5">Employee Name</h2>
        <h2 className="text-lg font-medium w-1/5">Employee Id</h2>
        <h3 className="text-lg font-medium w-1/5">New Task</h3>
        <h5 className="text-lg font-medium w-1/5">Active Task</h5>
        <h5 className="text-lg font-medium w-1/5">Completed</h5>
        <h5 className="text-lg font-medium w-1/5">Failed</h5>
      </div>
      <div className=''>
    {userData?.map(function(elem,idx){
        return <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
        <h2 className='text-lg font-medium  w-1/5'>{elem.name}</h2>
        <h2 className='text-lg font-medium  w-1/5'>{elem.empId}</h2>
        <h3 className='text-lg font-medium w-1/5 text-blue-400'>{elem.taskCounts.newTask}</h3>
        <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{elem.taskCounts.active}</h5>
        <h5 className='text-lg font-medium w-1/5 text-white'>{elem.taskCounts.completed}</h5>
        <h5 className='text-lg font-medium w-1/5 text-red-600'>{elem.taskCounts.failed}</h5>
    </div>
    })}
    </div> 
    </div>
  );
};

export default AllTask;