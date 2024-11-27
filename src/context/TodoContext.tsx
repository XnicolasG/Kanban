import React, { createContext, useContext } from 'react'
import { useTodos } from './Hooks/useTodos'
import { FilterValue, ListOfTodos, Todo, TodoDuedate, TodoId, TodoPriority, TodoStatus, TodoTags, TodoTitle } from '../types';

interface TodoContextType {
    todos: ListOfTodos;
    setTodos: React.Dispatch<React.SetStateAction<ListOfTodos>>;
    filteredTodos: ListOfTodos;
    setFilterSelected: React.Dispatch<React.SetStateAction<FilterValue>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    filterSelected: FilterValue;
    handleAddTodo: (title: TodoTitle, priority: TodoPriority, dueDate: TodoDuedate, tags: TodoTags, status: TodoStatus) => void;
    handleRemoveTodo: (id: TodoId) => void;
    moveCard: (id: string, newStatus: Todo['status']) => void;
    handleFilterChange: (filter: FilterValue) => void;
  }

const TodoContext = createContext<TodoContextType | null>(null)

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {

    const {
        todos,
        setTodos,
        filterSelected,
        setFilterSelected,
        search,
        setSearch,
        handleAddTodo,
        handleRemoveTodo,
        filteredTodos,
        handleFilterChange,
        moveCard
    } = useTodos()

    return (
        <TodoContext.Provider
            value={{
                todos,
                setTodos,
                filterSelected,
                setFilterSelected,
                search,
                setSearch,
                handleAddTodo,
                handleRemoveTodo,
                filteredTodos,
                handleFilterChange,
                moveCard
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};