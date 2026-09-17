import { useEffect } from "react";
import { Link } from "react-router-dom";

function AboutPage() {
  useEffect(() => {
    document.title = "About PayWorth | US Salary Calculator";

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = "https://YOUR-DOMAIN.com/about";
  }, []);

  return (
    <main className="state-page">
      <div className="state-page-container">
        <nav className="state-breadcrumb">
          <Link to="/">PayWorth</Link>
          <span> / </span>
          <span>About</span>
        </nav>

        <header className="state-page-header">
          <h1>About PayWorth</h1>
          <p>
            Simple tools to help you understand what your salary is really
            worth.
          </p>
        </header>

        <section className="state-content">
          <h2>What is PayWorth?</h2>

          <p>
            PayWorth is an online salary and take-home pay calculator designed
            to help people estimate how much of their income they may keep
            after taxes.
          </p>

          <p>
            Our goal is to make salary and paycheck calculations easier to
            understand without requiring users to work through complicated tax
            calculations themselves.
          </p>

          <h2>What Can You Calculate?</h2>

          <p>
            PayWorth allows you to estimate take-home pay based on factors such
            as:
          </p>

          <ul>
            <li>Annual salary</li>
            <li>Hourly pay</li>
            <li>Hours worked per week</li>
            <li>State</li>
            <li>Filing status</li>
            <li>Tax year</li>
            <li>Pay frequency</li>
          </ul>

          <h2>Our Approach</h2>

          <p>
            PayWorth uses published tax information and payroll tax rules to
            create estimated calculations. We aim to keep our calculations
            transparent and update them when relevant tax information changes.
          </p>

          <p>
            Because individual tax situations can vary, PayWorth results are
            estimates rather than guaranteed paycheck amounts.
          </p>

          <h2>Built for Simplicity</h2>

          <p>
            Salary calculations can become confusing when federal taxes, state
            taxes, Social Security, Medicare, deductions, and pay schedules
            are considered together.
          </p>

          <p>
            PayWorth brings these factors together in a simple interface so
            users can quickly understand their estimated annual and periodic
            take-home pay.
          </p>

          <h2>Our Mission</h2>

          <p>
            Our mission is to build practical financial tools that make
            everyday money decisions easier to understand.
          </p>

          <p>
            We plan to continue improving PayWorth by expanding state
            coverage, improving calculation accuracy, and publishing useful
            salary and tax guides.
          </p>

          <h2>Important Disclaimer</h2>

          <p>
            PayWorth provides estimates for informational purposes only. The
            results should not be considered tax, accounting, legal, or
            financial advice.
          </p>

          <p>
            For important tax decisions, consult official government resources
            or a qualified tax professional.
          </p>

          <p>
            <strong>Last updated:</strong> September 2026
          </p>
        </section>
      </div>
    </main>
  );
}

export default AboutPage;