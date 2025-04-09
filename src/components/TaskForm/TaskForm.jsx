import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Save, XCircle } from 'lucide-react'; 

const TaskForm = ({ addTask, updateTask, taskToEdit, clearTaskToEdit }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
      });
    } else {
      setFormData({
        title: '',
        description: '',
      });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'El título debe tener al menos 3 caracteres';
    }

    if (formData.description.trim().length > 300) {
      newErrors.description = 'La descripción no puede exceder los 300 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (taskToEdit) {
      updateTask({
        ...taskToEdit,
        title: formData.title,
        description: formData.description,
      });
      clearTaskToEdit();
    } else {
      const newTask = {
        id: uuidv4(),
        title: formData.title,
        description: formData.description,
        completed: false,
        createdAt: new Date(),
      };
      addTask(newTask);
    }

    setFormData({ title: '', description: '' });
    setErrors({});
    navigate('/');
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '' });
    setErrors({});
    clearTaskToEdit();
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border">
      <h2 className="text-3xl font-bold text-center text-violet-700 mb-6">
        {taskToEdit ? 'Editar Tarea ' : 'Crear Nueva Tarea '}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Título */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ej. Comprar víveres"
            className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
        </div>

        {/* Campo Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe la tarea con más detalle..."
            rows="4"
            className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          {taskToEdit && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center justify-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <XCircle className="w-5 h-5" />
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-5 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 shadow"
          >
            <Save className="w-5 h-5" />
            {taskToEdit ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
