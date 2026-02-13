import reactLogo from './assets/react.svg'
import './App.css'
import TodoList from './components/TodoList'
import { useEffect, useRef } from 'react'
import { animate } from "animejs";
import TodoListRedux from './components/TodoListRedux';
import TodoListRecoil from './components/TodoListRecoil';
import TodoListJotai from './components/TodoListJotai';
import TodoListZustand from './components/TodoListZustand';
import TodoListMobX from './components/TodoListMobX';

function App() {

  const logoRef = useRef(null);

  useEffect(() => {
    if (!logoRef.current) return;

    animate(logoRef.current, {
      rotate: [0, 360],
      duration: 1500,
      easing: 'ease-out-elastic',
      loop: true
    })

  }, [])

  const handleClick = () => {
    animate(logoRef.current, {
      rotate: '+=360',
      duration: 800,
      easing: 'ease-in-out',
      loop: true
    })
  }

  return (
    <>
    <div className='bg-linear-to-br from-indigo-100 to-purple-100 relative'>
      <img ref={logoRef} onClick={handleClick} src={reactLogo} className='p-5  w-24 absolute cursor-pointer' />
      {/* <TodoList /> */}
      {/* <TodoListRedux /> */}
      {/* <TodoListRecoil /> */}
      {/* <TodoListJotai /> */}
      {/* <TodoListZustand /> */}
      <TodoListMobX />
    </div>
    </>
  )
}

export default App
