namespace PayWorth.API.Services.StateTax;

public class NewYorkTaxCalculator
{
    public decimal Calculate(
        decimal annualIncome,
        string filingStatus,
        int taxYear)
    {
        if (taxYear != 2025 && taxYear != 2026)
        {
            throw new NotSupportedException(
                $"New York tax calculation for {taxYear} is not supported."
            );
        }

        var status =
            NormalizeFilingStatus(filingStatus);

        var standardDeduction =
            GetStandardDeduction(
                status,
                taxYear
            );

        var taxableIncome =
            Math.Max(
                0m,
                annualIncome - standardDeduction
            );

        var tax =
            CalculateNewYorkTax(
                annualIncome,
                taxableIncome,
                status,
                taxYear
            );

        return Math.Round(
            tax,
            2,
            MidpointRounding.AwayFromZero
        );
    }

    private decimal GetStandardDeduction(
        string status,
        int taxYear)
    {
        // New York standard deductions.
        // 2025 and 2026 currently use:
        // Single: $8,000
        // Married filing jointly: $16,050
        // Married filing separately: $8,000
        // Head of household: $11,200

        return status switch
        {
            "single" =>
                8000m,

            "marriedjointly" =>
                16050m,

            "marriedseparately" =>
                8000m,

            "headofhousehold" =>
                11200m,

            _ => throw new ArgumentException(
                "Unsupported filing status for New York."
            )
        };
    }

    private decimal CalculateNewYorkTax(
        decimal adjustedGrossIncome,
        decimal taxableIncome,
        string status,
        int taxYear)
    {
        if (taxableIncome <= 0)
        {
            return 0m;
        }

        /*
         * New York has special tax-computation rules
         * once NY adjusted gross income exceeds $107,650.
         *
         * For normal salary ranges below that threshold,
         * the published NY tax rate schedule can be used directly.
         */

        if (adjustedGrossIncome <= 107650m)
        {
            return CalculateTaxFromRateSchedule(
                taxableIncome,
                status,
                taxYear
            );
        }

        return CalculateHighIncomeTax(
            adjustedGrossIncome,
            taxableIncome,
            status,
            taxYear
        );
    }

    private decimal CalculateHighIncomeTax(
        decimal adjustedGrossIncome,
        decimal taxableIncome,
        string status,
        int taxYear)
    {
        if (taxYear == 2026)
        {
            return status switch
            {
                "single" or "marriedseparately" =>
                    Calculate2026SingleHighIncomeTax(
                        adjustedGrossIncome,
                        taxableIncome
                    ),

                "marriedjointly" =>
                    Calculate2026MarriedHighIncomeTax(
                        adjustedGrossIncome,
                        taxableIncome
                    ),

                "headofhousehold" =>
                    Calculate2026HeadOfHouseholdHighIncomeTax(
                        adjustedGrossIncome,
                        taxableIncome
                    ),

                _ => throw new ArgumentException(
                    "Unsupported filing status for New York."
                )
            };
        }

        return status switch
        {
            "single" or "marriedseparately" =>
                Calculate2025SingleHighIncomeTax(
                    adjustedGrossIncome,
                    taxableIncome
                ),

            "marriedjointly" =>
                Calculate2025MarriedHighIncomeTax(
                    adjustedGrossIncome,
                    taxableIncome
                ),

            "headofhousehold" =>
                Calculate2025HeadOfHouseholdHighIncomeTax(
                    adjustedGrossIncome,
                    taxableIncome
                ),

            _ => throw new ArgumentException(
                "Unsupported filing status for New York."
            )
        };
    }

    // =========================================================
    // 2026 HIGH-INCOME CALCULATIONS
    // =========================================================

    private decimal Calculate2026SingleHighIncomeTax(
        decimal agi,
        decimal taxableIncome)
    {
        if (agi > 25000000m)
        {
            return taxableIncome * 0.109m;
        }

        if (taxableIncome <= 215400m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "single",
                    2026
                );

            if (agi >= 157650m)
            {
                return taxableIncome * 0.059m;
            }

            return ApplyRecaptureFormula(
                normalTax,
                taxableIncome * 0.059m,
                agi,
                107650m,
                50000m,
                0m
            );
        }

        if (taxableIncome <= 1077550m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "single",
                    2026
                );

