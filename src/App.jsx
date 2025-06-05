import React, { useState, useEffect } from 'react';
import FormToDo from './components/FormToDo';
import ToDoList from './components/ToDoList';
import './App.css';

function App() {
  // Inizializza la lista cercando prima nel localStorage
  // Se non c'è nulla, usa un array vuoto
  const [list, setList] = useState(() => {
    const savedList = localStorage.getItem('todoList');
    return savedList ? JSON.parse(savedList) : [];
  });

  // Inizializza idCreator in base alla lista caricata
  // Trova l'ID massimo esistente e aggiungi 1, altrimenti inizia da 1
  const [idCreator, setIdCreator] = useState(() => {
    const savedList = localStorage.getItem('todoList');
    if (savedList) {
      const parsedList = JSON.parse(savedList);
      if (parsedList.length > 0) {
        const maxId = Math.max(...parsedList.map(item => item.id));
        return maxId + 1;
      }
    }
    return 1;
  });

  const [installPrompt, setInstallPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);

  useEffect(() => {
    // Rilevamento iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;
    setIsIOS(isIosDevice);

    // Verifica se la PWA è già installata (solo su browser che lo supportano, come Chrome)
    if (window.matchMedia('(display-mode: standalone)').matches || document.referrer.startsWith('android-app://')) {
      setIsPWAInstalled(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      console.log('Evento beforeinstallprompt catturato:', e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Event listener per quando l'app viene installata o disinstallata (su browser che lo supportano)
    window.addEventListener('appinstalled', () => {
      setIsPWAInstalled(true);
      setInstallPrompt(null); // Rimuovi il pulsante una volta installata
      console.log('PWA installata con successo!');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', () => { });
    };
  }, []);

  // Questo useEffect si attiva ogni volta che la 'list' cambia
  // e salva la lista aggiornata nel localStorage
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(list));
  }, [list]); // Dipendenza: si esegue solo quando 'list' cambia

  const handleInstallClick = async () => {
    if (!installPrompt) {
      console.log('Nessun prompt di installazione disponibile.');
      return;
    }

    installPrompt.prompt();

    const { outcome } = await installPrompt.userChoice;
    console.log(`Risposta dell'utente al prompt di installazione: ${outcome}`);

    if (outcome === 'accepted') {
      setInstallPrompt(null);
      setIsPWAInstalled(true);
    }
  };

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

        {/* --- Area per istruzioni PWA --- */}
        {!isPWAInstalled && (isIOS ? (
          <div style={{ textAlign: 'center', marginTop: '30px', padding: '15px', backgroundColor: '#e0f7fa', border: '1px solid #00bcd4', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.1em', color: '#006064', marginBottom: '10px' }}>
              Per installare l'app su iOS:
            </p>
            <p style={{ fontSize: '1em', color: '#006064' }}>
              Tocca l'icona <strong style={{ fontSize: '1.2em' }}>&#x21E7;</strong> (Condividi) in Safari, poi seleziona "Aggiungi a schermata Home".
            </p>
          </div>
        ) : (
          installPrompt && (
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button
                onClick={handleInstallClick}
                style={{
                  padding: '12px 25px',
                  backgroundColor: '#28a745',
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
          )
        ))}
        {/* --- Fine Area PWA --- */}

      </div>
    </>
  );
}

export default App;