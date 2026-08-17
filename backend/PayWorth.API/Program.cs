using PayWorth.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add controller support
builder.Services.AddControllers();

// OpenAPI
builder.Services.AddOpenApi();

// Dependency Injection
builder.Services.AddScoped<
    ISalaryCalculationService,
    SalaryCalculationService>();

builder.Services.AddScoped<
    IStateTaxService,
    StateTaxService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Development eke HTTPS redirect warning eka avoid karanna
// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();