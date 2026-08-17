namespace PayWorth.API.Models;

public class SalaryRequest
{
    public decimal AnnualSalary { get; set; }

    public string State { get; set; } = string.Empty;

    public string FilingStatus { get; set; } = "single";

    public int TaxYear { get; set; } = 2026;
}