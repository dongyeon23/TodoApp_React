import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todoList, setTodoList] = useState([])
  const [inputValue, setInputValue] = useState('')

  return (
    <>
      <TodoInput inputValue={inputValue} setInputValue = {setInputValue} todoList = {todoList} setTodoList = {setTodoList} />  
      <Timer />  
    </>
  )
}

function TodoInput({inputValue, setInputValue, setTodoList, todoList}) {
  const inputRef = useRef();

  const addObj = () => {
    const newTodo = {      
      id: Date.now(),
      content: inputValue,
      idDone: false,
      isEditing: false
    };
    setTodoList([...todoList, newTodo]);
    setInputValue('');
    inputRef.current.focus();
  }

  return (
    <>
      <TodoList todoList = {todoList} setTodoList = {setTodoList}/>
      <input ref = {inputRef} type="text" value = {inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
      <button onClick={addObj}>Submit</button>
    </>
  )
}
function TodoList({todoList, setTodoList}) {
  return (
    <>
      <ul>
        {todoList.map((list) => (
          <Todo key={list.id} 
          list = {list} 
          setTodoList = {setTodoList} 
          todoList = {todoList}
          />
        ))}
      </ul>
    </>
  )
}

function Todo({list, todoList, setTodoList}) {
  const [inputValue, setInputValue] = useState('');
  console.log(list)
  //삭제
  const deleteId = (todoId) => {
    setTodoList(todoList.filter((todo) => todo.id !== todoId))
  }
  //수정
  const editList = ()  => {
    if(!list.isEditing) {
      setInputValue(list.content)
      setTodoList(prev => prev.map((el)=>el.id === list.id?{...el, isEditing:true}:el))
      setInputValue('')
    }else {
      setTodoList(prev => prev.map((el)=>el.id === list.id?{...el, content: inputValue, isEditing:false}:el))
    }
  }
  return (
    <>
      <li>
      {list.content}
      <input style={{display: list.isEditing ? 'inline-block' : 'none'}}
      type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
      <button onClick={() => deleteId(list.id)}>Delete</button>
      <button onClick={editList}>{list.isEditing ? "Save" : "Edit"}</button>
      </li>
    </>
  )
}
function Timer () {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev+1)
    }, 1000);
    
    return () => {
      clearInterval(timer);
      console.log("타이머 종료");
    };
  }, []);
  return (
    <div>{seconds}초</div>
  )
}

export default App