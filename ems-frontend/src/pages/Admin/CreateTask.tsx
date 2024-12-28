import React, { useState } from "react";
import {
  taskAPI,
  useCreateNewTaskMutation,
} from "../../redux/api/Admin/taskAPI";
import { useSelector } from "react-redux";

const CreateTask = () => {
  const [createNewTask] = useCreateNewTaskMutation();

  //selectFromResult worked as useMemo
  const { usersData } = taskAPI.useGetAllUserTaskAPIQuery("", {
    selectFromResult: (result) => ({
      usersData: result.data?.users, // Extract only the necessary part
    }),
  });

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [asignTo, setAsignTo] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [category, setCategory] = useState("");
  const [myError, setError] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate Employee ID and Name
    if (!usersData) {
      setError("No user data available.");
      return;
    }

    // Find the user with the matching employeeId
    const matchedUser = usersData.find(
      (user) =>
        user.empId == employeeId &&
        user.name.toLowerCase() === asignTo.toLowerCase()
    );

    if (!matchedUser) {
      setError("Employee ID or Name does not match any user.");
      return;
    }

    setError(""); // Clear any previous error

    // Directly create the new task object
    const newTask = {
      taskTitle,
      taskDesc,
      taskDate,
      category,
      employeeId,
    };

    try {
      const response = await createNewTask(newTask).unwrap();
    } catch (error) {
      console.error(error);
    }

    setTaskTitle("");
    setTaskDescription("");
    setTaskDate("");
    setAsignTo("");
    setEmployeeId("");
    setCategory("");
  };

  return (
    <div className="p-5 bg-[#1c1c1c] mt-5 rounded">
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex flex-wrap w-full items-start justify-between"
      >
        <div className="w-1/2">
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
              }}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Make a UI design"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => {
                setTaskDate(e.target.value);
              }}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="date"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Asign to</h3>
            <input
              value={asignTo}
              onChange={(e) => {
                setAsignTo(e.target.value);
              }}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Employee Name"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Employee Id</h3>
            <input
              value={employeeId}
              onChange={(e) => {
                setEmployeeId(e.target.value);
              }}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Employee Id"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
            <input
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Design, Dev, etc"
            />
          </div>
        </div>

        <div className="w-2/5 flex flex-col items-start">
          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
          <textarea
            value={taskDesc}
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
            className="w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400"
            name=""
            id=""
          ></textarea>
          <button className="bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
