using PayWorth.API.Models;

namespace PayWorth.API.Services;

public class SalaryCalculationService : ISalaryCalculationService
{
    private readonly IStateTaxService _stateTaxService;

    public SalaryCalculationService(
        IStateTaxService stateTaxService)
    {
        _stateTaxService = stateTaxService;
    }
    public SalaryResult Calculate(SalaryRequest request)
    {
        var gross = request.AnnualSalary;

        var standardDeduction =
            GetStandardDeduction(request.FilingStatus);

        var taxableIncome =
            Math.Max(0, gross - standardDeduction);

        var federalTax =
            CalculateFederalIncomeTax(
                taxableIncome,
                request.FilingStatus
            );

        var socialSecurity =
            CalculateSocialSecurity(gross);

        var medicare =
            CalculateMedicare(
                gross,
                request.FilingStatus
            );

        // State tax will be added next.
        var stateTax =
        _stateTaxService.Calculate(
        gross,
        request.State,
        request.FilingStatus,
        request.TaxYear
        );

        var totalTax =
            federalTax +
            stateTax +
            socialSecurity +
            medicare;

        var netAnnual =
            gross - totalTax;

        return new SalaryResult
        {
            GrossAnnual = Round(gross),

            FederalTax = Round(federalTax),

            StateTax = Round(stateTax),

            SocialSecurity = Round(socialSecurity),

            Medicare = Round(medicare),

            NetAnnual = Round(netAnnual),

            NetMonthly = Round(netAnnual / 12),

            NetBiweekly = Round(netAnnual / 26),

            NetWeekly = Round(netAnnual / 52),

            EffectiveTaxRate = gross > 0
                ? Round((totalTax / gross) * 100)
                : 0
        };
    }

    private decimal GetStandardDeduction(
        string filingStatus)
    {
        return NormalizeFilingStatus(filingStatus) switch
        {
            "single" => 16100m,

            "marriedjointly" => 32200m,

            "marriedseparately" => 16100m,

            "headofhousehold" => 24150m,

            _ => throw new ArgumentException(
                "Unsupported filing status."
            )
        };
    }

    private decimal CalculateFederalIncomeTax(
        decimal taxableIncome,
        string filingStatus)
    {
        var status =
            NormalizeFilingStatus(filingStatus);

        var brackets =
            status switch
            {
                "single" =>
                    GetSingleBrackets(),

                "marriedjointly" =>
                    GetMarriedJointlyBrackets(),

                "marriedseparately" =>
                    GetMarriedSeparatelyBrackets(),

                "headofhousehold" =>
                    GetHeadOfHouseholdBrackets(),

                _ => throw new ArgumentException(
                    "Unsupported filing status."
                )
            };

        decimal tax = 0;
        decimal previousLimit = 0;

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

    private decimal CalculateSocialSecurity(
        decimal gross)
    {
        const decimal rate = 0.062m;

        const decimal wageBase =
            184500m;

        var taxableWages =
            Math.Min(gross, wageBase);

        return taxableWages * rate;
    }

    private decimal CalculateMedicare(
        decimal gross,
        string filingStatus)
    {
        const decimal medicareRate =
            0.0145m;

        const decimal additionalRate =
            0.009m;

        var medicare =
            gross * medicareRate;

        var threshold =
            NormalizeFilingStatus(filingStatus)
            switch
            {
                "marriedjointly" =>
                    250000m,

                "marriedseparately" =>
                    125000m,

                "single" =>
                    200000m,

                "headofhousehold" =>
                    200000m,

                _ =>
                    200000m
            };

        if (gross > threshold)
        {
            medicare +=
                (gross - threshold) *
                additionalRate;
        }

        return medicare;
    }

    private List<TaxBracket>
        GetSingleBrackets()
    {
        return new()
        {
            new(12400m, 0.10m),
            new(50400m, 0.12m),
            new(105700m, 0.22m),
            new(201775m, 0.24m),
            new(256225m, 0.32m),
            new(640600m, 0.35m),
            new(decimal.MaxValue, 0.37m)
        };
    }

    private List<TaxBracket>
        GetMarriedJointlyBrackets()
    {
        return new()
        {
            new(24800m, 0.10m),
            new(100800m, 0.12m),
            new(211400m, 0.22m),
            new(403550m, 0.24m),
            new(512450m, 0.32m),
            new(768700m, 0.35m),
            new(decimal.MaxValue, 0.37m)
        };
    }

    private List<TaxBracket>
        GetMarriedSeparatelyBrackets()
    {
        return new()
        {
            new(12400m, 0.10m),
            new(50400m, 0.12m),
            new(105700m, 0.22m),
            new(201775m, 0.24m),
            new(256225m, 0.32m),
            new(384350m, 0.35m),
            new(decimal.MaxValue, 0.37m)
        };
    }

    private List<TaxBracket>
        GetHeadOfHouseholdBrackets()
    {
        return new()
        {
            new(17700m, 0.10m),
            new(67450m, 0.12m),
            new(105700m, 0.22m),
            new(201750m, 0.24m),
            new(256200m, 0.32m),
            new(640600m, 0.35m),
            new(decimal.MaxValue, 0.37m)
        };
    }

    private string NormalizeFilingStatus(
        string filingStatus)
    {
        return filingStatus
            .Trim()
            .ToLower()
            .Replace(" ", "")
            .Replace("-", "");
    }

    private decimal Round(decimal value)
    {
        return Math.Round(
            value,
            2,
            MidpointRounding.AwayFromZero
        );
    }

    private record TaxBracket(
        decimal UpperLimit,
        decimal Rate
    );
}