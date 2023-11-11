import React from 'react';
import './index.css';
import { Receta } from "./components/Post"
import { Encabeza } from './components/Encabeza';

  function App() {
    return (
      <div>
        <Encabeza/>
        <Receta />
      </div>
    );
  }

export default App;