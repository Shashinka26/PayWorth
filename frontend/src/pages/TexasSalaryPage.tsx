import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SalaryForm from "../components/SalaryForm";
import SalaryResult from "../components/SalaryResult";
import type { SalaryResult as SalaryResultType } from "../types/salary";
import { calculateSalary } from "../services/salaryApi";

function TexasSalaryPage() {
  const [result, setResult] = useState<SalaryResultType | null>(null);
  const [payFrequency, setPayFrequency] = useState("monthly");
  const [salaryExamples, setSalaryExamples] = useState<
    { salary: number; netAnnual: number; netMonthly: number }[]
  >([]);

  useEffect(() => {
    document.title =
      "Texas Salary Calculator 2026 – Take-Home Pay | PayWorth";

    const description =
      "Calculate your 2026 Texas take-home pay after federal taxes, Social Security, and Medicare. Texas has no individual state income tax.";

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
      "https://YOUR-DOMAIN.com/texas-salary-calculator";
  }, []);

  useEffect(() => {
    const loadSalaryExamples = async () => {
      const salaries = [50000, 75000, 100000, 150000];

      try {
        const results = await Promise.all(
          salaries.map((salary) =>
            calculateSalary({
              annualSalary: salary,
              state: "TX",
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
          <span>Texas Salary Calculator</span>
        </nav>

        <header className="state-page-header">
          <h1>Texas Salary Calculator 2026</h1>

          <p>
            Calculate your estimated Texas take-home pay after federal
            income tax, Social Security, and Medicare.
          </p>
        </header>

        <section className="state-info-card">
          <h2>Texas Take-Home Pay Calculator</h2>

          <p>
            Use PayWorth to estimate how much of your salary you may
            actually take home in Texas. Enter your annual salary,
            filing status, and pay frequency to estimate your after-tax
            income.
          </p>

          <SalaryForm
            onResult={setResult}
            onInputChange={() => setResult(null)}
            onPayFrequencyChange={setPayFrequency}
            initialState="TX"
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

          <h2>How is Texas take-home pay calculated?</h2>

          <p>
            Your Texas take-home pay starts with your gross salary.
            Estimated federal income tax, Social Security, and Medicare
            are then considered to estimate your net annual income.
          </p>

          <p>
            Texas does not have an individual state income tax on wages.
            This means your estimated take-home pay is primarily affected
            by federal income tax and federal payroll taxes such as Social
            Security and Medicare.
          </p>

          <p>
            Your actual paycheck can be different because employers may
            also withhold money for retirement plans, health insurance,
            other benefits, local taxes, and individual tax credits or
            deductions.
          </p>

          <h2>Does Texas have state income tax?</h2>

          <p>
            Texas does not impose an individual state income tax on wages.
            However, residents may still pay federal income tax, Social
            Security tax, and Medicare tax.
          </p>

          <h2>Texas salary examples</h2>

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

          <h2>Texas salary calculator FAQs</h2>

          <div className="faq-item">
            <h3>How much is $100,000 after tax in Texas?</h3>

            <p>
              The exact amount depends on your filing status, tax year,
              deductions, and other payroll factors. Use the PayWorth
              calculator above to estimate your Texas take-home pay.
            </p>
          </div>

          <div className="faq-item">
            <h3>Does Texas have state income tax?</h3>

            <p>
              No. Texas does not have an individual state income tax on
              wages. Federal income tax, Social Security, and Medicare
              taxes can still apply.
            </p>
          </div>

          <div className="faq-item">
            <h3>Is this Texas salary calculator exact?</h3>

            <p>
              No. PayWorth provides an estimate. Actual take-home pay
              can vary based on deductions, tax credits, retirement
              contributions, health insurance, benefits, and other
              payroll adjustments.
            </p>
          </div>

          <section className="state-content related-calculators">
            <h2>More Salary Calculators</h2>

            <p>
              Compare take-home pay across different states with
              PayWorth salary calculators.
            </p>

            <div className="related-links">
              <Link to="/">US Salary Calculator</Link>

              <Link to="/california-salary-calculator">
                California Salary Calculator
              </Link>

              <Link to="/new-york-salary-calculator">
                New York Salary Calculator
              </Link>

              <Link to="/texas-salary-calculator">
                Texas Salary Calculator
              </Link>
            </div>
          </section>

          <div className="state-disclaimer">
            <strong>Tax estimate:</strong>

            <p>
              PayWorth is for informational purposes only and is not tax
              or financial advice. Tax rules and published guidance can
              change, so estimates may be updated when new official tax
              information becomes available.
            </p>
          </div>

        </section>
      </div>
    </main>
  );
}

export default TexasSalaryPage;