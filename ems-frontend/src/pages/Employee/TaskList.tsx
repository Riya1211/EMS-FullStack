import React, { useEffect, useState } from "react";
import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import NewTask from "./NewTask";
import {
  useGetTaskQuery,
  useUpdateTaskMutation,
} from "../../redux/api/taskAPI";
import { useGetUserQuery } from "../../redux/api/employeeTaskCountAPI";

const TaskList = ({ empId, id }: { empId: number; id: string }) => {
  const { data } = useGetTaskQuery(empId);
  const { refetch } = useGetUserQuery(id);
  const taskArr = data?.tasks || [];
  const [updateTask] = useUpdateTaskMutation();

  const handleTaskUpdate = async (
    taskId: string,
    status: {
      newTask: boolean;
      active: boolean;
      completedTask: boolean;
      failedTask: boolean;
    }
  ) => {
    try {
      // Update task status
      await updateTask({ empId, taskId, status });

      refetch();
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  return (
    <div
      id="tasklist"
      className="h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16"
    >
      {taskArr && taskArr.length > 0 ? (
        taskArr.map((elem, idx) => {
          if (elem.active) {
            return (
              <AcceptTask
                key={idx}
                data={elem}
                onComplete={() =>
                  handleTaskUpdate(elem._id, {
                    newTask: false,
                    active: false,
                    completedTask: true,
                    failedTask: false,
                  })
                }
                onFail={() =>
                  handleTaskUpdate(elem._id, {
                    newTask: false,
                    active: false,
                    completedTask: false,
                    failedTask: true,
                  })
                }
              />
            );
          }
          if (elem.newTask) {
            return (
              <NewTask
                key={idx}
                data={elem}
                onAccept={() =>
                  handleTaskUpdate(elem._id, {
                    newTask: false,
                    active: true,
                    completedTask: false,
                    failedTask: false,
                  })
                }
              />
            );
          }
          if (elem.completedTask) {
            return <CompleteTask key={idx} data={elem} />;
          }
          if (elem.failedTask) {
            return <FailedTask key={idx} data={elem} />;
          }
          return null; // Handle any unmatched cases
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TaskList;
