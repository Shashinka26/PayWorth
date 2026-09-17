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
        "NH",
        "SD",
        "TN",
        "TX",
        "WA",
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

        if (normalizedState == "IL")
        {
            var calculator =
                new IllinoisTaxCalculator();

            return calculator.Calculate(
                annualIncome,
                filingStatus,
                taxYear
            );
        }

        if (normalizedState == "PA")
        {
            var calculator =
                new PennsylvaniaTaxCalculator();

            return calculator.Calculate(
                annualIncome,
                filingStatus,
                taxYear
            );
        }

        if (normalizedState == "NJ")
        {
            var calculator =
                new NewJerseyTaxCalculator();

            return calculator.Calculate(
                annualIncome,
                filingStatus,
                taxYear
            );
        }

        if (normalizedState == "MA")
        {
            var calculator =
                new MassachusettsTaxCalculator();

            return calculator.Calculate(
                annualIncome,
                filingStatus,
                taxYear
            );
        }

        if (normalizedState == "NC")
        {
            var calculator =
                new NorthCarolinaTaxCalculator();

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