namespace PayWorth.API.Services.StateTax;

public class IllinoisTaxCalculator
{
    public decimal Calculate(
        decimal grossIncome,
        string filingStatus,
        int taxYear)
    {
        if (grossIncome <= 0)
            return 0m;

        decimal exemptionAmount = taxYear switch
        {
            2025 => 2850m,
            2026 => 2925m,
            _ => throw new ArgumentException(
                $"Unsupported Illinois tax year: {taxYear}")
        };

        decimal exemptions = filingStatus.ToLowerInvariant() switch
        {
            "marriedjointly" => exemptionAmount * 2m,
            "marriedseparately" => exemptionAmount,
            "headofhousehold" => exemptionAmount,
            _ => exemptionAmount
        };

        decimal taxableIncome = Math.Max(
            grossIncome - exemptions,
            0m
        );

        decimal tax = taxableIncome * 0.0495m;

        return Math.Round(
            tax,
            2,
            MidpointRounding.AwayFromZero
        );
    }
}