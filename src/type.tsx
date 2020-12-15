export interface userProp {
  handleNext: () => void;
  handleBack: () => void;
  activeStep: number;
  steps: string[];
  handleUserState: (
    firstname: string,
    lastname: string,
    emailadd: string
  ) => void;
}

export interface contactProp {
  handleNext: () => void;
  handleBack: () => void;
  activeStep: number;
  steps: string[];
  handleContactState: (phonenumber: number, add: string, zip: number) => void;
}

export interface accountProp {
  handleNext: () => void;
  handleBack: () => void;
  activeStep: number;
  steps: string[];
  handleBankState: (bank: string, type: string, accNumber: number) => void;
}
