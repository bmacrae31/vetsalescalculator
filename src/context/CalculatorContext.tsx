import React, { createContext, useContext, useReducer, useState } from 'react';
import { Settings } from '../types/settings';
import { State, Action } from '../types/calculator';

interface CalculatorContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
  settings: Settings;
  updateSettings: (key: keyof Settings, value: any) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}

const defaultSettings: Settings = {
  cashbackPercentage: 5,
  charityPercentage: 1,
  hasCharityProgram: true,
  services: [
    {
      name: 'Annual Exam',
      value: 70,
      quantity: 2,
      icon: 'stethoscope'
    },
    {
      name: 'Nail Trim',
      value: 20,
      quantity: 1,
      icon: 'scissors'
    }
  ]
};

const initialState: State = {
  nonMember: {
    invoiceAmount: 0,
    examCost: defaultSettings.services[0].value,
  },
  member: {
    invoiceAmount: 0,
    examsRedeemed: 0,
  },
  settings: defaultSettings,
  isSettingsModalOpen: false,
  isFirstVisit: true,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_INPUT':
      const { type, field, value } = action.payload;
      return {
        ...state,
        [type]: {
          ...state[type as keyof Pick<State, 'member' | 'nonMember'>],
          [field]: value,
        },
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.field]: action.payload.value,
        },
      };
    default:
      return state;
  }
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [showSettings, setShowSettings] = useState(false);

  const updateSettings = (key: keyof Settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <CalculatorContext.Provider value={{
      state,
      dispatch,
      settings,
      updateSettings,
      showSettings,
      setShowSettings
    }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};