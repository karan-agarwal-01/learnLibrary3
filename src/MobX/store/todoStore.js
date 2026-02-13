import { makeAutoObservable } from "mobx";

class TodoStore {
    todos = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTodo(text) {
        this.todos.push({
            id: Date.now(),
            text,
            completed: false
        })
    }

    toggleTodo(id) {
        const todo = this.todos.find((t) => t.id === id)
        if (todo) {
            todo.completed = !todo.completed
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((t) => t.id !== id)
    }
 
    sortTodo() {
        this.todos = [...this.todos].sort((a, b) => a.text.localeCompare(b.text))
    }

    reverseTodo() {
        this.todos = [...this.todos].reverse();
    }
}

export const todoStore = new TodoStore();