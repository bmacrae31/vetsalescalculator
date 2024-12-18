import React from 'react';
import { useCalculator } from '../context/CalculatorContext';
import MembershipSettingsModal from './MembershipSettingsModal';
import InputSection from './InputSection';
import ComparisonChart from './ComparisonChart';
import ResultsSection from './ResultsSection';
import { Settings } from 'lucide-react';

const Calculator: React.FC = () => {
  const { showSettings, setShowSettings, settings, updateSettings } = useCalculator();

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-primary-light via-accent to-accent-dark bg-clip-text text-transparent">
            Membership Value Calculator
          </h1>
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-dark-lighter border border-primary/20 text-primary-light font-medium rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-dark-light/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm card-hover gradient-border border border-dark-lighter">
            <h2 className="text-xl font-display font-semibold text-white mb-6">Non-Member</h2>
            <InputSection type="non-member" />
          </div>

          <div className="bg-dark-light/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm card-hover gradient-border border border-dark-lighter">
            <h2 className="text-xl font-display font-semibold text-white mb-6">Member</h2>
            <InputSection type="member" />
          </div>
        </div>

        <div className="bg-dark-light/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm card-hover gradient-border mb-8 border border-dark-lighter">
          <ComparisonChart />
        </div>

        <div className="bg-dark-light/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm card-hover gradient-border border border-dark-lighter">
          <ResultsSection />
        </div>
        
        {showSettings && (
          <MembershipSettingsModal
            settings={settings}
            updateSettings={updateSettings}
            onClose={() => setShowSettings(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Calculator;