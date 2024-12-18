import React from 'react';
import { useCalculator } from '../context/CalculatorContext';

interface InputSectionProps {
  type: 'member' | 'non-member';
}

const InputSection: React.FC<InputSectionProps> = ({ type }) => {
  const { state, dispatch, settings } = useCalculator();
  const isNonMember = type === 'non-member';
  const data = isNonMember ? state.nonMember : state.member;
  const examService = settings.services.find(s => s.name === 'Annual Exam');

  const handleInputChange = (field: string, value: number) => {
    dispatch({
      type: 'UPDATE_INPUT',
      payload: {
        type: isNonMember ? 'nonMember' : 'member',
        field,
        value: value || 0
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Total Invoice Amount
        </label>
        <input
          type="number"
          value={data.invoiceAmount || ''}
          onChange={(e) => handleInputChange('invoiceAmount', parseFloat(e.target.value))}
          className="w-full px-4 py-3 bg-dark/80 border border-dark-lighter text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors placeholder-gray-500"
          placeholder="Enter amount"
        />
      </div>

      {isNonMember ? (
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Exam Cost Included in Invoice
          </label>
          <input
            type="number"
            value={data.examCost || ''}
            onChange={(e) => handleInputChange('examCost', parseFloat(e.target.value))}
            className="w-full px-4 py-3 bg-dark/80 border border-dark-lighter text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors placeholder-gray-500"
            placeholder="Enter exam cost"
          />
        </div>
      ) : (
        examService && (
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Number of Exams Redeemed
            </label>
            <select
              value={data.examsRedeemed}
              onChange={(e) => handleInputChange('examsRedeemed', parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-dark/80 border border-dark-lighter text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            >
              {Array.from({ length: examService.quantity + 1 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        )
      )}

      {!isNonMember && (
        <div className="mt-6 p-4 bg-dark/60 rounded-xl border border-dark-lighter">
          <h3 className="text-sm font-display font-semibold text-white mb-3">Included Services</h3>
          {settings.services.map((service, index) => (
            <div key={index} className="flex items-center justify-between text-sm text-gray-300 mb-2 last:mb-0">
              <span className="font-medium">{service.name} (×{service.quantity})</span>
              <span className="font-semibold text-primary-light">${service.value * service.quantity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputSection;