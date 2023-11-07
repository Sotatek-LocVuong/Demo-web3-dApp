export type TokenBalanceType = {
  type: string;
  tokenName: string;
  balance: number;
};

export enum TabNames {
  WalletInfo = 1,
  InteractiveForm = 2
}

export enum TokenType {
  Native = 'Native',
  Other = 'Other'
}
