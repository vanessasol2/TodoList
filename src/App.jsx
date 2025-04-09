import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle } from 'lucide-react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import TaskStats from './components/TaskStats/TaskStats';
import TaskFilter from './components/TaskFilter/TaskFilter';

const initialTasks = [
  {
    id: uuidv4(),
    title: "Aprender React",
    description: "Estudiar los fundamentos de React",
    completed: false,
    createdAt: new Date(),
  },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('my-app-tasks');
      if (saved) {
        const parsedTasks = JSON.parse(saved);
        if (Array.isArray(parsedTasks)) {
          return parsedTasks;
        }
      }
      return initialTasks;
    } catch (error) {
      console.error('Error al cargar tareas desde localStorage:', error);
      return initialTasks;
    }
  });

  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      localStorage.setItem('my-app-tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error al guardar tareas en localStorage:', error);
    }
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: uuidv4(), completed: false, createdAt: new Date() }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTask(null); 
  };

  const clearTaskToEdit = () => {
    setEditingTask(null);
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; 
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/taskform"
          element={
            <TaskForm
              addTask={addTask}
              updateTask={updateTask}
              taskToEdit={editingTask}
              clearTaskToEdit={clearTaskToEdit}
            />
          }
        />
        <Route
          path="/"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="p-4 sm:p-6 w-full max-w-4xl">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
                  Lista de Tareas
                </h1>

                {/* Estadísticas */}
                <TaskStats tasks={tasks} />

                {/* Filtros */}
                <TaskFilter filter={filter} setFilter={setFilter} />

                {/* Botón Nueva Tarea */}
                <div className="mb-6 flex justify-center">
                  <Link
                    to="/taskform"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl shadow-md hover:from-indigo-600 hover:to-violet-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Nueva Tarea
                  </Link>
                </div>


                {/* Lista de tareas */}
                <TaskList
                  tasks={filteredTasks}
                  toggleComplete={toggleComplete}
                  setEditingTask={setEditingTask}
                  deleteTask={deleteTask}
                />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;