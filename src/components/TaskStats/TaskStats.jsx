import React from 'react';
import { ClipboardList, ListChecks } from 'lucide-react'; 

const TaskStats = ({ tasks }) => {
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex items-center p-4 bg-white rounded-xl shadow border-l-4 border-violet-400">
        <div className="p-2 bg-violet-100 rounded-full mr-4">
          <ClipboardList className="w-6 h-6 text-violet-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Tareas pendientes</p>
          <p className="text-xl font-semibold text-violet-600">{pendingTasks}</p>
        </div>
      </div>

      <div className="flex items-center p-4 bg-white rounded-xl shadow border-l-4 border-violet-500">
        <div className="p-2 bg-violet-100 rounded-full mr-4">
          <ListChecks className="w-6 h-6 text-violet-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total de tareas</p>
          <p className="text-xl font-semibold text-violet-600">{totalTasks}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
