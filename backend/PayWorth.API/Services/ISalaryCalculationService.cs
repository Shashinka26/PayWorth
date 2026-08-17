using PayWorth.API.Models;

namespace PayWorth.API.Services;

public interface ISalaryCalculationService
{
    SalaryResult Calculate(SalaryRequest request);
}