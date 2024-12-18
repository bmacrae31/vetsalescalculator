import React from 'react';
import { Settings, MembershipService } from '../types/settings';
import { Bath, Stethoscope, Scissors, Syringe, Bone } from 'lucide-react';

interface MembershipSettingsModalProps {
  settings: Settings;
  updateSettings: (key: keyof Settings, value: any) => void;
  onClose: () => void;
}

const ICON_OPTIONS = [
  { value: 'stethoscope', label: 'Stethoscope', icon: Stethoscope },
  { value: 'scissors', label: 'Scissors', icon: Scissors },
  { value: 'bath', label: 'Bath', icon: Bath },
  { value: 'syringe', label: 'Syringe', icon: Syringe },
  { value: 'bone', label: 'Bone', icon: Bone },
];

export const MembershipSettingsModal: React.FC<MembershipSettingsModalProps> = ({
  settings,
  updateSettings,
  onClose,
}) => {
  const handleServiceChange = (index: number, field: keyof MembershipService, value: any) => {
    const newServices = [...settings.services];
    newServices[index] = { ...newServices[index], [field]: value };
    updateSettings('services', newServices);
  };

  const addService = () => {
    const newServices = [...settings.services, {
      name: '',
      value: 0,
      quantity: 1,
      icon: 'bone'
    }];
    updateSettings('services', newServices);
  };

  const removeService = (index: number) => {
    const newServices = settings.services.filter((_, i) => i !== index);
    updateSettings('services', newServices);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-dark-light rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border border-dark-lighter">
        <h2 className="text-2xl font-display text-white mb-4">Membership Settings</h2>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-display text-white mb-1">
              Cashback Percentage
            </label>
            <div className="relative">
              <input
                type="number"
                value={settings.cashbackPercentage}
                onChange={(e) => updateSettings('cashbackPercentage', Number(e.target.value))}
                className="w-full pr-8 pl-4 py-2 bg-dark border border-dark-lighter text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                step="0.1"
                min="0"
                max="100"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-display text-white">Membership Services</h3>
            {settings.services.map((service, index) => (
              <div key={index} className="p-4 border border-dark-lighter rounded-lg space-y-3 bg-dark/80">
                <div className="flex justify-between items-center">
                  <h4 className="font-display text-white">Service {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <label className="block text-sm text-white mb-1">Name</label>
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-dark border border-dark-lighter text-white rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Service Name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-white mb-1">Value</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input
                        type="number"
                        value={service.value}
                        onChange={(e) => handleServiceChange(index, 'value', Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 bg-dark border border-dark-lighter text-white rounded-lg focus:ring-2 focus:ring-primary"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white mb-1">Quantity</label>
                    <input
                      type="number"
                      value={service.quantity}
                      onChange={(e) => handleServiceChange(index, 'quantity', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-dark border border-dark-lighter text-white rounded-lg focus:ring-2 focus:ring-primary"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white mb-1">Icon</label>
                  <select
                    value={service.icon}
                    onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 bg-dark border border-dark-lighter text-white rounded-lg focus:ring-2 focus:ring-primary"
                  >
                    {ICON_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addService}
              className="w-full px-4 py-2 text-sm bg-dark hover:bg-dark-lighter text-white rounded-lg border border-dark-lighter"
            >
              Add Service
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-display text-white mb-1">
                Charity Program
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={!settings.hasCharityProgram}
                  onChange={(e) => updateSettings('hasCharityProgram', !e.target.checked)}
                  className="w-4 h-4 text-primary border-dark-lighter rounded focus:ring-primary bg-dark"
                />
                <span className="text-sm text-gray-300">*We do not have charity as part of our program</span>
              </div>
            </div>

            {settings.hasCharityProgram && (
              <div className="relative">
                <label className="block text-sm font-display text-white mb-1">
                  Charity Percentage
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={settings.charityPercentage}
                    onChange={(e) => updateSettings('charityPercentage', Number(e.target.value))}
                    className="w-full pr-8 pl-4 py-2 bg-dark border border-dark-lighter text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    step="0.1"
                    min="0"
                    max="100"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white hover:bg-dark-lighter rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MembershipSettingsModal;