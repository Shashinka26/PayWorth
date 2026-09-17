namespace PayWorth.API.Services.StateTax;

public class NorthCarolinaTaxCalculator
{
    public decimal Calculate(
        decimal grossIncome,
        string filingStatus,
        int taxYear)
    {
        if (grossIncome <= 0)
            return 0m;

        decimal taxRate = taxYear switch
        {
            2025 => 0.0425m,
            2026 => 0.0399m,
            _ => throw new ArgumentException(
                $"Unsupported North Carolina tax year: {taxYear}")
        };

        decimal standardDeduction = filingStatus.ToLowerInvariant() switch
        {
            "marriedjointly" => 25_500m,
            "headofhousehold" => 19_125m,
            "marriedseparately" => 12_750m,
            _ => 12_750m
        };

        decimal taxableIncome = Math.Max(
            grossIncome - standardDeduction,
            0m
        );

        decimal tax = taxableIncome * taxRate;

        return Math.Round(
            tax,
            2,
            MidpointRounding.AwayFromZero
        );
    }
}