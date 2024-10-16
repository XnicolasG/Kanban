import  { useState } from 'react'
import { mockTodos } from '../../data/mock'
import { TODO_FILTERS } from '../../const'
import { FilterValue, TodoDuedate, TodoId, TodoPriority, TodoStatus, TodoTags, TodoTitle } from '../../types'



export const useTodos = () => {
    const [todos, setTodos] = useState(mockTodos)
    const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

    const handleAddTodo = (
        { title }: TodoTitle,
        { priority }: TodoPriority,
        { dueDate }: TodoDuedate,
        { tags }: TodoTags,
        { status }: TodoStatus
    ): void => {

        const newTodo = {
            title,
            priority,
            dueDate,
            tags,
            id: crypto.randomUUID(),
            completed: false,
            status
        }
        setTodos(prev => [...prev, newTodo]);
    }

    const handleRemoveTodo = ({ id }: TodoId) => {
        setTodos((prev) => prev.filter(todo => todo.id !== id))
    }

    const moveCard = (id: string, newStatus: string) => {
        setTodos((prevStatus) => {
            const updateTodos = prevStatus.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        status: newStatus
                    }
                }
                return todo;
            })
            return updateTodos
        })
    }

    const filteredTodos = todos.filter(todo => {
        if (filterSelected === TODO_FILTERS.LOW) return todo.priority === 'low'
        if (filterSelected === TODO_FILTERS.MEDIUM) return todo.priority === 'medium'
        if (filterSelected === TODO_FILTERS.HIGH) return todo.priority === 'high'
        return todo
      })

    const handleFilterChange = (filter: FilterValue): void => {
        setFilterSelected(filter)
    }

    return {
        todos,
        setTodos,
        filterSelected,
        setFilterSelected,
        handleAddTodo,
        handleRemoveTodo,
        filteredTodos,
        handleFilterChange,
        moveCard
    }
}
