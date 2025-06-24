import React from 'react'
import { TodoId } from '../types'
interface DeleteTodoModalProps {
    title: string
    id: string
    handleRemoveTodo: ({ id }: TodoId) => void
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setModalType: React.Dispatch<React.SetStateAction<'edit' | 'delete' | null>>
}
export const DeleteTodoModal: React.FC<DeleteTodoModalProps> = ({
    title,
    id,
    handleRemoveTodo,
    setIsModalOpen,
    setModalType
}) => {
    return (
        <section className="flex flex-col items-center gap-4 p-4 text-white" aria-labelledby="modal-title">
            <header>
                <h2 id="modal-title" className="text-lg font-semibold">
                    Are you sure you want to delete <strong>{title}</strong>?
                </h2>
            </header>

            <footer className="flex gap-4 mt-2">
                <button
                    onClick={() => {
                        handleRemoveTodo({ id })
                        setIsModalOpen(false)
                        setModalType(null)
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded"
                >
                    Yes, delete
                </button>

                <button
                    onClick={() => {
                        setIsModalOpen(false)
                        setModalType(null)
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded"
                >
                    Cancel
                </button>
            </footer>
        </section>
    )
}
