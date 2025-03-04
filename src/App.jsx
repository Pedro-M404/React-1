import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 as uuidv4 } from "uuid"; 

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // Adiciona tasks como dependência para atualizar sempre que mudar

  function onTaskClick(taskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, iscompleted: !task.iscompleted } : task
      )
    );
  }

  function onDeleteTaskClick(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  function onAddTaskSubmit(title, description) {
    if (!title.trim() || !description.trim()) return; 

    const newTask = {
      id: uuidv4(), 
      title,
      description,
      iscompleted: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-600 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        {tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            onTaskClick={onTaskClick}
            onDeleteTaskClick={onDeleteTaskClick}
          />
        ) : (
          <p className="text-center text-white">Nenhuma tarefa adicionada.</p>
        )}
      </div>
    </div>
  );
}

export default App;
