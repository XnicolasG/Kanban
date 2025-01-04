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
    <form onSubmit={handleSubmit} className="flex font-normal flex-col gap-4">
      <label className='label'>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="modalInput mx-2 "
        />
      </label>
      <label className='label'>
        Priority:
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="modalInput mx-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <label className='label'>
        Due Date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="modalInput mx-2"
        />
      </label>
      <button type="submit" className="w-40 mx-auto py-1 bg-sky-500 text-white rounded mt-2 hover:bg-sky-600 duration-150">Save</button>
    </form>
  );
};
