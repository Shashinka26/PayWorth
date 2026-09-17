namespace PayWorth.API.Services.StateTax;

public class NewJerseyTaxCalculator
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
                $"Unsupported New Jersey tax year: {taxYear}");

        // Simplified estimate:
        // NJ provides a $1,000 taxpayer exemption.
        // Married filing jointly receives an additional $1,000 spouse exemption.
        decimal exemptions = filingStatus.ToLowerInvariant() switch
        {
            "marriedjointly" => 2000m,
            _ => 1000m
        };

        decimal taxableIncome = Math.Max(
            grossIncome - exemptions,
            0m
        );

        decimal tax;

        if (filingStatus.Equals(
                "marriedjointly",
                StringComparison.OrdinalIgnoreCase)
            || filingStatus.Equals(
                "headofhousehold",
                StringComparison.OrdinalIgnoreCase))
        {
            tax = CalculateTableB(taxableIncome);
        }
        else
        {
            // Single and Married Filing Separately
            tax = CalculateTableA(taxableIncome);
        }

        return Math.Round(
            Math.Max(tax, 0m),
            2,
            MidpointRounding.AwayFromZero
        );
    }

    private static decimal CalculateTableA(decimal income)
    {
        if (income <= 20_000m)
            return income * 0.014m;

        if (income <= 35_000m)
            return income * 0.0175m - 70m;

        if (income <= 40_000m)
            return income * 0.035m - 682.50m;

        if (income <= 75_000m)
            return income * 0.05525m - 1_492.50m;

        if (income <= 500_000m)
            return income * 0.0637m - 2_126.25m;

        if (income <= 1_000_000m)
            return income * 0.0897m - 15_126.25m;

        return income * 0.1075m - 32_926.25m;
    }

    private static decimal CalculateTableB(decimal income)
    {
        if (income <= 20_000m)
            return income * 0.014m;

        if (income <= 50_000m)
            return income * 0.0175m - 70m;

        if (income <= 70_000m)
            return income * 0.0245m - 420m;

        if (income <= 80_000m)
            return income * 0.035m - 1_154.50m;

        if (income <= 150_000m)
            return income * 0.05525m - 2_775m;

        if (income <= 500_000m)
            return income * 0.0637m - 4_042.50m;

        if (income <= 1_000_000m)
            return income * 0.0897m - 17_042.50m;

        return income * 0.1075m - 34_842.50m;
    }
}