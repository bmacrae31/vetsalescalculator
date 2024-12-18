export interface NonMemberState {
  invoiceAmount: number;
  examCost: number;
}

export interface MemberState {
  invoiceAmount: number;
  examsRedeemed: number;
}

export interface State {
  nonMember: NonMemberState;
  member: MemberState;
  settings: Settings;
  isSettingsModalOpen: boolean;
  isFirstVisit: boolean;
}

export type Action = 
  | { type: 'UPDATE_INPUT'; payload: { type: 'member' | 'nonMember'; field: string; value: number } }
  | { type: 'UPDATE_SETTINGS'; payload: { field: string; value: any } };