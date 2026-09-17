import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SalaryForm from "../components/SalaryForm";
import SalaryResult from "../components/SalaryResult";
import type { SalaryResult as SalaryResultType } from "../types/salary";
import { calculateSalary } from "../services/salaryApi";

function NewYorkSalaryPage() {
  const [result, setResult] = useState<SalaryResultType | null>(null);

  const [payFrequency, setPayFrequency] = useState("monthly");

  const [salaryExamples, setSalaryExamples] = useState<
    { salary: number; netAnnual: number; netMonthly: number }[]
  >([]);

  useEffect(() => {
    document.title =
      "New York Salary Calculator 2026 – Take-Home Pay | PayWorth";

    const description =
      "Calculate your 2026 New York take-home pay after federal taxes, New York state income tax, Social Security, and Medicare.";

    let meta = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content = description;

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href =
      "https://YOUR-DOMAIN.com/new-york-salary-calculator";
  }, []);

  useEffect(() => {
    const loadSalaryExamples = async () => {
      const salaries = [50000, 75000, 100000, 150000];

      try {
        const results = await Promise.all(
          salaries.map((salary) =>
            calculateSalary({
              annualSalary: salary,
              state: "NY",
              filingStatus: "single",
              taxYear: 2026,
            })
          )
        );

        setSalaryExamples(
          results.map((result, index) => ({
            salary: salaries[index],
            netAnnual: result.netAnnual,
            netMonthly: result.netAnnual / 12,
          }))
        );
      } catch {
        setSalaryExamples([]);
      }
    };

    loadSalaryExamples();
  }, []);

  return (
    <main className="state-page">
      <div className="state-page-container">

        <nav className="state-breadcrumb">
          <Link to="/">PayWorth</Link>
          <span> / </span>
          <span>New York Salary Calculator</span>
        </nav>

        <header className="state-page-header">
          <h1>New York Salary Calculator 2026</h1>

          <p>
            Calculate your estimated New York take-home pay after federal
            income tax, New York state income tax, Social Security, and
            Medicare.
          </p>
        </header>

        <section className="state-info-card">
          <h2>New York Take-Home Pay Calculator</h2>

          <p>
            Use PayWorth to estimate how much of your salary you may actually
            take home in New York. Enter your annual salary, filing status,
            and pay frequency to estimate your after-tax income.
          </p>

          <SalaryForm
            onResult={setResult}
            onInputChange={() => setResult(null)}
            onPayFrequencyChange={setPayFrequency}
            initialState="NY"
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

          <h2>How is New York take-home pay calculated?</h2>

          <p>
            Your New York take-home pay starts with your gross salary.
            Estimated federal income tax, New York state income tax, Social
            Security, and Medicare are then considered to estimate your net
            annual income.
          </p>

          <p>
            Your actual paycheck can be different because employers may also
            withhold money for retirement plans, health insurance, other
            benefits, local taxes, and individual tax credits or deductions.
          </p>

          <h2>New York income tax</h2>

          <p>
            New York uses a progressive individual income tax system. This
            means different portions of taxable income can be taxed at
            different rates. Your filing status and taxable income affect the
            amount of New York income tax you may owe.
          </p>

          <h2>New York salary examples</h2>

          <div className="salary-example-grid">
            {salaryExamples.map((example) => (
              <div
                className="salary-example"
                key={example.salary}
              >
                <strong>
                  ${example.salary.toLocaleString("en-US")} salary
                </strong>

                <span>
                  Estimated take-home:{" "}
                  {example.netMonthly.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })}
                  /month
                </span>

                <small>
                  {example.netAnnual.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })}{" "}
                  annually
                </small>
              </div>
            ))}
          </div>

          <h2>New York salary calculator FAQs</h2>

          <div className="faq-item">
            <h3>How much is $100,000 after tax in New York?</h3>

            <p>
              The exact amount depends on your filing status, tax year,
              deductions, and other payroll factors. Use the PayWorth
              calculator above to estimate your New York take-home pay.
            </p>
          </div>

          <div className="faq-item">
            <h3>Does New York have state income tax?</h3>

            <p>
              Yes. New York has a progressive state individual income tax,
              and the amount depends on taxable income and filing status.
            </p>
          </div>

          <div className="faq-item">
            <h3>Is this New York salary calculator exact?</h3>

            <p>
              No. PayWorth provides an estimate. Actual take-home pay can
              vary based on deductions, tax credits, retirement contributions,
              health insurance, benefits, local taxes, and other payroll
              adjustments.
            </p>
          </div>

          <div className="tax-estimate-note">
            <strong>New York City note:</strong>

            <p>
              This calculator estimates New York State income tax. New York
              City residents may also owe NYC local income tax, which is not
              included in this estimate.
            </p>
          </div>

          <section className="state-content related-calculators">
            <h2>More Salary Calculators</h2>

            <p>
              Compare take-home pay across different states with PayWorth
              salary calculators.
            </p>

            <div className="related-links">
              <Link to="/">
                US Salary Calculator
              </Link>

              <Link to="/california-salary-calculator">
                California Salary Calculator
              </Link>
            </div>
          </section>

          <div className="state-disclaimer">
            <strong>Tax estimate:</strong>

            <p>
              PayWorth is for informational purposes only and is not tax or
              financial advice. New York tax rules and published guidance can
              change, so estimates may be updated when new official tax
              information becomes available.
            </p>
          </div>

        </section>
      </div>
    </main>
  );
}

export default NewYorkSalaryPage;