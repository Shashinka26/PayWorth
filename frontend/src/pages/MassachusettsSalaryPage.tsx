import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SalaryForm from "../components/SalaryForm";
import SalaryResult from "../components/SalaryResult";
import type { SalaryResult as SalaryResultType } from "../types/salary";
import { calculateSalary } from "../services/salaryApi";

function MassachusettsSalaryPage() {
  const [result, setResult] = useState<SalaryResultType | null>(null);
  const [payFrequency, setPayFrequency] = useState("monthly");

  const [examples, setExamples] = useState<
    { salary: number; monthly: number }[]
  >([]);

  useEffect(() => {
    document.title =
      "Massachusetts Salary Calculator 2026 – Take-Home Pay | PayWorth";

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href =
      "https://YOUR-DOMAIN.com/massachusetts-salary-calculator";

    const salaries = [50000, 75000, 100000, 150000];

    Promise.all(
      salaries.map((salary) =>
        calculateSalary({
          annualSalary: salary,
          state: "MA",
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
          <span>Massachusetts Salary Calculator</span>
        </div>

        <header className="state-page-header">
          <p className="state-eyebrow">
            2026 Massachusetts Salary Calculator
          </p>

          <h1>Massachusetts Salary Calculator 2026</h1>

          <p>
            Calculate your estimated Massachusetts take-home pay after
            federal taxes, Massachusetts income tax, Social Security,
            and Medicare.
          </p>
        </header>

        <section className="state-info-card">
          <h2>Massachusetts Take-Home Pay Calculator</h2>

          <p>
            Enter your salary, filing status, and tax year to estimate
            how much you could take home after major federal and
            Massachusetts taxes.
          </p>

          <SalaryForm
            onResult={setResult}
            onInputChange={() => setResult(null)}
            onPayFrequencyChange={setPayFrequency}
            initialState="MA"
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
          <h2>How much do you take home in Massachusetts?</h2>

          <p>
            Your gross salary is not the same as your take-home pay.
            Federal income tax, Massachusetts income tax, Social
            Security, and Medicare can reduce the amount you receive
            from each paycheck.
          </p>

          <p>
            PayWorth estimates your Massachusetts take-home pay using
            the salary, filing status, and tax year you enter.
          </p>

          <h2>Massachusetts salary examples</h2>

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

          <h2>Massachusetts income tax</h2>

          <p>
            Massachusetts generally applies a 5% tax rate to regular
            wage and salary income. The state also provides personal
            exemptions that vary depending on filing status.
          </p>

          <p>
            This calculator uses a simplified estimate for wage income.
            It does not attempt to model every Massachusetts deduction,
            exemption, credit, or special tax situation.
          </p>

          <div className="tax-estimate-note">
            <strong>Important:</strong>

            <p>
              Your actual Massachusetts tax liability may be different
              depending on deductions, exemptions, credits, dependents,
              investment income, and other individual circumstances.
            </p>
          </div>

          <h2>Massachusetts salary calculator FAQs</h2>

          <div className="faq-item">
            <h3>
              How much is $100,000 a year after taxes in Massachusetts?
            </h3>

            <p>
              For a single filer using the assumptions in this
              calculator, a $100,000 salary produces an estimated
              monthly take-home amount based on federal tax,
              Massachusetts income tax, Social Security, and Medicare.
              Your actual paycheck can vary depending on deductions,
              benefits, credits, and other payroll adjustments.
            </p>
          </div>

          <div className="faq-item">
            <h3>Does Massachusetts have a state income tax?</h3>

            <p>
              Yes. Massachusetts imposes state income tax on taxable
              income. Regular wage and salary income is generally
              subject to a 5% rate under the assumptions used by this
              calculator.
            </p>
          </div>

          <div className="faq-item">
            <h3>Is Massachusetts income tax included?</h3>

            <p>
              Yes. The calculator includes an estimated Massachusetts
              income tax amount along with federal income tax, Social
              Security, and Medicare.
            </p>
          </div>

          <div className="faq-item">
            <h3>Does Massachusetts have a local income tax?</h3>

            <p>
              This calculator focuses on federal and Massachusetts
              state-level income taxes. It does not model separate
              local wage income taxes.
            </p>
          </div>

          <div className="faq-item">
            <h3>Why is my actual paycheck different?</h3>

            <p>
              Your actual paycheck may include health insurance,
              retirement contributions, tax credits, benefits, other
              deductions, or payroll adjustments that are not included
              in this simplified estimate.
            </p>
          </div>

          <h2>Compare other salary calculators</h2>

          <div className="state-related-links">
            <Link to="/new-york-salary-calculator">
              New York Salary Calculator
            </Link>

            <Link to="/new-jersey-salary-calculator">
              New Jersey Salary Calculator
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
              Actual tax liability and take-home pay can vary depending
              on your individual circumstances, deductions, credits,
              benefits, retirement contributions, local taxes, and
              other payroll factors.
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

export default MassachusettsSalaryPage;