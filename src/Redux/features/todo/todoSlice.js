import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.list.push({
                id: Date.now(),
                text: action.payload,
                completed: false
            })
        },
        toggleTodo: (state, action) => {
            const todo = state.list.find(t => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        deleteTodo: (state, action) => {
            state.list = state.list.filter(t => t.id !== action.payload); 
        },
        sortTodos: (state) => {
            state.list = state.list.sort((a, b) => a.text.localeCompare(b.text))
        },
        reverseTodos: (state) => {
            state.list = state.list.reverse();
        }
    }
})

export const { addTodo, toggleTodo, deleteTodo, sortTodos, reverseTodos } = todoSlice.actions;
export default todoSlice.reducer;