# PayWorth 💰

A full-stack salary and tax calculation application built with ASP.NET Core Web API and a modern web frontend.

## 🚀 Overview

PayWorth is a full-stack application designed to calculate employee salaries based on different salary calculation requirements.

The application provides a RESTful backend API with a separate frontend and uses a service-based architecture to keep calculation logic separate from API controllers.

The application currently supports salary calculations based on:

- Annual salary
- State
- Filing status
- Tax year
- Hourly salary calculation

## ✨ Features

- 💰 Salary calculation
- ⏱️ Hourly salary calculation
- 🧮 Salary and tax calculation logic
- 🇺🇸 State-based calculation
- 📋 Filing-status based calculation
- 📅 Tax-year support
- 🔌 RESTful API
- 🌐 Frontend integration
- 🧪 Unit testing
- 💉 Dependency Injection
- 🏗️ Controller-Service architecture

## 🏗️ Architecture

```text
┌─────────────────────┐
│      Frontend       │
│   React / TypeScript│
└──────────┬──────────┘
           │ HTTP
           ▼
┌─────────────────────┐
│   SalaryController  │
│   ASP.NET Core API   │
└──────────┬──────────┘
           │
           │ Dependency Injection
           ▼
┌─────────────────────────────┐
│ ISalaryCalculationService   │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│ Salary Calculation Logic    │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────┐
│    SalaryResult     │
└─────────────────────┘



🛠️ Technology Stack
Backend
C#
.NET 9
ASP.NET Core Web API
OpenAPI
Dependency Injection
Frontend
React
TypeScript
CSS
HTML
Testing
xUnit
Microsoft.NET.Test.Sdk
Coverlet
Development Tools
Git
GitHub
Visual Studio
VS Code
📁 Project Structure
PayWorth/
│
├── backend/
│   │
│   ├── PayWorth.API/
│   │   ├── Controllers/
│   │   │   └── SalaryController.cs
│   │   │
│   │   ├── Models/
│   │   │   ├── SalaryRequest.cs
│   │   │   └── SalaryResult.cs
│   │   │
│   │   ├── Services/
│   │   │
│   │   ├── Properties/
│   │   │
│   │   ├── Program.cs
│   │   ├── appsettings.json
│   │   └── PayWorth.API.csproj
│   │
│   └── PayWorth.Tests/
│       ├── SalaryCalculationServiceTests.cs
│       ├── StateTaxServiceTests.cs
│       └── PayWorth.Tests.csproj
│
├── frontend/
│
├── .gitignore
└── README.md
🔌 API
Calculate Salary

Endpoint

POST /api/Salary/calculate
Request Body
{
  "annualSalary": 75000,
  "state": "CA",
  "filingStatus": "single",
  "taxYear": 2026
}
Request Fields
Field	Type	Description
annualSalary	decimal	Annual salary amount
state	string	State used for calculation
filingStatus	string	Tax filing status
taxYear	integer	Tax year used for calculation
🧪 Testing

PayWorth includes a dedicated test project using xUnit.

Current test classes include:

SalaryCalculationServiceTests
StateTaxServiceTests

Run the tests using:

dotnet test
⚙️ Getting Started
Prerequisites

Make sure you have the following installed:

.NET 9 SDK
Node.js
npm
Git
1. Clone the Repository
git clone https://github.com/Shashinka26/PayWorth.git
cd PayWorth
2. Run the Backend
cd backend/PayWorth.API
dotnet restore
dotnet run
3. Run Tests
dotnet test
4. Run the Frontend

Open a new terminal and navigate to the frontend:

cd frontend
npm install
npm run dev
📌 Project Status

🚧 Active Development

The project is continuously being improved with additional salary calculation functionality and frontend improvements.

👨‍💻 Author

Chamidu Shashinka Rathnasiri

Software Developer | .NET | React | PostgreSQL | Microservices

💼 Software Developer at Cipherlabz

🎓 BSc (Hons) in Information Technology — Horizon Campus

Expected Graduation: 14 March 2027

🔗 Connect With Me
LinkedIn: https://www.linkedin.com/in/chamidu-shashinka-947709361
GitHub: https://github.com/Shashinka26
