import React from 'react';
import Calculator from './components/Calculator';
import { CalculatorProvider } from './context/CalculatorContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <CalculatorProvider>
          <Calculator />
        </CalculatorProvider>
      </div>
    </div>
  );
}

export default App;