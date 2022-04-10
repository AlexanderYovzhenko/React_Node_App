import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [ data, setData ] = useState(null);

  useEffect(() => {
    fetch('/api')
      .then(response => {
        console.log(response);
        return response.json()})
      .then(data => {
        console.log(data);
       return setData(data.message);
      // .catch(err => {
      //   console.error(err);
      });  
  }, []);

  return (
    <div className="App">
      <p>
          {
            !data ? 'Loading...' : data
          }
        </p>
    </div>
  );
}

export default App;
