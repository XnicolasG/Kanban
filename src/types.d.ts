export interface Todo {
    id:string,
    title:string,
    priority: string
    dueDate: string
    tags: string
    completed: boolean
}
export type ListOfTodos = Todo[]
