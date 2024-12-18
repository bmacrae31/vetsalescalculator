export interface MembershipService {
  name: string;
  value: number;
  quantity: number;
  icon: 'gift' | 'scissors' | 'bath' | 'stethoscope' | 'syringe' | 'bone' | 'heart';
}

export interface Settings {
  cashbackPercentage: number;
  charityPercentage: number;
  hasCharityProgram: boolean;
  services: MembershipService[];
}