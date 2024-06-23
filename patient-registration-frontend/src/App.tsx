// /src/App.tsx

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes />
      </div>
    </BrowserRouter>
  );
};

export default App;
