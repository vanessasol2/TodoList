import React from 'react';
import TaskItem from '../TaskItem/TaskItem';

const TaskList = ({ tasks, toggleComplete, setEditingTask, deleteTask }) => {
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No hay ninguna tarea aun.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            setEditingTask={setEditingTask}
            deleteTask={deleteTask}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
