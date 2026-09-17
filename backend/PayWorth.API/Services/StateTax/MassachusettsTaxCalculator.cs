namespace PayWorth.API.Services.StateTax;

public class MassachusettsTaxCalculator
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
                $"Unsupported Massachusetts tax year: {taxYear}");

        decimal exemption = filingStatus.ToLowerInvariant() switch
        {
            "marriedjointly" => 8800m,
            "headofhousehold" => 6800m,
            _ => 4400m
        };

        decimal taxableIncome = Math.Max(
            grossIncome - exemption,
            0m
        );

        decimal tax = taxableIncome * 0.05m;

        return Math.Round(
            tax,
            2,
            MidpointRounding.AwayFromZero
        );
    }
}