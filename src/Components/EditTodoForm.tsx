import React, { useState } from 'react';
import { Todo as TodoType } from '../types';

interface EditTodoFormProps {
  todo: TodoType;
  onSave: (updatedTodo: TodoType) => void;
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({ todo, onSave }) => {
  const [title, setTitle] = useState(todo.title);
  const [priority, setPriority] = useState(todo.priority);
  const [dueDate, setDueDate] = useState(todo.dueDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();    
    onSave({ ...todo, title, priority, dueDate });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
      </label>
      <label>
        Priority:
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <label>
        Due Date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded"
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
    </form>
  );
};
