import React from 'react';
import { useCalculator } from '../context/CalculatorContext';

const ComparisonChart = () => {
  const { state } = useCalculator();
  
  const maxValue = Math.max(
    state.nonMember.invoiceAmount,
    state.member.invoiceAmount - (state.member.examsRedeemed * state.nonMember.examCost)
  );

  const getNonMemberWidth = () => {
    return (state.nonMember.invoiceAmount / maxValue) * 100;
  };

  const getMemberWidth = () => {
    const netAmount = state.member.invoiceAmount - (state.member.examsRedeemed * state.nonMember.examCost);
    return (netAmount / maxValue) * 100;
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-display text-white mb-4">Net Out-of-Pocket Comparison</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>Non-Member</span>
            <span>${state.nonMember.invoiceAmount.toFixed(2)}</span>
          </div>
          <div className="h-8 bg-dark/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full transition-all duration-500"
              style={{ width: `${getNonMemberWidth()}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>Member</span>
            <span>${(state.member.invoiceAmount - (state.member.examsRedeemed * state.nonMember.examCost)).toFixed(2)}</span>
          </div>
          <div className="h-8 bg-dark/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-dark rounded-full transition-all duration-500"
              style={{ width: `${getMemberWidth()}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonChart;