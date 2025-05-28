import { useState } from "react"


function FormToDo({ onAddToDo }) {
    const [userText, setUserText] = useState("")
    

    let titleHandler = (event) => {
        setUserText(() => event.target.value)

    }
    

    let listSubmit = (event) => {
        event.preventDefault();

        // Chiamiamo la funzione passata come prop, passando i dati necessari
        onAddToDo(userText);

        // Resettiamo gli input locali del form
        setUserText("");
        
    };

    return (
        <>
            <form className="flex w-full max-w-md mb-6" onSubmit={listSubmit} >
                <input type="text" id="title" name="title" onChange={titleHandler} className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white" value={userText}  placeholder="Aggiungi attività..." />
                
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-r-lg transition duration-300 ease-in-out text-lg">Salva</button>
            </form>
          
        </>
    )
}

export default FormToDo
