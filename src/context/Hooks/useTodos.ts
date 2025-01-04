import  { useEffect, useState } from 'react'
// import { mockTodos } from '../../data/mock'
import { TODO_FILTERS } from '../../const'
import { FilterValue, Todo, TodoDuedate, TodoId, TodoPriority, TodoStatus, TodoTags, TodoTitle } from '../../types'
import { getData } from '../../utils/api'



export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)
    const [search, setSearch] = useState('')
    const [editTodo, setEditTodo] = useState<Todo | null>(null)

    useEffect(()=>{
        const fetchTodos = async() => {
            try {
                const data = await getData()
                setTodos(data)
            } catch (error) {
                console.log("useTodos' error");
                throw error
            }
        }
        fetchTodos()
    },[])

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

    const updateTodo = ({ id, ...updatedFields }: Partial<Todo> & TodoId): void => {
        console.log(id);
        
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, ...updatedFields } : todo
            )
        );
    };
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

    const filteredTodos = todos?.length
    ? todos.filter(todo => {
        if (filterSelected === TODO_FILTERS.LOW) return todo.priority === 'low'
        if (filterSelected === TODO_FILTERS.MEDIUM) return todo.priority === 'medium'
        if (filterSelected === TODO_FILTERS.HIGH) return todo.priority === 'high'

        if (search.trim() !== '') return todo.title.toLowerCase().includes(search.toLowerCase());
        return true;
      })
      : [];

    const handleFilterChange = (filter: FilterValue): void => {
        setFilterSelected(filter)
    }

    return {
        todos,
        setTodos,
        filterSelected,
        setFilterSelected,
        search, 
        setSearch,
        editTodo, 
        setEditTodo,
        handleAddTodo,
        handleRemoveTodo,
        filteredTodos,
        handleFilterChange,
        moveCard,
        updateTodo
    }
}
