import React, { useState, useEffect } from 'react'; // Importa useEffect
import FormToDo from './components/FormToDo';
import ToDoList from './components/ToDoList';
import './App.css';


function App() {
  const [list, setList] = useState([]);
  const [idCreator, setIdCreator] = useState(1);
  const [installPrompt, setInstallPrompt] = useState(null); // Nuovo stato per il prompt di installazione


  // --- Logica PWA: Gestione del prompt di installazione ---
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Previeni il prompt predefinito del browser
      e.preventDefault();
      // Salva l'evento per poterlo attivare in seguito
      setInstallPrompt(e);
      console.log('Evento beforeinstallprompt catturato:', e);
    };

    // Aggiungi l'event listener quando il componente si monta
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Pulisci l'event listener quando il componente si smonta
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []); // Esegui solo al mount e unmount

  const handleInstallClick = async () => {
    if (!installPrompt) {
      console.log('Nessun prompt di installazione disponibile.');
      return;
    }

    // Mostra il prompt di installazione
    installPrompt.prompt();

    // Aspetta la scelta dell'utente
    const { outcome } = await installPrompt.userChoice;
    console.log(`Risposta dell'utente al prompt di installazione: ${outcome}`);

    // Se l'utente ha accettato, il prompt non sarà più disponibile, quindi nascondi il pulsante
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };
  // --- Fine Logica PWA ---


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

        {/* --- Pulsante di Installazione PWA (renderizzato condizionalmente) --- */}
        {installPrompt && (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              onClick={handleInstallClick}
              style={{
                padding: '12px 25px',
                backgroundColor: '#28a745', // Un bel verde
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
            >
              🚀 Installa l'App!
            </button>
          </div>
        )}
        {/* --- Fine Pulsante PWA --- */}

      </div>
    </>
  );
}

export default App;