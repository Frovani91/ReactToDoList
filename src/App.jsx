import { useState } from 'react'
import FormToDo from './components/FormToDo'
import ToDoList from './components/ToDoList'
import './App.css'


function App() {
  const [list, setList] = useState([])
  const [idCreator, setIdCreator] = useState(1)


  const handleAddToDo = (title) => {
    setList(prevList => ([
      ...prevList,
      { id: idCreator, title: title, completed: false }
    ]));
    setIdCreator(prevId => prevId + 1);
  };

  const handleRemoveToDo = (idToRemove) => {

    setList(prevList => prevList.filter(item => item.id !== idToRemove));
  };

  const handleToggleComplete = (idToToggle) => {
    setList(prevList =>
      prevList.map(item =>
        item.id === idToToggle ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <>
      <h1 className="text-4xl text-gray-800 font-extrabold underline mb-8 text-center serif">COSE DA FARE</h1>
      <div className=''>

        <FormToDo onAddToDo={handleAddToDo}></FormToDo>
        <ToDoList tasks={list} onRemoveToDo={handleRemoveToDo} onToggleComplete={handleToggleComplete}></ToDoList>
      </div>
    </>
  )
}


export default App