            return normalTax
                + 567m
                + CalculateIncrementalBenefit(
                    agi,
                    215400m,
                    2047m
                );
        }

        if (taxableIncome <= 5000000m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "single",
                    2026
                );

            return normalTax
                + 2614m
                + CalculateIncrementalBenefit(
                    agi,
                    1077550m,
                    30172m
                );
        }

        if (agi <= 5000000m)
        {
            return CalculateTaxFromRateSchedule(
                taxableIncome,
                "single",
                2026
            );
        }

        if (taxableIncome <= 25000000m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "single",
                    2026
                );

            return normalTax
                + 32786m
                + CalculateIncrementalBenefit(
                    agi,
                    5000000m,
                    32500m
                );
        }

        return taxableIncome * 0.109m;
    }

    private decimal Calculate2026MarriedHighIncomeTax(
        decimal agi,
        decimal taxableIncome)
    {
        if (agi > 25000000m)
        {
            return taxableIncome * 0.109m;
        }

        if (taxableIncome <= 161550m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "marriedjointly",
                    2026
                );

            if (agi >= 157650m)
            {
                return taxableIncome * 0.054m;
            }

            return ApplyRecaptureFormula(
                normalTax,
                taxableIncome * 0.054m,
                agi,
                107650m,
                50000m,
                0m
            );
        }

        if (taxableIncome <= 323200m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "marriedjointly",
                    2026
                );

            return normalTax
                + 333m
                + CalculateIncrementalBenefit(
                    agi,
                    161550m,
                    807m
                );
        }

        if (taxableIncome <= 2155350m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "marriedjointly",
                    2026
                );

            return normalTax
                + 1140m
                + CalculateIncrementalBenefit(
                    agi,
                    323200m,
                    3071m
                );
        }

        if (taxableIncome <= 5000000m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "marriedjointly",
                    2026
                );

            return normalTax
                + 4211m
                + CalculateIncrementalBenefit(
                    agi,
                    2155350m,
                    60350m
                );
        }

        if (agi <= 5000000m)
        {
            return CalculateTaxFromRateSchedule(
                taxableIncome,
                "marriedjointly",
                2026
            );
        }

        if (taxableIncome <= 25000000m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "marriedjointly",
                    2026
                );

            return normalTax
                + 64561m
                + CalculateIncrementalBenefit(
                    agi,
                    5000000m,
                    32500m
                );
        }

        return taxableIncome * 0.109m;
    }

    private decimal Calculate2026HeadOfHouseholdHighIncomeTax(
        decimal agi,
        decimal taxableIncome)
    {
        if (agi > 25000000m)
        {
            return taxableIncome * 0.109m;
        }

        if (taxableIncome <= 269300m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "headofhousehold",
                    2026
                );

            if (agi >= 157650m)
            {
                return taxableIncome * 0.059m;
            }

            return ApplyRecaptureFormula(
                normalTax,
                taxableIncome * 0.059m,
                agi,
                107650m,
                50000m,
                0m
            );
        }

        if (taxableIncome <= 1616450m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "headofhousehold",
                    2026
                );

            return normalTax
                + 787m
                + CalculateIncrementalBenefit(
                    agi,
                    269300m,
                    2559m
                );
        }

        if (taxableIncome <= 5000000m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "headofhousehold",
                    2026
                );

            return normalTax
                + 3346m
                + CalculateIncrementalBenefit(
                    agi,
                    1616450m,
                    45260m
                );
        }

        if (agi <= 5000000m)
        {
            return CalculateTaxFromRateSchedule(
                taxableIncome,
                "headofhousehold",
                2026
            );
        }

        if (taxableIncome <= 25000000m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "headofhousehold",
                    2026
                );

            return normalTax
                + 48606m
                + CalculateIncrementalBenefit(
                    agi,
                    5000000m,
                    32500m
                );
        }

        return taxableIncome * 0.109m;
    }

    // =========================================================
    // 2025 HIGH-INCOME CALCULATIONS
    // =========================================================

    private decimal Calculate2025SingleHighIncomeTax(
        decimal agi,
        decimal taxableIncome)
    {
        if (agi > 25000000m)
        {
            return taxableIncome * 0.109m;
        }

        if (taxableIncome <= 215400m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "single",
                    2025
                );

            if (agi >= 157650m)
            {
                return taxableIncome * 0.06m;
            }

            return ApplyRecaptureFormula(
                normalTax,
                taxableIncome * 0.06m,
                agi,
                107650m,
                50000m,
                0m
            );
        }

        return CalculateTaxFromRateSchedule(
            taxableIncome,
            "single",
            2025
        );
    }

    private decimal Calculate2025MarriedHighIncomeTax(
        decimal agi,
        decimal taxableIncome)
    {
        if (agi > 25000000m)
        {
            return taxableIncome * 0.109m;
        }

        if (taxableIncome <= 161550m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "marriedjointly",
                    2025
                );

            if (agi >= 157650m)
            {
                return taxableIncome * 0.055m;
            }

            return ApplyRecaptureFormula(
                normalTax,
                taxableIncome * 0.055m,
                agi,
                107650m,
                50000m,
                0m
            );
        }

        return CalculateTaxFromRateSchedule(
            taxableIncome,
            "marriedjointly",
            2025
        );
    }

    private decimal Calculate2025HeadOfHouseholdHighIncomeTax(
        decimal agi,
        decimal taxableIncome)
    {
        if (agi > 25000000m)
        {
            return taxableIncome * 0.109m;
        }

        if (taxableIncome <= 269300m)
        {
            var normalTax =
                CalculateTaxFromRateSchedule(
                    taxableIncome,
                    "headofhousehold",
                    2025
                );

            if (agi >= 157650m)
            {
                return taxableIncome * 0.06m;
            }

            return ApplyRecaptureFormula(
                normalTax,
                taxableIncome * 0.06m,
                agi,
                107650m,
                50000m,
                0m
            );
        }

        return CalculateTaxFromRateSchedule(
            taxableIncome,
            "headofhousehold",
            2025
        );
    }

    // =========================================================
    // RATE SCHEDULE
    // =========================================================

    private decimal CalculateTaxFromRateSchedule(
        decimal taxableIncome,
        string status,
        int taxYear)
    {
        var brackets =
            GetBrackets(
                status,
                taxYear
            );

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

    private List<TaxBracket> GetBrackets(
        string status,
        int taxYear)
    {
        if (taxYear == 2026)
        {
            return status switch
            {
                "single" or "marriedseparately" =>
                    Get2026SingleBrackets(),

                "marriedjointly" =>
                    Get2026MarriedBrackets(),

                "headofhousehold" =>
                    Get2026HeadOfHouseholdBrackets(),

                _ => throw new ArgumentException(
                    "Unsupported filing status."
                )
            };
        }

        return status switch
        {
            "single" or "marriedseparately" =>
                Get2025SingleBrackets(),

            "marriedjointly" =>
                Get2025MarriedBrackets(),

            "headofhousehold" =>
                Get2025HeadOfHouseholdBrackets(),

            _ => throw new ArgumentException(
                "Unsupported filing status."
            )
        };
    }

    // =========================================================
    // 2026 BRACKETS
    // =========================================================

    private List<TaxBracket> Get2026SingleBrackets()
    {
        return new()
        {
            new(8500m, 0.0390m),
            new(11700m, 0.0440m),
            new(13900m, 0.0515m),
            new(80650m, 0.0540m),
            new(215400m, 0.0590m),
            new(1077550m, 0.0685m),
            new(5000000m, 0.0965m),
            new(25000000m, 0.1030m),
            new(decimal.MaxValue, 0.1090m)
        };
    }

    private List<TaxBracket> Get2026MarriedBrackets()
    {
        return new()
        {
            new(17150m, 0.0390m),
            new(23600m, 0.0440m),
            new(27900m, 0.0515m),
            new(161550m, 0.0540m),
            new(323200m, 0.0590m),
            new(2155350m, 0.0685m),
            new(5000000m, 0.0965m),
            new(25000000m, 0.1030m),
            new(decimal.MaxValue, 0.1090m)
        };
    }

    private List<TaxBracket> Get2026HeadOfHouseholdBrackets()
    {
        return new()
        {
            new(12800m, 0.0390m),
            new(17650m, 0.0440m),
            new(20900m, 0.0515m),
            new(107650m, 0.0540m),
            new(269300m, 0.0590m),
            new(1616450m, 0.0685m),
            new(5000000m, 0.0965m),
            new(25000000m, 0.1030m),
            new(decimal.MaxValue, 0.1090m)
        };
    }

    // =========================================================
    // 2025 BRACKETS
    // =========================================================

    private List<TaxBracket> Get2025SingleBrackets()
    {
        return new()
        {
            new(8500m, 0.0400m),
            new(11700m, 0.0450m),
            new(13900m, 0.0525m),
            new(80650m, 0.0550m),
            new(215400m, 0.0600m),
            new(1077550m, 0.0685m),
            new(5000000m, 0.0965m),
            new(25000000m, 0.1030m),
            new(decimal.MaxValue, 0.1090m)
        };
    }

    private List<TaxBracket> Get2025MarriedBrackets()
    {
        return new()
        {
            new(17150m, 0.0400m),
            new(23600m, 0.0450m),
            new(27900m, 0.0525m),
            new(161550m, 0.0550m),
            new(323200m, 0.0600m),
            new(2155350m, 0.0685m),
            new(5000000m, 0.0965m),
            new(25000000m, 0.1030m),
            new(decimal.MaxValue, 0.1090m)
        };
    }

    private List<TaxBracket> Get2025HeadOfHouseholdBrackets()
    {
        return new()
        {
            new(12800m, 0.0400m),
            new(17650m, 0.0450m),
            new(20900m, 0.0525m),
            new(107650m, 0.0550m),
            new(269300m, 0.0600m),
            new(1616450m, 0.0685m),
            new(5000000m, 0.0965m),
            new(25000000m, 0.1030m),
            new(decimal.MaxValue, 0.1090m)
        };
    }

    // =========================================================
    // HELPERS
    // =========================================================

    private decimal CalculateIncrementalBenefit(
        decimal agi,
        decimal threshold,
        decimal incrementalBenefit)
    {
        var excess =
            Math.Max(
                0m,
                agi - threshold
            );

        var cappedExcess =
            Math.Min(
                excess,
                50000m
            );

        return
            (cappedExcess / 50000m)
            * incrementalBenefit;
    }

    private decimal ApplyRecaptureFormula(
        decimal scheduleTax,
        decimal targetTax,
        decimal agi,
        decimal agiThreshold,
        decimal phaseoutRange,
        decimal unused)
    {
        var excess =
            Math.Max(
                0m,
                agi - agiThreshold
            );

        var percentage =
            Math.Round(
                Math.Min(
                    excess / phaseoutRange,
                    1m
                ),
                4,
                MidpointRounding.AwayFromZero
            );

        return
            scheduleTax
            + ((targetTax - scheduleTax) * percentage);
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