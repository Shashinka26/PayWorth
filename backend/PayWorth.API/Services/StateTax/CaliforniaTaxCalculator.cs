namespace PayWorth.API.Services.StateTax;

public class CaliforniaTaxCalculator
{
    public decimal Calculate(
        decimal annualIncome,
        string filingStatus,
        int taxYear)
    {
        if (taxYear != 2026)
        {
            throw new NotSupportedException(
                "California currently supports tax year 2026 only."
            );
        }

        var status = NormalizeFilingStatus(filingStatus);

        var standardDeduction =
            GetStandardDeduction(status);

        var taxableIncome =
            Math.Max(
                0,
                annualIncome - standardDeduction
            );

        var brackets =
            GetBrackets(status);

        var tax =
            CalculateProgressiveTax(
                taxableIncome,
                brackets
            );

        return Math.Round(
            tax,
            2,
            MidpointRounding.AwayFromZero
        );
    }

    private decimal GetStandardDeduction(
        string status)
    {
        return status switch
        {
            "single" => 5706m,

            "marriedseparately" => 5706m,

            "marriedjointly" => 11412m,

            "headofhousehold" => 11412m,

            _ => throw new ArgumentException(
                "Unsupported filing status for California."
            )
        };
    }

    private List<TaxBracket> GetBrackets(
        string status)
    {
        return status switch
        {
            "single" or "marriedseparately"
                => GetSingleBrackets(),

            "marriedjointly"
                => GetMarriedJointBrackets(),

            "headofhousehold"
                => GetHeadOfHouseholdBrackets(),

            _ => throw new ArgumentException(
                "Unsupported filing status for California."
            )
        };
    }

    private List<TaxBracket> GetSingleBrackets()
    {
        return new()
        {
            new(11079m, 0.01m),
            new(26264m, 0.02m),
            new(41452m, 0.04m),
            new(57542m, 0.06m),
            new(72724m, 0.08m),
            new(371479m, 0.093m),
            new(445771m, 0.103m),
            new(742953m, 0.113m),
            new(decimal.MaxValue, 0.123m)
        };
    }

    private List<TaxBracket>
        GetMarriedJointBrackets()
    {
        return new()
        {
            new(22158m, 0.01m),
            new(52528m, 0.02m),
            new(82904m, 0.04m),
            new(115084m, 0.06m),
            new(145448m, 0.08m),
            new(742958m, 0.093m),
            new(891542m, 0.103m),
            new(1485906m, 0.113m),
            new(decimal.MaxValue, 0.123m)
        };
    }

    private List<TaxBracket>
        GetHeadOfHouseholdBrackets()
    {
        return new()
        {
            new(22173m, 0.01m),
            new(52530m, 0.02m),
            new(67716m, 0.04m),
            new(83805m, 0.06m),
            new(98990m, 0.08m),
            new(505208m, 0.093m),
            new(606251m, 0.103m),
            new(1010417m, 0.113m),
            new(decimal.MaxValue, 0.123m)
        };
    }

    private decimal CalculateProgressiveTax(
        decimal taxableIncome,
        List<TaxBracket> brackets)
    {
        decimal tax = 0m;
        decimal previousLimit = 0m;

        foreach (var bracket in brackets)
        {
            if (taxableIncome <= previousLimit)
            {
                break;
            }

            var taxableInBracket =
                Math.Min(
                    taxableIncome,
                    bracket.UpperLimit
                ) - previousLimit;

            if (taxableInBracket > 0)
            {
                tax +=
                    taxableInBracket *
                    bracket.Rate;
            }

            previousLimit =
                bracket.UpperLimit;
        }

        return tax;
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

    private record TaxBracket(
        decimal UpperLimit,
        decimal Rate
    );
}