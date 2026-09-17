import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SalaryForm from "../components/SalaryForm";
import SalaryResult from "../components/SalaryResult";
import type { SalaryResult as SalaryResultType } from "../types/salary";
import { calculateSalary } from "../services/salaryApi";

function NewJerseySalaryPage() {
  const [result, setResult] = useState<SalaryResultType | null>(null);
  const [payFrequency, setPayFrequency] = useState("monthly");

  const [examples, setExamples] = useState<
    { salary: number; monthly: number }[]
  >([]);

  useEffect(() => {
    document.title =
      "New Jersey Salary Calculator 2026 – Take-Home Pay | PayWorth";

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href =
      "https://YOUR-DOMAIN.com/new-jersey-salary-calculator";

    const salaries = [50000, 75000, 100000, 150000];

    Promise.all(
      salaries.map((salary) =>
        calculateSalary({
          annualSalary: salary,
          state: "NJ",
          filingStatus: "single",
          taxYear: 2026,
        })
      )
    )
      .then((results) => {
        setExamples(
          results.map((result, index) => ({
            salary: salaries[index],
            monthly: result.netAnnual / 12,
          }))
        );
      })
      .catch(() => {
        setExamples([]);
      });
  }, []);

  return (
    <main className="state-page">
      <div className="state-page-container">

        <div className="state-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>New Jersey Salary Calculator</span>
        </div>

        <header className="state-page-header">
          <p className="state-eyebrow">2026 New Jersey Salary Calculator</p>

          <h1>New Jersey Salary Calculator 2026</h1>

          <p>
            Calculate your estimated New Jersey take-home pay after
            federal taxes, New Jersey income tax, Social Security, and
            Medicare.
          </p>
        </header>

        <section className="state-info-card">
          <h2>New Jersey Take-Home Pay Calculator</h2>

          <p>
            Enter your salary, filing status, and tax year to estimate
            how much you could take home after major federal and state
            payroll taxes.
          </p>

          <SalaryForm
            onResult={setResult}
            onInputChange={() => setResult(null)}
            onPayFrequencyChange={setPayFrequency}
            initialState="NJ"
            initialTaxYear={2026}
          />

          {result && (
            <SalaryResult
              result={result}
              payFrequency={payFrequency}
            />
          )}
        </section>

        <section className="state-content">
          <h2>How much do you take home in New Jersey?</h2>

          <p>
            Your gross salary is not the same as your take-home pay.
            Federal income tax, New Jersey income tax, Social Security,
            and Medicare can reduce the amount you receive from each
            paycheck.
          </p>

          <p>
            PayWorth estimates your New Jersey take-home pay using the
            salary, filing status, and tax year you enter.
          </p>

          <h2>New Jersey salary examples</h2>

          <div className="salary-example-grid">
            {examples.map((example) => (
              <div className="salary-example" key={example.salary}>
                <strong>
                  ${example.salary.toLocaleString()}
                </strong>

                <span>Estimated monthly take-home</span>

                <small>
                  $
                  {example.monthly.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </small>
              </div>
            ))}
          </div>

          <h2>New Jersey income tax</h2>

          <p>
            New Jersey uses a graduated individual income tax system.
            This means higher portions of taxable income can be taxed at
            higher rates. The state publishes rate schedules based on
            filing status.
          </p>

          <p>
            This calculator uses a simplified estimate for wage income.
            It does not attempt to model every New Jersey deduction,
            exemption, credit, or special tax situation.
          </p>

          <div className="tax-estimate-note">
            <strong>Important:</strong>
            <p>
              New Jersey residents may qualify for additional exemptions,
              deductions, or credits depending on their circumstances.
              Those items are not fully modeled in this calculator.
            </p>
          </div>

          <h2>New Jersey salary calculator FAQs</h2>

          <div className="faq-item">
            <h3>How much is $100,000 a year after taxes in New Jersey?</h3>
            <p>
              For a single filer using the assumptions in this calculator,
              a $100,000 salary produces an estimated monthly take-home
              amount of about $6,250. Your actual take-home pay can vary
              based on deductions, benefits, credits, and other payroll
              adjustments.
            </p>
          </div>

          <div className="faq-item">
            <h3>Does New Jersey have a state income tax?</h3>
            <p>
              Yes. New Jersey has a graduated individual income tax.
              The applicable rate depends on taxable income and filing
              status.
            </p>
          </div>

          <div className="faq-item">
            <h3>Is New Jersey income tax included in this calculator?</h3>
            <p>
              Yes. The calculator includes an estimated New Jersey
              income tax amount along with federal income tax, Social
              Security, and Medicare.
            </p>
          </div>

          <div className="faq-item">
            <h3>Does this calculator include New Jersey local income tax?</h3>
            <p>
              New Jersey does not use a general local wage-income tax
              system like some other states. This calculator focuses on
              federal and New Jersey state-level taxes.
            </p>
          </div>

          <div className="faq-item">
            <h3>Why is my actual paycheck different?</h3>
            <p>
              Your actual paycheck may include health insurance,
              retirement contributions, tax credits, other deductions,
              benefits, or payroll adjustments that are not included in
              this simplified estimate.
            </p>
          </div>

          <h2>Compare other salary calculators</h2>

          <div className="state-related-links">
            <Link to="/new-york-salary-calculator">
              New York Salary Calculator
            </Link>

            

            

            <Link to="/california-salary-calculator">
              California Salary Calculator
            </Link>

            <Link to="/texas-salary-calculator">
              Texas Salary Calculator
            </Link>
          </div>

          <div className="state-disclaimer">
            <strong>Tax estimate disclaimer</strong>

            <p>
              PayWorth provides estimates for informational purposes only.
              Actual tax liability and take-home pay can vary depending on
              your individual circumstances, deductions, credits,
              benefits, retirement contributions, local taxes, and other
              payroll factors.
            </p>

            <p>
              This calculator is not tax, legal, or financial advice.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default NewJerseySalaryPage;