import axios from 'axios'
import {  ListOfTodos} from '../types'

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
        return request.data.record
    } catch (error) {
        console.log('getData error');
        throw error
    }
}

export const updateData = async (todos: ListOfTodos) => {
    try {
        const response = await axiosInstance.put(`/b/${ID}/`, { record: todos })
        return response.data
    } catch (error) {
        console.log(`updateData error`);
        throw error
    }
}