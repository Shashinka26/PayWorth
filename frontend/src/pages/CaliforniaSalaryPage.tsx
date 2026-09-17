import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SalaryForm from "../components/SalaryForm";
import SalaryResult from "../components/SalaryResult";
import type { SalaryResult as SalaryResultType } from "../types/salary";
import { calculateSalary } from "../services/salaryApi";

function CaliforniaSalaryPage() {
  const [result, setResult] = useState<SalaryResultType | null>(null);
  const [payFrequency, setPayFrequency] = useState("monthly");
  const [salaryExamples, setSalaryExamples] = useState<
  { salary: number; netAnnual: number; netMonthly: number }[]
>([]);


  useEffect(() => {
    document.title =
      "California Salary Calculator 2026 — Take-Home Pay | PayWorth";

    const description =
      "Calculate your 2026 California take-home pay after federal taxes, California state income tax, Social Security, and Medicare.";

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
      "https://YOUR-DOMAIN.com/california-salary-calculator";
  }, []);

useEffect(() => {
  const loadSalaryExamples = async () => {
    const salaries = [50000, 75000, 100000, 150000];

    try {
      const results = await Promise.all(
        salaries.map((salary) =>
          calculateSalary({
            annualSalary: salary,
            state: "CA",
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
          <span>California Salary Calculator</span>
        </nav>

        <header className="state-page-header">
          <h1>California Salary Calculator 2026</h1>

          <p>
            Calculate your estimated California take-home pay after
            federal income tax, California state income tax, Social
            Security, and Medicare.
          </p>
        </header>

        <section className="state-info-card">
  <h2>California Take-Home Pay Calculator</h2>

  <p>
    Estimate your California take-home pay after federal income tax,
    California state income tax, Social Security, and Medicare.
  </p>

  <SalaryForm
    onResult={setResult}
    onInputChange={() => setResult(null)}
    onPayFrequencyChange={setPayFrequency}
    initialState="CA"
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
          <h2>How is California take-home pay calculated?</h2>

          <p>
            Your California take-home pay starts with your gross salary.
            Estimated federal income tax, California income tax, Social
            Security, and Medicare are then considered to estimate your
            net annual income.
          </p>

          <p>
            Your actual paycheck can be different because employers may
            also withhold money for retirement plans, health insurance,
            other benefits, local taxes, and individual tax credits or
            deductions.
          </p>

          <h2>California income tax</h2>

          <p>
            California uses a progressive individual income tax system.
            This means different portions of taxable income can be taxed
            at different rates. Your filing status and taxable income
            affect the amount of California income tax you may owe.
          </p>

          <h2>California salary examples</h2>

          <div className="salary-example-grid">
  {salaryExamples.map((example) => (
    <div className="salary-example" key={example.salary}>
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
          <h2>California salary calculator FAQs</h2>

          <div className="faq-item">
            <h3>How much is $100,000 after tax in California?</h3>
            <p>
              The exact amount depends on your filing status, tax year,
              deductions, and other payroll factors. Use the PayWorth
              calculator above to estimate your take-home pay.
            </p>
          </div>

          <div className="faq-item">
            <h3>Does California have state income tax?</h3>
            <p>
              Yes. California has a state individual income tax, and the
              amount depends on taxable income and filing status.
            </p>
          </div>

          <div className="faq-item">
            <h3>Is this California salary calculator exact?</h3>
            <p>
              No. PayWorth provides an estimate. Actual take-home pay can
              vary based on deductions, tax credits, retirement
              contributions, health insurance, benefits, and other
              payroll adjustments.
            </p>
          </div>
          <section className="state-content related-calculators">
  <h2>More Salary Calculators</h2>

  <p>
    Compare take-home pay across different states with PayWorth salary
    calculators.
  </p>

  <div className="related-links">
    <Link to="/">US Salary Calculator</Link>

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
              or financial advice. California tax rules and published
              guidance can change, so estimates may be updated when new
              official tax information becomes available.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CaliforniaSalaryPage;