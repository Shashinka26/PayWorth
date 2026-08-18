export type SalaryRequest = {
  annualSalary: number;
  state: string;
  filingStatus: string;
  taxYear: number;
};

export type SalaryResult = {
  grossAnnual: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  netAnnual: number;
  netMonthly: number;
  netBiweekly: number;
  netWeekly: number;
  effectiveTaxRate: number;
};