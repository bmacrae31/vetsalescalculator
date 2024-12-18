import React from 'react';
import { useCalculator } from '../context/CalculatorContext';
import { Sparkles, Heart, Bath, Stethoscope, Scissors, Syringe, Bone, Gift } from 'lucide-react';

const ICONS = {
  gift: Gift,
  scissors: Scissors,
  bath: Bath,
  stethoscope: Stethoscope,
  syringe: Syringe,
  bone: Bone,
  heart: Heart,
};

const ResultsSection = () => {
  const { state, settings } = useCalculator();

  const examService = settings.services.find(s => s.name === 'Annual Exam');
  const memberNetInvoice = state.member.invoiceAmount - (state.member.examsRedeemed * (examService?.value || 0));
  const memberRewards = memberNetInvoice * (settings.cashbackPercentage / 100);
  const charityDonation = settings.hasCharityProgram ? state.member.invoiceAmount * (settings.charityPercentage / 100) : 0;

  const ValueBox = ({ icon: Icon, title, value, color, gradient }: any) => (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100"></div>
      <div className="relative bg-dark/80 backdrop-blur-sm rounded-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-dark-lighter">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-display font-medium text-gray-400 mb-1">{title}</h4>
            <p className={`text-xl font-bold ${gradient ? 'bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent' : 'text-white'}`}>
              ${value.toFixed(2)}
            </p>
          </div>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  const totalMembershipValue = settings.services.reduce((total, service) => {
    if (service.name === 'Annual Exam') {
      return total + (service.value * (service.quantity - state.member.examsRedeemed));
    }
    return total + (service.value * service.quantity);
  }, memberRewards + (settings.hasCharityProgram ? charityDonation : 0));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ValueBox
          icon={Sparkles}
          title={`Rewards Earned (${settings.cashbackPercentage}%)`}
          value={memberRewards}
          color="text-yellow-400"
        />
        
        {settings.services.map((service, index) => {
          const Icon = ICONS[service.icon];
          const remainingValue = service.name === 'Annual Exam' 
            ? service.value * (service.quantity - state.member.examsRedeemed)
            : service.value * service.quantity;

          return (
            <ValueBox
              key={index}
              icon={Icon}
              title={`${service.name} Value`}
              value={remainingValue}
              color="text-primary-light"
            />
          );
        })}

        {settings.hasCharityProgram && (
          <ValueBox
            icon={Heart}
            title={`Charity Donation (${settings.charityPercentage}%)`}
            value={charityDonation}
            color="text-red-400"
          />
        )}
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
        <div className="relative bg-dark/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-dark-lighter">
          <h3 className="text-lg font-display font-semibold text-white mb-2">Total Membership Value</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
            ${totalMembershipValue.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Including {settings.cashbackPercentage}% rewards, all membership services
            {settings.hasCharityProgram && ` plus ${settings.charityPercentage}% charity donation`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;