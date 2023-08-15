import React from 'react';
import './index.css'; // Import your global CSS file if applicable
import ATRCalculator from './ATRCalculator'; // Import the ATRCalculator component

function App() {
  return (
    <div className="app">
      <main className="app-content">
        <ATRCalculator />
      </main>
      <footer className="app-footer">

      </footer>
    </div>
  );
}

export default App;
