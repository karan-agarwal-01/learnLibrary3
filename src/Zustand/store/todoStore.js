import { create } from "zustand";

export const useTodoStore = create((set) => ({
    todos: [],

    addTodo: (text) => set((state) => ({
        todos: [
            ...state.todos,
            {
                id: Date.now(),
                text,
                completed: false
            }
        ]
    })),

    toggleTodo: (id) => set((state) => ({
        todos: state.todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo)
    })),

    deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id)
    })),

    sortTodo: () => set((state) => ({
        todos: [...state.todos].sort((a, b) => a.text.localeCompare(b.text))
    })),

    reverseTodo: () => set((state) => ({
        todos: [...state.todos].reverse()
    }))
}))