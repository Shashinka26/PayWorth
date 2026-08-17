namespace PayWorth.API.Services;

public interface IStateTaxService
{
    decimal Calculate(
        decimal annualIncome,
        string state,
        string filingStatus,
        int taxYear
    );
}