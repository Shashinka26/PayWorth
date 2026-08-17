namespace PayWorth.API.Models;

public class SalaryResult
{
    public decimal GrossAnnual { get; set; }

    public decimal FederalTax { get; set; }

    public decimal StateTax { get; set; }

    public decimal SocialSecurity { get; set; }

    public decimal Medicare { get; set; }

    public decimal NetAnnual { get; set; }

    public decimal NetMonthly { get; set; }

    public decimal NetBiweekly { get; set; }

    public decimal NetWeekly { get; set; }

    public decimal EffectiveTaxRate { get; set; }
}