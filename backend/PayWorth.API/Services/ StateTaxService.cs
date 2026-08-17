using PayWorth.API.Services.StateTax;

namespace PayWorth.API.Services;

public class StateTaxService : IStateTaxService
{
    private static readonly HashSet<string> NoIndividualIncomeTaxStates =
        new(StringComparer.OrdinalIgnoreCase)
        {
            "AK",
            "FL",
            "NV",
            "SD",
            "TN",
            "TX",
            "WY"
        };

    public decimal Calculate(
        decimal annualIncome,
        string state,
        string filingStatus,
        int taxYear)
    {
        var normalizedState =
            state.Trim().ToUpperInvariant();

        if (NoIndividualIncomeTaxStates.Contains(normalizedState))
        {
            return 0m;
        }

        if (normalizedState == "CA")
        {
            var calculator =
                new CaliforniaTaxCalculator();

            return calculator.Calculate(
                annualIncome,
                filingStatus,
                taxYear
            );
        }
        if (normalizedState == "NY")
        {
            var calculator =
                new NewYorkTaxCalculator();

            return calculator.Calculate(
                annualIncome,
                filingStatus,
                taxYear
            );
        }

        throw new NotSupportedException(
            $"State tax calculation for {normalizedState} is not supported yet."
        );
    }
}