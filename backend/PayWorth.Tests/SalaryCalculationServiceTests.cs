using PayWorth.API.Models;
using PayWorth.API.Services;

namespace PayWorth.Tests;

public class SalaryCalculationServiceTests
{
    [Fact]
    public void Calculate_TexasSingle85000_Should_Return_Correct_Result()
    {
        // Arrange
        var stateTaxService = new StateTaxService();

        var salaryService =
            new SalaryCalculationService(stateTaxService);

        var request = new SalaryRequest
        {
            AnnualSalary = 85000m,
            State = "TX",
            FilingStatus = "single",
            TaxYear = 2026
        };

        // Act
        var result = salaryService.Calculate(request);

        // Assert
        Assert.Equal(85000m, result.GrossAnnual);

        Assert.Equal(9870.00m, result.FederalTax);

        Assert.Equal(0m, result.StateTax);

        Assert.Equal(5270.00m, result.SocialSecurity);

        Assert.Equal(1232.50m, result.Medicare);

        Assert.Equal(68627.50m, result.NetAnnual);

        Assert.Equal(5718.96m, result.NetMonthly);

        Assert.Equal(2639.52m, result.NetBiweekly);

        Assert.Equal(1319.76m, result.NetWeekly);

        Assert.Equal(19.26m, result.EffectiveTaxRate);
    }
    [Fact]
    public void Calculate_IncomeAboveSocialSecurityCap_ShouldCapSocialSecurity()
    {
        // Arrange
        var stateTaxService = new StateTaxService();
        var salaryService = new SalaryCalculationService(stateTaxService);

        var request = new SalaryRequest
        {
            AnnualSalary = 250000m,
            State = "TX",
            FilingStatus = "single",
            TaxYear = 2026
        };

        // Act
        var result = salaryService.Calculate(request);

        // 2026 Social Security wage base:
        // $184,500 × 6.2% = $11,439
        Assert.Equal(11439.00m, result.SocialSecurity);
    }

    [Fact]
    public void Calculate_SingleIncomeAbove200000_ShouldApplyAdditionalMedicare()
    {
        // Arrange
        var stateTaxService = new StateTaxService();
        var salaryService = new SalaryCalculationService(stateTaxService);

        var request = new SalaryRequest
        {
            AnnualSalary = 250000m,
            State = "TX",
            FilingStatus = "single",
            TaxYear = 2026
        };

        // Act
        var result = salaryService.Calculate(request);

        // Normal Medicare:
        // $250,000 × 1.45% = $3,625
        //
        // Additional Medicare:
        // ($250,000 - $200,000) × 0.9% = $450
        //
        // Total = $4,075
        Assert.Equal(4075.00m, result.Medicare);
    }
}