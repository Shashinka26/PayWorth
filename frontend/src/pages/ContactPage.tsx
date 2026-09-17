import { useEffect } from "react";
import { Link } from "react-router-dom";

function ContactPage() {
  useEffect(() => {
    document.title = "Contact PayWorth | US Salary Calculator";

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = "https://YOUR-DOMAIN.com/contact";
  }, []);

  return (
    <main className="state-page">
      <div className="state-page-container">
        <nav className="state-breadcrumb">
          <Link to="/">PayWorth</Link>
          <span> / </span>
          <span>Contact</span>
        </nav>

        <header className="state-page-header">
          <h1>Contact PayWorth</h1>
          <p>
            Have a question, suggestion, or found an issue with a calculator?
            We would like to hear from you.
          </p>
        </header>

        <section className="state-content">
          <h2>Get in Touch</h2>

          <p>
            If you have questions about PayWorth, suggestions for improving the
            website, or notice an issue with a calculation, please contact us.
          </p>

          <div className="faq-item">
            <h3>Calculator feedback</h3>
            <p>
              If you believe a calculator result may be incorrect, please
              include the salary, state, filing status, and tax year you used.
              This helps us investigate the issue.
            </p>
          </div>

          <div className="faq-item">
            <h3>General questions</h3>
            <p>
              You can contact the PayWorth team regarding questions about the
              website, available calculators, or future features.
            </p>
          </div>

          <div className="faq-item">
            <h3>Suggestions</h3>
            <p>
              We welcome suggestions for new salary calculators, states,
              features, and educational content.
            </p>
          </div>

          <h2>Contact Information</h2>

          <p>
            Email:{" "}
            <a href="mailto:hello@YOUR-DOMAIN.com">
              hello@YOUR-DOMAIN.com
            </a>
          </p>

          <p>
            Please replace the placeholder email address with your official
            PayWorth contact email before launching the website.
          </p>

          <h2>Important Note</h2>

          <p>
            PayWorth provides salary and tax estimates for informational
            purposes. Contacting us about a calculation does not create a
            professional tax, accounting, legal, or financial advisory
            relationship.
          </p>

          <p>
            For individual tax advice, please consult a qualified tax
            professional.
          </p>

          <p>
            <strong>Last updated:</strong> September 2026
          </p>
        </section>
      </div>
    </main>
  );
}

export default ContactPage;