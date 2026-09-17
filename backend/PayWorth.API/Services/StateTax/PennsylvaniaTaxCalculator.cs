namespace PayWorth.API.Services.StateTax;

public class PennsylvaniaTaxCalculator
{
    public decimal Calculate(
        decimal grossIncome,
        string filingStatus,
        int taxYear)
    {
        if (grossIncome <= 0)
            return 0m;

        if (taxYear != 2025 && taxYear != 2026)
            throw new ArgumentException(
                $"Unsupported Pennsylvania tax year: {taxYear}");

        // Pennsylvania personal income tax is a flat 3.07%.
        // PA does not provide a standard deduction or personal exemption.
        decimal tax = grossIncome * 0.0307m;

        return Math.Round(
            tax,
            2,
            MidpointRounding.AwayFromZero
        );
    }
}