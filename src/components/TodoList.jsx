import { useEffect, useRef, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Card, Input, Button, CloseIcon, ScrollShadow } from "@heroui/react";
import { animate, text } from "animejs";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const inputRef = useRef(null);
  const textRef = useRef(null);

  const [parent] = useAutoAnimate({
    duration: 250,
    easing: "ease-in-out",
  });

  useEffect(() => {
    if (!textRef.current) return;

    const { words } = text.split(textRef.current, {
        words: true,
        includeSpaces: true
    })

    animate(words, {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 600,
        delay: (_, i) => i * 60,
        easing: "ease-out",
    })

  }, [])

  const addTodo = () => {
    if (!task.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);
    setTask("");
    inputRef.current?.focus();
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const sortTodos = () => {
    setTodos([...todos].sort((a, b) => a.text.localeCompare(b.text)));
  };

  const reverseTodos = () => {
    setTodos([...todos].reverse());
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
        return !todo.completed;
    } 
    if (filter === "completed") {
        return todo.completed;
    } 
    return true;
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card variant="default" className={`w-full max-w-md ${todos.length < 5 ? "h-auto" : "h-110" } rounded-xl shadow-lg p-6 flex flex-col`}>
        <Card.Title ref={textRef} className="text-2xl font-bold text-center mb-4">To-Do List</Card.Title>
        <Card.Description className="flex gap-2 mb-4">
          <Input ref={inputRef} variant="secondary" type="text" placeholder="Add a new task..." className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" value={task} onChange={(e) => setTask(e.target.value)}
          />
          <Button onClick={addTodo} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 rounded-lg transition">Add</Button>
        </Card.Description>
        <Card.Description className="flex gap-2 justify-center">
          <Button onClick={sortTodos} className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg transition">
            Sort
          </Button>
          <Button onClick={reverseTodos} className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg transition">
            Reverse
          </Button>
        </Card.Description>
        <Card.Description className="flex justify-center gap-2">
          {["all", "active", "completed"].map((f) => (
            <Button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-lg transition ${
                filter === f ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-700"
              }`}>
             {f}
            </Button>
          ))}
        </Card.Description>
        <Card.Content className="flex-1 overflow-hidden mt-2">
            <ScrollShadow orientation="vertical" hideScrollBar className="h-full pr-2">
                <div ref={parent} className="space-y-2">
                    {filteredTodos.map((todo) => (
                        <Card.Description key={todo.id} className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all
                            ${
                            todo.completed ? "bg-gray-200 scale-[0.98]" : "bg-gray-100"
                            }
                        `}
                        >
                        <Card.Title onClick={() => toggleTodo(todo.id)} className={`cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""}`}>
                            {todo.text}
                        </Card.Title>

                        <Button variant="outline" onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-700">
                            <CloseIcon />
                        </Button>
                        </Card.Description>
                    ))}
                    {filteredTodos.length === 0 && (
                        <Card.Description className="text-center text-gray-400 mt-4">
                        No tasks here
                        </Card.Description>
                    )}
                </div>
            </ScrollShadow>
        </Card.Content>
      </Card>
    </div>
  );
};

export default TodoList;
