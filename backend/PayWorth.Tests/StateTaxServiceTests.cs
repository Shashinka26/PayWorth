using PayWorth.API.Services;

namespace PayWorth.Tests;

public class StateTaxServiceTests
{
    [Fact]
    public void Texas_Should_Return_Zero_State_Tax()
    {
        var service = new StateTaxService();

        var result = service.Calculate(
            85000m,
            "TX",
            "single",
            2026
        );

        Assert.Equal(0m, result);
    }

    [Fact]
    public void California_Should_Calculate_State_Tax()
    {
        var service = new StateTaxService();

        var result = service.Calculate(
            85000m,
            "CA",
            "single",
            2026
        );

        Assert.Equal(3812.98m, result);
    }

    [Fact]
    public void NewYork_Should_Calculate_State_Tax()
    {
        var service = new StateTaxService();

        var result = service.Calculate(
            85000m,
            "NY",
            "single",
            2026
        );

        Assert.Equal(4025.80m, result);
    }
    [Fact]
    public void Unsupported_State_Should_Throw_Exception()
    {
        // Arrange
        var service = new StateTaxService();

        // Act + Assert
        var exception = Assert.Throws<NotSupportedException>(() =>
            service.Calculate(
                85000m,
                "ZZ",
                "single",
                2026
            )
        );

        Assert.Contains(
            "not supported",
            exception.Message,
            StringComparison.OrdinalIgnoreCase
        );
    }
}