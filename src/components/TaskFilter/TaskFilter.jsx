import React from 'react';
import { ListChecks, CheckCircle2, CircleDashed } from 'lucide-react'; // Asegúrate de tener lucide-react instalado

const TaskFilter = ({ filter, setFilter }) => {
  const baseClass =
    'flex items-center gap-2 px-4 py-2 rounded-full transition font-medium text-sm shadow-sm';

  const activeClass = 'bg-violet-600 text-white';
  const inactiveClass =
    'bg-gray-100 text-gray-600 hover:bg-gray-200';

  return (
    <div className="mb-6 flex justify-center gap-3 flex-wrap">
      <button
        onClick={() => setFilter('all')}
        className={`${baseClass} ${filter === 'all' ? activeClass : inactiveClass}`}
      >
        <ListChecks size={18} />
        Todas
      </button>
      <button
        onClick={() => setFilter('active')}
        className={`${baseClass} ${filter === 'active' ? activeClass : inactiveClass}`}
      >
        <CircleDashed size={18} />
        Activas
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={`${baseClass} ${filter === 'completed' ? activeClass : inactiveClass}`}
      >
        <CheckCircle2 size={18} />
        Completadas
      </button>
    </div>
  );
};

export default TaskFilter;
