using Microsoft.AspNetCore.Mvc;
using PayWorth.API.Models;
using PayWorth.API.Services;

namespace PayWorth.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SalaryController : ControllerBase
{
    private readonly ISalaryCalculationService _salaryCalculationService;

    public SalaryController(
        ISalaryCalculationService salaryCalculationService)
    {
        _salaryCalculationService = salaryCalculationService;
    }

    [HttpPost("calculate")]
    public ActionResult<SalaryResult> Calculate(
    [FromBody] SalaryRequest request)
    {
        if (request.AnnualSalary <= 0)
        {
            return BadRequest(
                "Annual salary must be greater than zero."
            );
        }

        if (request.TaxYear != 2025 && request.TaxYear != 2026)
        {
            return BadRequest("Only tax years 2025 and 2026 are supported.");
        }

        try
        {
            var result =
                _salaryCalculationService.Calculate(request);

            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (NotSupportedException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}