import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, Pencil, Trash2 } from 'lucide-react'; 

const TaskItem = ({ task, toggleComplete, setEditingTask, deleteTask }) => {
  return (
    <div className="p-5 bg-white rounded-xl shadow-md border flex justify-between items-start hover:shadow-lg transition duration-300">
      <div className="flex items-start gap-3">
        <button onClick={() => toggleComplete(task.id)}>
          {task.completed ? (
            <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
          ) : (
            <Circle className="text-gray-400 w-6 h-6 mt-1" />
          )}
        </button>
        <div>
          <h2
            className={`text-lg font-semibold ${
              task.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {task.title}
          </h2>
          <p className="text-gray-500">{task.description}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link
          to="/taskform"
          onClick={() => setEditingTask(task)}
          className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition"
          title="Editar"
        >
          <Pencil className="text-yellow-600 w-5 h-5" />
        </Link>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
          title="Eliminar"
        >
          <Trash2 className="text-red-600 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
