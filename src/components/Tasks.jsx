import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between bg-slate-400 text-white p-2 rounded-md"
        >
          <button
            onClick={() => onTaskClick(task.id)}
            className={`text-left w-full ${
              task.iscompleted ? "line-through" : ""
            }`}
          >
            {task.title}
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => onSeeDetailsClick(task)}
              className="bg-blue-500 p-2 rounded-md text-white"
            >
              <ChevronRightIcon />
            </button>
            <button
              onClick={() => onDeleteTaskClick(task.id)}
              className="bg-red-500 p-2 rounded-md text-white"
            >
              <TrashIcon />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
