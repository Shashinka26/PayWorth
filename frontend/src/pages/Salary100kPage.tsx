import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SalaryForm from "../components/SalaryForm";
import SalaryResult from "../components/SalaryResult";
import type { SalaryResult as SalaryResultType } from "../types/salary";
import { calculateSalary } from "../services/salaryApi";

type StateComparison = {
  state: string;
  code: string;
  monthly: number;
  annual: number;
};

const supportedStates = [
  { code: "CA", state: "California" },
  { code: "NY", state: "New York" },
  { code: "NJ", state: "New Jersey" },
  { code: "MA", state: "Massachusetts" },
  { code: "NC", state: "North Carolina" },
  { code: "TX", state: "Texas" },
];

function Salary100kPage() {
  const [result, setResult] = useState<SalaryResultType | null>(null);
  const [payFrequency, setPayFrequency] = useState("monthly");

  const [comparisons, setComparisons] = useState<StateComparison[]>([]);
  const [comparisonLoading, setComparisonLoading] = useState(true);

  useEffect(() => {
    document.title =
      "$100,000 Salary After Taxes 2026 – Take-Home Pay | PayWorth";

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = "https://YOUR-DOMAIN.com/salary/100000";

    Promise.all(
      supportedStates.map(({ code, state }) =>
        calculateSalary({
          annualSalary: 100000,
          state: code,
          filingStatus: "single",
          taxYear: 2026,
        }).then((result) => ({
          state,
          code,
          monthly: result.netAnnual / 12,
          annual: result.netAnnual,
        }))
      )
    )
      .then((results) => {
        setComparisons(results);
      })
      .catch(() => {
        setComparisons([]);
      })
      .finally(() => {
        setComparisonLoading(false);
      });
  }, []);

  return (
    <main className="state-page">
      <div className="state-page-container">
        <div className="state-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>$100,000 Salary After Taxes</span>
        </div>

        <header className="state-page-header">
          <p className="state-eyebrow">
            2026 $100,000 Salary Calculator
          </p>

          <h1>$100,000 Salary After Taxes in 2026</h1>

          <p>
            See how much a $100,000 salary could be worth after federal
            taxes, state income tax, Social Security, and Medicare.
          </p>
        </header>

        <section className="state-info-card">
          <h2>$100,000 Take-Home Pay Calculator</h2>

          <p>
            Enter your salary, state, filing status, and tax year to
            estimate your take-home pay. The calculator can also show
            your estimated pay by week, every two weeks, twice a month,
            or month.
          </p>

          <SalaryForm
                 onResult={setResult}
                onInputChange={() => setResult(null)}
                onPayFrequencyChange={setPayFrequency}
                 initialState="CA"
                 initialTaxYear={2026}
                initialSalary="100000"
/>
          {result && (
            <SalaryResult
              result={result}
              payFrequency={payFrequency}
            />
          )}
        </section>

        <section className="state-content">
          <h2>How much is $100,000 a year after taxes?</h2>

          <p>
            A $100,000 salary does not mean you receive $100,000 in
            take-home pay. Your paycheck can be reduced by federal
            income tax, state income tax, Social Security, and Medicare.
          </p>

          <p>
            The amount you actually take home depends on factors such as
            your state, filing status, tax year, deductions, credits,
            benefits, and other payroll adjustments.
          </p>

          <h2>$100,000 salary take-home pay by state</h2>

          <p>
            The table below shows estimated annual and monthly take-home
            pay for a single filer earning $100,000 in 2026. These
            figures use the states currently supported by PayWorth.
          </p>

          {comparisonLoading ? (
            <p>Loading salary comparisons...</p>
          ) : comparisons.length > 0 ? (
            <div className="salary-comparison-table-wrapper">
              <table className="salary-comparison-table">
                <thead>
                  <tr>
                    <th>State</th>
                    <th>Estimated annual take-home</th>
                    <th>Estimated monthly take-home</th>
                  </tr>
                </thead>

                <tbody>
                  {comparisons.map((comparison) => (
                    <tr key={comparison.code}>
                      <td>{comparison.state}</td>

                      <td>
                        $
                        {comparison.annual.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>

                      <td>
                        $
                        {comparison.monthly.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>
              Salary comparison data is temporarily unavailable. You
              can still use the calculator above to calculate your
              estimate.
            </p>
          )}

          <h2>What is the monthly take-home pay on a $100,000 salary?</h2>

          <p>
            Your monthly take-home pay depends heavily on where you
            live and your tax situation. For that reason, there is no
            single monthly take-home amount for everyone earning
            $100,000.
          </p>

          <p>
            For example, a single filer earning $100,000 can have a
            different take-home amount in California, New York, New
            Jersey, Massachusetts, North Carolina, or Texas because
            state tax rules differ.
          </p>

          <h2>$100,000 salary per month, biweekly, and weekly</h2>

          <p>
            A $100,000 annual salary is approximately:
          </p>

          <ul>
            <li>
              <strong>$8,333.33</strong> gross per month
            </li>

            <li>
              <strong>$3,846.15</strong> gross every two weeks
            </li>

            <li>
              <strong>$1,923.08</strong> gross per week
            </li>
          </ul>

          <p>
            These are gross amounts before taxes and other payroll
            deductions. Your actual take-home amount will be lower.
          </p>

          <h2>What taxes are taken from a $100,000 salary?</h2>

          <p>
            A typical wage-income estimate can include federal income
            tax, Social Security, Medicare, and state income tax where
            applicable.
          </p>

          <p>
            Social Security and Medicare are federal payroll taxes.
            State income tax varies depending on where you live, while
            some states do not impose an individual state income tax.
          </p>

          <h2>Does a $100,000 salary mean you are taxed at one rate?</h2>

          <p>
            Not necessarily. Federal income tax uses progressive tax
            brackets, meaning different portions of taxable income can
            be taxed at different rates.
          </p>

          <p>
            State tax systems can also differ. Some states use
            graduated rates, while others use a flat rate or no
            individual income tax.
          </p>

          <h2>$100,000 salary calculator FAQs</h2>

          <div className="faq-item">
            <h3>How much is $100,000 after taxes?</h3>

            <p>
              There is no single answer because take-home pay depends
              on your state, filing status, tax year, deductions,
              credits, benefits, and other payroll factors. Use the
              calculator above to estimate your take-home pay.
            </p>
          </div>

          <div className="faq-item">
            <h3>How much is $100,000 a year per month?</h3>

            <p>
              A $100,000 annual salary is $8,333.33 per month before
              taxes and other deductions. Your take-home pay will be
              lower.
            </p>
          </div>

          <div className="faq-item">
            <h3>How much is $100,000 every two weeks?</h3>

            <p>
              A $100,000 annual salary is approximately $3,846.15 gross
              every two weeks when divided across 26 pay periods.
              Your actual paycheck after taxes will be lower.
            </p>
          </div>

          <div className="faq-item">
            <h3>Is $100,000 a good salary?</h3>

            <p>
              Whether $100,000 provides a comfortable income depends on
              factors such as location, household size, housing costs,
              debt, benefits, and personal spending. PayWorth focuses
              on estimating take-home pay rather than evaluating whether
              a salary is sufficient.
            </p>
          </div>

          <div className="faq-item">
            <h3>Which taxes are included in this estimate?</h3>

            <p>
              The calculator currently estimates federal income tax,
              applicable state income tax, Social Security, and
              Medicare. It does not model every possible deduction,
              credit, benefit, retirement contribution, or local tax.
            </p>
          </div>

          <h2>Explore state salary calculators</h2>

          <div className="state-related-links">
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

          <div className="state-disclaimer">
            <strong>Tax estimate disclaimer</strong>

            <p>
              PayWorth provides estimates for informational purposes only.
              Actual tax liability and take-home pay can vary depending
              on your individual circumstances, deductions, credits,
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

export default Salary100kPage;