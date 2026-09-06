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
        ValidateTaxYear(request.TaxYear);

        var gross = request.AnnualSalary;

        var standardDeduction =
            GetStandardDeduction(
                request.FilingStatus,
                request.TaxYear
            );

        var taxableIncome =
            Math.Max(0, gross - standardDeduction);

        var federalTax =
            CalculateFederalIncomeTax(
                taxableIncome,
                request.FilingStatus,
                request.TaxYear
            );

        var socialSecurity =
            CalculateSocialSecurity(
                gross,
                request.TaxYear
            );

        var medicare =
            CalculateMedicare(
                gross,
                request.FilingStatus
            );

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
        string filingStatus,
        int taxYear)
    {
        var status =
            NormalizeFilingStatus(filingStatus);

        return taxYear switch
        {
            2025 => status switch
            {
                "single" => 15750m,
                "marriedjointly" => 31500m,
                "marriedseparately" => 15750m,
                "headofhousehold" => 23625m,

                _ => throw new ArgumentException(
                    "Unsupported filing status."
                )
            },

            2026 => status switch
            {
                "single" => 16100m,
                "marriedjointly" => 32200m,
                "marriedseparately" => 16100m,
                "headofhousehold" => 24150m,

                _ => throw new ArgumentException(
                    "Unsupported filing status."
                )
            },

            _ => throw new ArgumentException(
                $"Unsupported tax year: {taxYear}"
            )
        };
    }

    private decimal CalculateFederalIncomeTax(
        decimal taxableIncome,
        string filingStatus,
        int taxYear)
    {
        var status =
            NormalizeFilingStatus(filingStatus);

        var brackets =
            taxYear switch
            {
                2025 => status switch
                {
                    "single" =>
                        Get2025SingleBrackets(),

                    "marriedjointly" =>
                        Get2025MarriedJointlyBrackets(),

                    "marriedseparately" =>
                        Get2025MarriedSeparatelyBrackets(),

                    "headofhousehold" =>
                        Get2025HeadOfHouseholdBrackets(),

                    _ => throw new ArgumentException(
                        "Unsupported filing status."
                    )
                },

                2026 => status switch
                {
                    "single" =>
                        Get2026SingleBrackets(),

                    "marriedjointly" =>
                        Get2026MarriedJointlyBrackets(),

                    "marriedseparately" =>
                        Get2026MarriedSeparatelyBrackets(),

                    "headofhousehold" =>
                        Get2026HeadOfHouseholdBrackets(),

                    _ => throw new ArgumentException(
                        "Unsupported filing status."
                    )
                },

                _ => throw new ArgumentException(
                    $"Unsupported tax year: {taxYear}"
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
        decimal gross,
        int taxYear)
    {
        const decimal rate = 0.062m;

        var wageBase =
            taxYear switch
            {
                2025 => 176100m,
                2026 => 184500m,

                _ => throw new ArgumentException(
                    $"Unsupported tax year: {taxYear}"
                )
            };

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

    // =========================
    // 2025 FEDERAL TAX BRACKETS
    // =========================

    private List<TaxBracket>
        Get2025SingleBrackets()
    {
        return new()
        {
            new(11925m, 0.10m),
            new(48475m, 0.12m),
            new(103350m, 0.22m),
            new(197300m, 0.24m),
            new(250525m, 0.32m),
            new(626350m, 0.35m),
            new(decimal.MaxValue, 0.37m)
        };
    }

    private List<TaxBracket>
        Get2025MarriedJointlyBrackets()
    {
        return new()
        {
            new(23850m, 0.10m),
            new(96950m, 0.12m),
            new(206700m, 0.22m),
            new(394600m, 0.24m),
            new(501050m, 0.32m),
            new(751600m, 0.35m),
            new(decimal.MaxValue, 0.37m)
        };
    }

    private List<TaxBracket>
        Get2025MarriedSeparatelyBrackets()
    {
        return new()
        {
            new(11925m, 0.10m),
            new(48475m, 0.12m),
            new(103350m, 0.22m),
            new(197300m, 0.24m),
            new(250525m, 0.32m),
            new(375800m, 0.35m),
            new(decimal.MaxValue, 0.37m)
        };
    }

    private List<TaxBracket>
        Get2025HeadOfHouseholdBrackets()
    {
        return new()
        {
            new(17000m, 0.10m),
            new(64850m, 0.12m),
            new(103350m, 0.22m),
            new(197300m, 0.24m),
            new(250500m, 0.32m),
            new(626350m, 0.35m),
            new(decimal.MaxValue, 0.37m)
        };
    }

    // =========================
    // 2026 FEDERAL TAX BRACKETS
    // =========================

    private List<TaxBracket>
        Get2026SingleBrackets()
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
        Get2026MarriedJointlyBrackets()
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
        Get2026MarriedSeparatelyBrackets()
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
        Get2026HeadOfHouseholdBrackets()
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

    private void ValidateTaxYear(int taxYear)
    {
        if (taxYear != 2025 &&
            taxYear != 2026)
        {
            throw new ArgumentException(
                $"Unsupported tax year: {taxYear}"
            );
        }
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