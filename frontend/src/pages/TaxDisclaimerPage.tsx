import { useEffect } from "react";
import { Link } from "react-router-dom";

function TaxDisclaimerPage() {
  useEffect(() => {
    document.title = "Tax Disclaimer | PayWorth";

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = "https://YOUR-DOMAIN.com/tax-disclaimer";
  }, []);

  return (
    <main className="state-page">
      <div className="state-page-container">
        <nav className="state-breadcrumb">
          <Link to="/">PayWorth</Link>
          <span> / </span>
          <span>Tax Disclaimer</span>
        </nav>

        <header className="state-page-header">
          <h1>Tax Disclaimer</h1>
          <p>
            Important information about PayWorth salary and take-home pay
            estimates.
          </p>
        </header>

        <section className="state-content">
          <h2>Informational Purpose Only</h2>

          <p>
            PayWorth provides salary, tax, and take-home pay calculations for
            general informational and educational purposes only.
          </p>

          <p>
            The estimates provided by PayWorth should not be considered tax,
            accounting, legal, or financial advice.
          </p>

          <h2>Estimated Calculations</h2>

          <p>
            PayWorth calculates estimated take-home pay using the salary,
            filing status, state, tax year, and other information entered by
            the user.
          </p>

          <p>
            The calculations may include estimated federal income tax, state
            income tax, Social Security, and Medicare taxes.
          </p>

          <p>
            Tax rules, thresholds, deductions, rates, and other government
            guidance can change. PayWorth may update its calculations when
            new official information becomes available.
          </p>

          <h2>Why Your Actual Paycheck May Be Different</h2>

          <p>
            Your actual paycheck may differ from a PayWorth estimate because of
            factors such as:
          </p>

          <ul>
            <li>Tax credits and additional deductions</li>
            <li>Itemized deductions</li>
            <li>Retirement contributions</li>
            <li>Health insurance premiums</li>
            <li>Flexible spending or other benefits</li>
            <li>Local and city taxes</li>
            <li>Employer payroll practices</li>
            <li>Additional withholding</li>
            <li>Other personal tax circumstances</li>
          </ul>

          <h2>State and Local Taxes</h2>

          <p>
            State and local tax rules vary significantly across the United
            States. Not every state or local tax may be included in every
            PayWorth calculation.
          </p>

          <p>
            For example, certain cities and local jurisdictions may impose
            additional income taxes that are separate from state income tax.
          </p>

          <h2>Tax Year Information</h2>

          <p>
            PayWorth supports specific tax years and uses the tax information
            available for those years. Some future-year calculations may rely
            on currently published guidance and may be updated when final
            official tax information is released.
          </p>

          <h2>Verify Important Tax Information</h2>

          <p>
            Before making tax, employment, financial, or other important
            decisions based on a PayWorth estimate, verify the applicable
            information with official government sources or a qualified tax
            professional.
          </p>

          <h2>No Guarantee of Accuracy</h2>

          <p>
            While PayWorth aims to provide useful and carefully researched
            estimates, we do not guarantee that every calculation will be
            complete, current, or suitable for your individual circumstances.
          </p>

          <h2>Professional Advice</h2>

          <p>
            If you need advice regarding your specific tax situation, consult
            a qualified tax professional, accountant, or financial advisor.
          </p>

          <p>
            <strong>Last updated:</strong> September 2026
          </p>
        </section>
      </div>
    </main>
  );
}

export default TaxDisclaimerPage;