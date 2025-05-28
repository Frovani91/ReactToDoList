

function ToDoList({ tasks, onRemoveToDo, onToggleComplete }) {

    return (
        <>
            <ul className="w-full max-w-md space-y-4">

                {tasks.map(item => (
                    <li key={item.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
                        <span className={`text-lg text-gray-800 flex-grow break-words min-w-0 ${item.completed ? 'line-through text-gray-500' : ''
                            }`}>{item.title}</span>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => onToggleComplete(item.id)} className="text-green-500 hover:text-green-700 focus:outline-none" title="Segna come completato">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            </button>
                            <button onClick={() => onRemoveToDo(item.id)} className="text-red-500 hover:text-red-700 focus:outline-none" title="Elimina">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>


                    </li>
                ))}
            </ul>
        </>
    )
}

export default ToDoList
