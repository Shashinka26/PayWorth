import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SalaryForm from "../components/SalaryForm";
import SalaryResult from "../components/SalaryResult";
import type { SalaryResult as SalaryResultType } from "../types/salary";

function Salary150kPage() {
  const [result, setResult] = useState<SalaryResultType | null>(null);
  const [payFrequency, setPayFrequency] = useState("monthly");

  useEffect(() => {
    document.title =
      "$150,000 Salary After Taxes in 2026 – Take-Home Pay | PayWorth";

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = "https://YOUR-DOMAIN.com/salary/150000";
  }, []);

  return (
    <main className="state-page">
      <div className="state-page-container">
        {/* Breadcrumb */}
        <div className="state-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>$150,000 Salary After Taxes</span>
        </div>

        {/* Header */}
        <header className="state-page-header">
          <p className="state-eyebrow">
            2026 $150,000 Salary Calculator
          </p>

          <h1>$150,000 Salary After Taxes in 2026</h1>

          <p>
            Estimate how much a $150,000 salary could be worth after
            federal taxes, state income tax, Social Security, and
            Medicare.
          </p>
        </header>

        {/* Calculator */}
        <section className="state-info-card">
          <h2>$150,000 Take-Home Pay Calculator</h2>

          <p>
            Enter your state, filing status, and tax year to estimate
            your take-home pay from a $150,000 annual salary.
          </p>

          <SalaryForm
            onResult={setResult}
            onInputChange={() => setResult(null)}
            onPayFrequencyChange={setPayFrequency}
            initialState="CA"
            initialTaxYear={2026}
            initialSalary="150000"
          />

          {result && (
            <SalaryResult
              result={result}
              payFrequency={payFrequency}
            />
          )}
        </section>

        {/* Main Content */}
        <section className="state-content">
          <h2>How much is $150,000 a year after taxes?</h2>

          <p>
            A $150,000 annual salary is your gross income before taxes
            and other payroll deductions. Your actual take-home pay
            depends on your state, filing status, tax year, deductions,
            credits, benefits, and other payroll factors.
          </p>

          <p>
            PayWorth estimates take-home pay using major federal and
            state income taxes, Social Security, and Medicare.
          </p>

          <h2>What is the monthly take-home pay on a $150,000 salary?</h2>

          <p>
            A $150,000 salary does not produce the same monthly
            take-home pay for every worker. State tax rules and filing
            circumstances can significantly affect your estimated net
            income.
          </p>

          <p>
            Use the calculator above to select your state and filing
            status and see an estimate for your situation.
          </p>

          <h2>$150,000 salary per month, biweekly, and weekly</h2>

          <p>
            Before taxes and other payroll deductions, a $150,000
            annual salary is approximately:
          </p>

          <ul>
            <li>
              <strong>$12,500.00</strong> gross per month
            </li>

            <li>
              <strong>$5,769.23</strong> gross every two weeks
            </li>

            <li>
              <strong>$2,884.62</strong> gross per week
            </li>
          </ul>

          <p>
            These are gross amounts before taxes and other deductions.
            Your actual take-home paycheck will be lower.
          </p>

          <h2>How much tax do you pay on a $150,000 salary?</h2>

          <p>
            The amount of tax paid on a $150,000 salary depends on
            federal tax brackets, your filing status, your state, and
            other tax circumstances.
          </p>

          <p>
            A salary of $150,000 can also result in different state tax
            amounts depending on where you live. Some states have no
            individual income tax, while others use flat or graduated
            rates.
          </p>

          <h2>What taxes are included in this estimate?</h2>

          <p>
            PayWorth currently estimates federal income tax, applicable
            state income tax, Social Security, and Medicare for wage
            income.
          </p>

          <p>
            The estimate does not include every possible deduction,
            credit, retirement contribution, health insurance
            deduction, benefit, or local tax.
          </p>

          <h2>Is $150,000 a good salary?</h2>

          <p>
            Whether $150,000 is enough depends on your location,
            household size, housing costs, debt, lifestyle, benefits,
            and other expenses.
          </p>

          <p>
            Comparing your estimated monthly take-home pay with your
            regular expenses can give you a clearer picture of your
            available income than looking at gross salary alone.
          </p>

          <h2>$150,000 salary in different states</h2>

          <p>
            Your take-home pay can vary between states because state
            income tax rules are different. For example, a $150,000
            salary may produce a different estimated net income in
            California than in Texas.
          </p>

          <p>
            Select a state above to calculate your estimated take-home
            pay for that location.
          </p>

          <h2>Frequently asked questions about a $150,000 salary</h2>

          <div className="faq-item">
            <h3>How much is $150,000 a year per month?</h3>

            <p>
              Before taxes, a $150,000 annual salary is $12,500 per
              month. Your actual take-home amount will be lower after
              taxes and other payroll deductions.
            </p>
          </div>

          <div className="faq-item">
            <h3>How much is $150,000 a year per week?</h3>

            <p>
              Before taxes, $150,000 per year is approximately
              $2,884.62 per week when divided across 52 weeks.
            </p>
          </div>

          <div className="faq-item">
            <h3>How much is $150,000 every two weeks?</h3>

            <p>
              Before taxes, a $150,000 annual salary is approximately
              $5,769.23 every two weeks when divided across 26
              biweekly pay periods.
            </p>
          </div>

          <div className="faq-item">
            <h3>How much is $150,000 after taxes in California?</h3>

            <p>
              Your California take-home pay depends on filing status
              and other tax circumstances. Select California in the
              calculator above to estimate your take-home pay.
            </p>
          </div>

          <div className="faq-item">
            <h3>How much is $150,000 after taxes in Texas?</h3>

            <p>
              Texas does not impose an individual state income tax on
              wages. Federal income tax, Social Security, Medicare, and
              other payroll deductions can still reduce your
              take-home pay.
            </p>
          </div>

          <div className="faq-item">
            <h3>Does a $150,000 salary have Social Security and Medicare taxes?</h3>

            <p>
              Yes. Wage income can be subject to Social Security and
              Medicare payroll taxes. PayWorth includes these taxes in
              its estimate.
            </p>
          </div>

          <div className="faq-item">
            <h3>Why is my actual paycheck different?</h3>

            <p>
              Your actual paycheck can differ because of health
              insurance, retirement contributions, tax credits,
              benefits, additional deductions, and other payroll
              adjustments that are not fully modeled by this
              calculator.
            </p>
          </div>

          {/* Related Calculators */}
          <h2>Explore other salary calculators</h2>

          <div className="state-related-links">
            <Link to="/salary/50000">
              $50,000 Salary Calculator
            </Link>

            <Link to="/salary/75000">
              $75,000 Salary Calculator
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
              retirement contributions, local taxes, and other payroll
              factors.
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

export default Salary150kPage;