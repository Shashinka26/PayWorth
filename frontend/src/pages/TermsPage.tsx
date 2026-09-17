import { useEffect } from "react";
import { Link } from "react-router-dom";

function TermsPage() {
  useEffect(() => {
    document.title = "Terms of Use | PayWorth";

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = "https://YOUR-DOMAIN.com/terms";
  }, []);

  return (
    <main className="state-page">
      <div className="state-page-container">
        <nav className="state-breadcrumb">
          <Link to="/">PayWorth</Link>
          <span> / </span>
          <span>Terms of Use</span>
        </nav>

        <header className="state-page-header">
          <h1>Terms of Use</h1>
          <p>
            Please review these terms before using the PayWorth website and
            salary calculators.
          </p>
        </header>

        <section className="state-content">
          <h2>Acceptance of Terms</h2>

          <p>
            By accessing or using PayWorth, you agree to these Terms of Use.
            If you do not agree with these terms, please do not use the
            website.
          </p>

          <h2>About PayWorth</h2>

          <p>
            PayWorth provides online salary and take-home pay calculators for
            informational and educational purposes. The calculations are
            estimates based on the information entered by the user and the tax
            rules and assumptions implemented by the service.
          </p>

          <h2>Calculator Estimates</h2>

          <p>
            PayWorth does not guarantee that any calculation represents your
            actual paycheck, tax liability, refund, or financial situation.
          </p>

          <p>
            Actual take-home pay may differ because of deductions, tax credits,
            retirement contributions, health insurance, benefits, local taxes,
            employer payroll practices, and other circumstances.
          </p>

          <h2>Not Tax or Financial Advice</h2>

          <p>
            Information provided by PayWorth is not tax, accounting, legal, or
            financial advice. You should consult a qualified tax or financial
            professional for advice about your individual circumstances.
          </p>

          <h2>User Responsibilities</h2>

          <p>
            You are responsible for entering accurate information when using
            the calculator. PayWorth is not responsible for errors resulting
            from incorrect, incomplete, or outdated information entered by a
            user.
          </p>

          <h2>Acceptable Use</h2>

          <p>You agree not to:</p>

          <ul>
            <li>
              Use the website for unlawful or fraudulent purposes.
            </li>
            <li>
              Attempt to interfere with the operation or security of the
              website.
            </li>
            <li>
              Attempt to gain unauthorized access to systems or data.
            </li>
            <li>
              Use automated methods to abuse, overload, or disrupt the service.
            </li>
            <li>
              Copy or reproduce substantial parts of the website without
              permission.
            </li>
          </ul>

          <h2>Intellectual Property</h2>

          <p>
            Unless otherwise stated, PayWorth's website content, branding,
            design, text, and software are owned by or licensed to PayWorth.
          </p>

          <p>
            You may use the website for personal and informational purposes.
            Reproduction, redistribution, or commercial exploitation of
            substantial website content without permission is not allowed.
          </p>

          <h2>Third-Party Services and Links</h2>

          <p>
            PayWorth may use third-party services for hosting, analytics,
            advertising, security, or other functionality. The website may
            also contain links to external websites.
          </p>

          <p>
            PayWorth is not responsible for the availability, content,
            accuracy, privacy practices, or security of third-party services
            or websites.
          </p>

          <h2>Availability</h2>

          <p>
            We aim to keep PayWorth available and functioning properly, but we
            do not guarantee uninterrupted or error-free operation. Features
            may be changed, suspended, or removed when necessary.
          </p>

          <h2>Changes to These Terms</h2>

          <p>
            We may update these Terms of Use from time to time. Changes become
            effective when the updated terms are published on this page.
          </p>

          <h2>Limitation of Liability</h2>

          <p>
            To the extent permitted by applicable law, PayWorth is not
            responsible for losses or damages resulting from reliance on
            calculator estimates, website content, service interruptions, or
            information obtained through third-party services.
          </p>

          <h2>Contact</h2>

          <p>
            If you have questions about these Terms of Use, please contact
            PayWorth using the contact information provided on the website.
          </p>

          <p>
            <strong>Last updated:</strong> September 2026
          </p>
        </section>
      </div>
    </main>
  );
}

export default TermsPage;