import React from "react";

const NewTask = ({data, onAccept} : { data: any; onAccept: (id: string) => void }) => {
  const formatDate = (isoString: string | number | Date) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const formatedDate = formatDate(data.taskDate);

  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-blue-400 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 text-sm px-3 py-1 rounded">
          {data.category}
        </h3>
        <h4 className="text-sm">{formatedDate}</h4>
      </div>
      <h2 className="mt-5 text-2xl font-semibold">{data.taskTitle}</h2>
      <p className="text-sm mt-2">{data.taskDesc}</p>
      <div className="mt-6">
        <button onClick={() => onAccept(data._id)} className="bg-blue-500 rounded font-medium py-1 px-2 text-xs">
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
