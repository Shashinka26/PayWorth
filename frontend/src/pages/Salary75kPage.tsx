
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SalaryForm from "../components/SalaryForm";
import SalaryResult from "../components/SalaryResult";
import type { SalaryResult as SalaryResultType } from "../types/salary";

function Salary75kPage() {
  const [result, setResult] = useState<SalaryResultType | null>(null);
  const [payFrequency, setPayFrequency] = useState("monthly");

  useEffect(() => {
    document.title =
      "$75,000 Salary After Taxes in 2026 – Take-Home Pay | PayWorth";

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = "https://YOUR-DOMAIN.com/salary/75000";
  }, []);

  return (
    <main className="state-page">
      <div className="state-page-container">

        {/* Breadcrumb */}
        <div className="state-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>$75,000 Salary After Taxes</span>
        </div>

        {/* Header */}
        <header className="state-page-header">
          <p className="state-eyebrow">
            2026 $75,000 Salary Calculator
          </p>

          <h1>$75,000 Salary After Taxes in 2026</h1>

          <p>
            See how much a $75,000 salary could be worth after federal
            taxes, state income tax, Social Security, and Medicare.
          </p>
        </header>

        {/* Calculator */}
        <section className="state-info-card">
          <h2>$75,000 Take-Home Pay Calculator</h2>

          <p>
            Enter your state, filing status, and tax year to estimate
            your take-home pay from a $75,000 annual salary.
          </p>

          <SalaryForm
            onResult={setResult}
            onInputChange={() => setResult(null)}
            onPayFrequencyChange={setPayFrequency}
            initialState="CA"
            initialTaxYear={2026}
            initialSalary="75000"
          />

          {result && (
            <SalaryResult
              result={result}
              payFrequency={payFrequency}
            />
          )}
        </section>

        {/* Main SEO Content */}
        <section className="state-content">

          <h2>How much is $75,000 a year after taxes?</h2>

          <p>
            A $75,000 annual salary is your gross income before taxes
            and other payroll deductions. Your actual take-home pay
            depends on your state, filing status, tax year, deductions,
            credits, benefits, and other payroll factors.
          </p>

          <p>
            PayWorth estimates your take-home pay after major federal
            and state income taxes, Social Security, and Medicare.
          </p>

          <h2>What is the monthly take-home pay on a $75,000 salary?</h2>

          <p>
            A $75,000 salary does not result in the same monthly
            take-home pay for everyone. Your net income can change
            depending on where you live and your tax situation.
          </p>

          <p>
            For example, a worker earning $75,000 in a state with no
            individual income tax may have a different estimated
            take-home amount than a worker earning the same salary
            in a state that taxes wage income.
          </p>

          <h2>$75,000 salary per month, biweekly, and weekly</h2>

          <p>
            Before taxes and other deductions, a $75,000 annual salary
            is approximately:
          </p>

          <ul>
            <li>
              <strong>$6,250.00</strong> gross per month
            </li>

            <li>
              <strong>$2,884.62</strong> gross every two weeks
            </li>

            <li>
              <strong>$1,442.31</strong> gross per week
            </li>
          </ul>

          <p>
            These amounts are gross pay. Your actual paycheck will
            generally be lower after applicable taxes and other
            payroll deductions.
          </p>

          <h2>How much tax do you pay on a $75,000 salary?</h2>

          <p>
            The amount of tax you pay on a $75,000 salary depends on
            your federal tax situation and the state where you live.
            Filing status and other circumstances can also affect
            your final tax liability.
          </p>

          <p>
            PayWorth includes estimated federal income tax, applicable
            state income tax, Social Security, and Medicare in its
            calculation.
          </p>

          <h2>Is $75,000 a good salary?</h2>

          <p>
            Whether $75,000 is enough for you depends on your location,
            housing costs, household size, debt, lifestyle, benefits,
            and other expenses.
          </p>

          <p>
            Instead of looking only at the gross salary, it can be
            useful to estimate your monthly take-home pay and compare
            that amount with your regular living expenses.
          </p>

          <h2>How much is $75,000 after taxes in different states?</h2>

          <p>
            State tax rules can have an impact on your take-home pay.
            Some states do not impose an individual state income tax,
            while others use flat or graduated income tax systems.
          </p>

          <p>
            Select your state in the calculator above to see an
            estimate based on your salary, filing status, and tax year.
          </p>

          <h2>Frequently asked questions about a $75,000 salary</h2>

          <div className="faq-item">
            <h3>How much is $75,000 a year per month?</h3>

            <p>
              Before taxes, a $75,000 annual salary is approximately
              $6,250 per month. Your actual monthly take-home pay will
              be lower after taxes and other deductions.
            </p>
          </div>

          <div className="faq-item">
            <h3>How much is $75,000 a year per week?</h3>

            <p>
              Before taxes, $75,000 per year is approximately
              $1,442.31 per week when divided across 52 weeks.
            </p>
          </div>

          <div className="faq-item">
            <h3>How much is $75,000 every two weeks?</h3>

            <p>
              Before taxes, a $75,000 annual salary is approximately
              $2,884.62 every two weeks when divided across 26
              biweekly pay periods.
            </p>
          </div>

          <div className="faq-item">
            <h3>How much is $75,000 after taxes in California?</h3>

            <p>
              Your California take-home pay depends on your filing
              status and other tax circumstances. Use the calculator
              above and select California to get an estimate.
            </p>
          </div>

          <div className="faq-item">
            <h3>How much is $75,000 after taxes in Texas?</h3>

            <p>
              Texas does not impose an individual state income tax on
              wages. However, federal income tax, Social Security,
              Medicare, and other payroll deductions can still reduce
              your take-home pay.
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

          {/* Related Pages */}
          <h2>Explore other salary calculators</h2>

          <div className="state-related-links">

            <Link to="/salary/50000">
              $50,000 Salary Calculator
            </Link>

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

export default Salary75kPage;