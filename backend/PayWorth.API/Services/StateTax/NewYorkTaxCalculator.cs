namespace PayWorth.API.Services.StateTax;

public class NewYorkTaxCalculator
{
    public decimal Calculate(
        decimal annualIncome,
        string filingStatus,
        int taxYear)
    {
        if (taxYear != 2026)
        {
            throw new NotSupportedException(
                "New York currently supports tax year 2026 only."
            );
        }

        var status = NormalizeFilingStatus(filingStatus);

        var deduction = status switch
        {
            "single" => 7400m,
            "marriedjointly" => 7950m,

            _ => throw new NotSupportedException(
                "New York currently supports single and marriedJointly only."
            )
        };

        var netWages =
            Math.Max(0m, annualIncome - deduction);

        var tax = status switch
        {
            "single" =>
                CalculateSingle(netWages),

            "marriedjointly" =>
                CalculateMarried(netWages),

            _ => 0m
        };

        return Math.Round(
            tax,
            2,
            MidpointRounding.AwayFromZero
        );
    }

    private decimal CalculateSingle(decimal income)
    {
        if (income < 8500m)
            return income * 0.0390m;

        if (income < 11700m)
            return (income - 8500m) * 0.0440m + 332m;

        if (income < 13900m)
            return (income - 11700m) * 0.0515m + 472m;

        if (income < 80650m)
            return (income - 13900m) * 0.0540m + 586m;

        if (income < 96800m)
            return (income - 80650m) * 0.0590m + 4190m;

        if (income < 107650m)
            return (income - 96800m) * 0.0703m + 5143m;

        if (income < 157650m)
            return (income - 107650m) * 0.0753m + 5906m;

        if (income < 215400m)
            return (income - 157650m) * 0.0640m + 9673m;

        if (income < 265400m)
            return (income - 215400m) * 0.1144m + 13369m;

        if (income < 1077550m)
            return (income - 265400m) * 0.0735m + 19091m;

        throw new NotSupportedException(
            "New York income above $1,077,550 requires the Method III top-income calculation."
        );
    }

    private decimal CalculateMarried(decimal income)
    {
        if (income < 8500m)
            return income * 0.0390m;

        if (income < 11700m)
            return (income - 8500m) * 0.0440m + 332m;

        if (income < 13900m)
            return (income - 11700m) * 0.0515m + 472m;

        if (income < 80650m)
            return (income - 13900m) * 0.0540m + 586m;

        if (income < 96800m)
            return (income - 80650m) * 0.0590m + 4190m;

        if (income < 107650m)
            return (income - 96800m) * 0.0657m + 5143m;

        if (income < 157650m)
            return (income - 107650m) * 0.0707m + 5855m;

        if (income < 211550m)
            return (income - 157650m) * 0.0801m + 9388m;

        if (income < 323200m)
            return (income - 211550m) * 0.0640m + 13708m;

        if (income < 373200m)
            return (income - 323200m) * 0.1349m + 20854m;

        if (income < 1077550m)
            return (income - 373200m) * 0.0735m + 27600m;

        if (income < 2155350m)
            return (income - 1077550m) * 0.0765m + 79369m;

        throw new NotSupportedException(
            "New York income above $2,155,350 requires the Method III top-income calculation."
        );
    }

    private string NormalizeFilingStatus(
        string filingStatus)
    {
        return filingStatus
            .Trim()
            .ToLowerInvariant()
            .Replace(" ", "")
            .Replace("-", "");
    }
}