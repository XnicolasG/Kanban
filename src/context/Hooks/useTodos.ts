import { useEffect, useState } from 'react'
// import { mockTodos } from '../../data/mock'
import { TODO_FILTERS } from '../../const'
import { FilterValue, ListOfTodos, Todo, TodoDuedate, TodoId, TodoPriority, TodoStatus, TodoTags, TodoTitle } from '../../types'
import { getData, updateData, createData, deleteData } from '../../utils/api'



export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)
    const [search, setSearch] = useState('')
    const [editTodo, setEditTodo] = useState<Todo | null>(null)
    const [loading, setLoading] = useState(true)
    console.warn(todos);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const data = await getData()
                console.warn('data: ', data);

                setTodos(data)
            } catch (error) {
                console.log("useTodos' error");
                throw error
            } finally {
                setLoading(false);
            }
        }
        fetchTodos()
    }, [])

    const handleAddTodo = async (
        { title }: TodoTitle,
        { priority }: TodoPriority,
        { dueDate }: TodoDuedate,
        { tags }: TodoTags,
        { status }: TodoStatus
    ): Promise<void> => {

        const newTodo = {
            title,
            priority,
            dueDate,
            tags,
            id: crypto.randomUUID(),
            completed: false,
            status
        }
        const added = await createData(newTodo)
        setTodos(prev => [...prev, added]);
    }

    const updateTodo = async ({ id, ...updatedFields }: Partial<Todo> & TodoId): Promise<void> => {
        console.log('udpdateTodo funcionaaaa: ', id);
        console.log('ID:', id);

        try {
            let updatedTodos: ListOfTodos = [];

            setTodos((prevTodos) => {
                updatedTodos = prevTodos.map((todo) => {
                    if (todo.id === id) {
                        return { ...todo, ...updatedFields }
                    }
                    return todo
                })
                return updatedTodos
            });

            await updateData(updatedTodos)
            console.log(`Task with id: ${id} has been updated`);

        } catch (error) {
            console.log('Error at updateTodo function');
            throw error
        }
    };

    const handleRemoveTodo = async ({ id }: TodoId) => {
        setTodos((prev) => prev.filter(todo => todo.id !== id))
        await deleteData({ id })
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
        loading,
        handleAddTodo,
        handleRemoveTodo,
        filteredTodos,
        handleFilterChange,
        moveCard,
        updateTodo
    }
}
