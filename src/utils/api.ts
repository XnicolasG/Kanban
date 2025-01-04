import axios from 'axios'
import { ListOfTodos } from '../types'

const url = import.meta.env.VITE_BASE_URL
const ID = import.meta.env.VITE_ID
const key = import.meta.env.VITE_KEY

const axiosInstance = axios.create({
    baseURL: url,
    headers:{
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$'+key
    }
})

export const getData = async () => {
    
    try {
        console.log('ID',key);
        const request = await axiosInstance.get(`/b/${ID}/latest`)
        console.log('Full response:', request);
        console.log('Response data:', request.data);
        console.log('getData returns:' + request.data.record);
        return request.data.record
    } catch (error) {
        console.log('getData error');
        throw error
    }
}

export const updateData = async (todos:ListOfTodos) => {
    try {
        const response = await axiosInstance.put(`/b/${ID}/latest`, todos)
        return response.data
    } catch (error) {
        console.log(`updateData error`);
        throw error
    }
}