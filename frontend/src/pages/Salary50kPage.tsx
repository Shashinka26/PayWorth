import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SalaryForm from "../components/SalaryForm";
import SalaryResult from "../components/SalaryResult";
import type { SalaryResult as SalaryResultType } from "../types/salary";

function Salary50kPage() {
  const [result, setResult] = useState<SalaryResultType | null>(null);
  const [payFrequency, setPayFrequency] = useState("monthly");

  useEffect(() => {
    document.title =
      "$50,000 Salary After Taxes in 2026 – Take-Home Pay | PayWorth";

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = "https://YOUR-DOMAIN.com/salary/50000";
  }, []);

  return (
    <main className="state-page">
      <div className="state-page-container">

        {/* Breadcrumb */}
        <div className="state-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>$50,000 Salary After Taxes</span>
        </div>

        {/* Header */}
        <header className="state-page-header">
          <p className="state-eyebrow">
            2026 $50,000 Salary Calculator
          </p>

          <h1>$50,000 Salary After Taxes in 2026</h1>

          <p>
            See how much a $50,000 salary could be worth after federal
            taxes, state income tax, Social Security, and Medicare.
          </p>
        </header>

        {/* Calculator */}
        <section className="state-info-card">
          <h2>$50,000 Take-Home Pay Calculator</h2>

          <p>
            Enter your state, filing status, and tax year to estimate
            your take-home pay from a $50,000 annual salary.
          </p>

          <SalaryForm
            onResult={setResult}
            onInputChange={() => setResult(null)}
            onPayFrequencyChange={setPayFrequency}
            initialState="CA"
            initialTaxYear={2026}
            initialSalary="50000"
          />

          {result && (
            <SalaryResult
              result={result}
              payFrequency={payFrequency}
            />
          )}
        </section>

        {/* Content */}
        <section className="state-content">

          <h2>How much is $50,000 a year after taxes?</h2>

          <p>
            A $50,000 annual salary is your gross income before taxes
            and other payroll deductions. Your actual take-home pay
            depends on where you live, your filing status, tax year,
            and other payroll factors.
          </p>

          <p>
            PayWorth estimates your take-home pay after major federal
            and state taxes, Social Security, and Medicare.
          </p>

          <h2>What is the monthly take-home pay on a $50,000 salary?</h2>

          <p>
            The monthly amount you receive from a $50,000 salary
            depends on your state and tax situation. There is no
            single take-home amount that applies to every worker.
          </p>

          <p>
            For example, someone earning $50,000 in Texas may have a
            different take-home amount from someone earning the same
            salary in California because state income tax rules differ.
          </p>

          <h2>$50,000 salary per month, biweekly, and weekly</h2>

          <p>
            Before taxes and other deductions, a $50,000 annual salary
            is approximately:
          </p>

          <ul>
            <li>
              <strong>$4,166.67</strong> gross per month
            </li>
            <li>
              <strong>$1,923.08</strong> gross every two weeks
            </li>
            <li>
              <strong>$961.54</strong> gross per week
            </li>
          </ul>

          <p>
            Your actual paycheck will generally be lower after
            federal income tax, state income tax where applicable,
            Social Security, Medicare, and other deductions.
          </p>

          <h2>How much is $50,000 after taxes in different states?</h2>

          <p>
            State income tax can make a difference in your take-home
            pay. Some states do not have an individual state income
            tax, while others tax wage income.
          </p>

          <p>
            Use the calculator above to select your state and see an
            estimate based on your filing status and tax year.
          </p>

          <h2>Is $50,000 a good salary?</h2>

          <p>
            Whether $50,000 is enough depends on factors such as your
            location, housing costs, household size, debt, benefits,
            and spending habits. A salary that works well in one area
            may provide a different standard of living in another.
          </p>

          <p>
            Looking at your estimated monthly take-home pay can help
            you understand how much of the $50,000 gross salary may be
            available for regular expenses.
          </p>

          <h2>Frequently asked questions about a $50,000 salary</h2>

          <div className="faq-item">
            <h3>How much is $50,000 a year per month?</h3>

            <p>
              Before taxes, a $50,000 annual salary is approximately
              $4,166.67 per month. Your actual monthly take-home pay
              will be lower after taxes and other payroll deductions.
            </p>
          </div>

          <div className="faq-item">
            <h3>How much is $50,000 a year per week?</h3>

            <p>
              Before taxes, $50,000 per year is approximately $961.54
              per week when divided across 52 weeks.
            </p>
          </div>

          <div className="faq-item">
            <h3>How much is $50,000 a year every two weeks?</h3>

            <p>
              Before taxes, a $50,000 annual salary is approximately
              $1,923.08 every two weeks when divided across 26
              biweekly pay periods.
            </p>
          </div>

          <div className="faq-item">
            <h3>How much tax do you pay on a $50,000 salary?</h3>

            <p>
              The amount of tax depends on your state, filing status,
              tax year, deductions, credits, and other circumstances.
              Use the PayWorth calculator above for an estimate.
            </p>
          </div>

          <div className="faq-item">
            <h3>Does PayWorth include Social Security and Medicare?</h3>

            <p>
              Yes. The calculator includes estimated Social Security
              and Medicare taxes along with federal and applicable
              state income taxes.
            </p>
          </div>

          {/* Related calculators */}
          <h2>Explore other salary calculators</h2>

          <div className="state-related-links">

            <Link to="/salary/100000">
              $100,000 Salary Calculator
            </Link>

            <Link to="/california-salary-calculator">
              California Salary Calculator
            </Link>

            <Link to="/new-york-salary-calculator">
              New York Salary Calculator
            </Link>

            <Link to="/new-jersey-salary-calculator">
              New Jersey Salary Calculator
            </Link>

            <Link to="/massachusetts-salary-calculator">
              Massachusetts Salary Calculator
            </Link>

            <Link to="/north-carolina-salary-calculator">
              North Carolina Salary Calculator
            </Link>

            <Link to="/texas-salary-calculator">
              Texas Salary Calculator
            </Link>

          </div>

          {/* Disclaimer */}
          <div className="state-disclaimer">
            <strong>Tax estimate disclaimer</strong>

            <p>
              PayWorth provides salary and tax estimates for
              informational purposes only. Actual take-home pay can
              vary depending on deductions, credits, benefits,
              retirement contributions, local taxes, and other
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

export default Salary50kPage;