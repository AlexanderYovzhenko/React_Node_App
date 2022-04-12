import React, { useState } from 'react';
import Form from '../form/form';
import './App.css';

function App() {
  const [ responseServer, setResponseServer ] = useState({ message: "buy"});

  return (
    <div className="App">
      <h1>Payment form</h1>
      <Form setResponseServer={setResponseServer} />
      <div className='responseServer'>
        <h2>{responseServer.message}</h2> 
        <p>{'RequestId: '}{JSON.stringify(responseServer.response?._id)}</p>
        <p>{'Amount: '}{JSON.stringify(responseServer.response?.Amount)}</p>
      </div>
    </div>
  );
}

export default App;
