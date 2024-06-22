import React, { useEffect, useState } from 'react';

function App() {
  const [clientsList, setClientsList] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setClientsList(data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>React and Flask</h1>
      {clientsList ? (
        clientsList.map(client => (
          <div key={client.id}>
            <p>{client.first_name} {client.last_name} ({client.email})</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
