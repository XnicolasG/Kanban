import { TODO_FILTERS } from "./const"

export interface Todo {
    id:string ,
    title:string,
    priority: string
    dueDate: string
    tags: string
    completed: boolean
}
export type TodoId = Pick<Todo, 'id'>
export type TodoTitle = Pick<Todo, 'title'>
export type TodoPriority = Pick<Todo, 'priority'>
export type TodoDuedate = Pick<Todo, 'dueDate'>
export type TodoTags = Pick<Todo, 'tags'>
export type TodoCompleted = Pick<Todo, 'completed'>

export type ListOfTodos = Todo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
