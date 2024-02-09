import './App.css'
import { useRef , useState, useEffect } from 'react'

function App() {
  const inputRef = useRef('')
  const [dataLocal , setDataLocal] = useState([])
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    let data = [];
    if(localStorage.getItem('todos')){
      data = JSON.parse(localStorage.getItem('todos'))
    }
    setDataLocal(data)
  }, [])

  function handleSubmit(e){
    e.preventDefault()
    if(inputRef.current.value.trim().length < 3){
      alert("Belgilar soni 3 tadan kam bo'lmasin")
      inputRef.current.focus()
      return 
    }
    const todo = {
      id: Date.now(),
      name: inputRef.current.value
    } 

    let copied = JSON.parse(JSON.stringify(dataLocal))
    copied.push(todo)

    setDataLocal(copied)

    localStorage.setItem('todos' , JSON.stringify(copied))
    inputRef.current.value = ''
  }

  function handleDelete(id) {
    const updatedTodos = dataLocal.filter(todo => todo.id !== id);
    setDataLocal(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  function handleUpdate(todo) {
    setSelectedTodo(todo);
    inputRef.current.value = todo.name;
  }

  function updateTodo() {
    const updatedTodos = dataLocal.map(todo => {
      if (todo.id === selectedTodo.id) {
        return {
          ...todo,
          name: inputRef.current.value
        };
      }
      return todo;
    });

    setDataLocal(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    inputRef.current.value = '';
    setSelectedTodo(null);
  }

  return (
    <>
      <div className="wraper">
        <h1>Todo App</h1>
        <div className="todo-wraper">
          <form onSubmit={handleSubmit}>
            <input ref={inputRef} type="text" placeholder='Enter your Todo ... ' />
            <button>{selectedTodo ? 'Update' : 'Submit'}</button>
          </form>

          <br /> <br />

          <ul>
            {dataLocal.map((todo , index) => (
              <li key={index}>
                <div className="div">
                  <input className='name' type="checkbox"/>
                  <span>{todo.name}</span>
                </div>
                <span className='span'>
                  <span onClick={() => handleUpdate(todo)}>Update</span>
                  <span onClick={() => handleDelete(todo.id)}>Delete</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
