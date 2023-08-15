import React, { useState } from 'react';
import './index.css';

const ATRCalculator = () => {
  const [cryptoPrice, setCryptoPrice] = useState('');
  const [atr, setAtr] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [position, setPosition] = useState('long'); // Default position is 'long'
  const [tpLevel, setTpLevel] = useState('');
  const [slLevel, setSlLevel] = useState('');

  const calculateLevels = () => {
    if (cryptoPrice && atr && accountBalance) {
      const minimumRR = 3; // Minimum Risk-Reward ratio
      const atrValue = parseFloat(atr);
      const currentPrice = parseFloat(cryptoPrice);

      // Calculate SL and TP levels based on position and ATR suggestion
      let slValue, tpValue;
      if (position === 'long') {
        slValue = currentPrice - atrValue;
        tpValue = currentPrice + atrValue * minimumRR;
      } else if (position === 'short') {
        slValue = currentPrice + atrValue;
        tpValue = currentPrice - atrValue * minimumRR;
      } else if (position === 'custom') {
        // For custom option, use ATR suggestion
        slValue = position === 'long' ? currentPrice - atrValue : currentPrice + atrValue;
        tpValue = position === 'long' ? currentPrice + atrValue * minimumRR : currentPrice - atrValue * minimumRR;
      }

      setTpLevel(tpValue.toFixed(6));
      setSlLevel(slValue.toFixed(6));
    } else {
      setTpLevel('');
      setSlLevel('');
    }
  };

  return (
    <div className="atr-calculator">
      <h2>ATR Calculator</h2>
      <div>
        <label>Crypto Price:</label>
        <input
          type="text"
          value={cryptoPrice}
          onChange={(e) => setCryptoPrice(e.target.value)}
        />
      </div>
      <div>
        <label>ATR:</label>
        <input
          type="text"
          value={atr}
          onChange={(e) => setAtr(e.target.value)}
        />
      </div>
      <div>
        <label>Account Balance:</label>
        <input
          type="text"
          value={accountBalance}
          onChange={(e) => setAccountBalance(e.target.value)}
        />
      </div>
      <div>
        <label>Position:</label>
        <select value={position} onChange={(e) => setPosition(e.target.value)}>
          <option value="long">Long</option>
          <option value="short">Short</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      <button onClick={calculateLevels}>Calculate</button>
      {tpLevel && slLevel && (
        <div>
          <h3>Results:</h3>
          <p>Take Profit: {tpLevel}</p>
          <p>Stop Loss: {slLevel}</p>
        </div>
      )}
    </div>
  );
};

export default ATRCalculator;
