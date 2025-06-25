import axios from 'axios'
import { ListOfTodos, Todo, TodoId } from '../types'

const url = import.meta.env.VITE_BASE_URL
const ID = import.meta.env.VITE_ID
const key = import.meta.env.VITE_KEY

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$' + key
    }
})

export const getData = async () => {
    try {
        const request = await axiosInstance.get(`/b/${ID}/latest`)
        console.log('getData fetching function successful');
        return request.data.record.tasks
    } catch (error) {
        console.log('getData error');
        throw error
    }
}

export const updateData = async (todos: ListOfTodos) => {
    try {
        const response = await axiosInstance.put(`/b/${ID}/`, { tasks: todos })
        return response.data
    } catch (error) {
        console.log(`updateData error`);
        throw error
    }
}

export const createData = async (newTodo: Todo) => {
    try {
        const response = await axiosInstance.get(`/b/${ID}/latest`)
        const currentData: ListOfTodos = response.data.record.tasks

        const updateTasks = [...currentData, newTodo]

        await axiosInstance.put(`/b/${ID}/`, { tasks: updateTasks })
        return newTodo
    } catch (error) {
        console.error('Error al agregar tarea:', error)
        throw error
    }
}

export const deleteData = async({ id }: TodoId) => {
    try {
        console.log('deleteData works !!!!');
        
        const response = await axiosInstance.get(`/b/${ID}/latest`)
        const currentData: ListOfTodos = response.data.record.tasks

        const updateTasks = currentData.filter((todo) => todo.id !== id)
        await axiosInstance.put(`/b/${ID}/`, {tasks:updateTasks})
        return id
    } catch (error) {
        console.error('Error at deleteData: ', error);
    }
}