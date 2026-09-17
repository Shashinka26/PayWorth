import { useEffect } from "react";
import { Link } from "react-router-dom";

function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "Privacy Policy | PayWorth";

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = "https://YOUR-DOMAIN.com/privacy-policy";
  }, []);

  return (
    <main className="state-page">
      <div className="state-page-container">
        <nav className="state-breadcrumb">
          <Link to="/">PayWorth</Link>
          <span> / </span>
          <span>Privacy Policy</span>
        </nav>

        <header className="state-page-header">
          <h1>Privacy Policy</h1>
          <p>
            Learn how PayWorth handles information when you use our website
            and salary calculator.
          </p>
        </header>

        <section className="state-content">
          <h2>Introduction</h2>

          <p>
            PayWorth provides salary and take-home pay calculators designed to
            help users estimate their after-tax income. We respect your privacy
            and aim to be transparent about the information that may be
            collected when you use our website.
          </p>

          <p>
            This Privacy Policy explains what information may be collected,
            how it may be used, and the choices available to you.
          </p>

          <h2>Information We Collect</h2>

          <p>
            PayWorth does not require you to create an account to use the
            salary calculator.
          </p>

          <p>
            Salary information and tax-related selections entered into the
            calculator may be processed to generate your requested estimate.
            These inputs are not intended to identify you personally.
          </p>

          <p>
            We may also receive limited technical information automatically,
            such as browser type, device type, approximate location, pages
            visited, and basic usage information. This information may be
            collected through analytics or advertising services.
          </p>

          <h2>How We Use Information</h2>

          <p>Information may be used to:</p>

          <ul>
            <li>Provide and operate the PayWorth calculator.</li>
            <li>Improve website functionality and user experience.</li>
            <li>Understand how visitors use the website.</li>
            <li>Monitor website performance and security.</li>
            <li>Measure traffic and website engagement.</li>
            <li>Display relevant advertising where applicable.</li>
          </ul>

          <h2>Cookies and Similar Technologies</h2>

          <p>
            PayWorth may use cookies and similar technologies to remember
            preferences, understand website usage, improve functionality, and
            support advertising or analytics.
          </p>

          <p>
            You can manage or disable cookies through your browser settings.
            Some website features may not function properly if certain cookies
            are disabled.
          </p>

          <h2>Advertising</h2>

          <p>
            PayWorth may display advertisements from third-party advertising
            providers, including Google AdSense, if the website participates
            in advertising programs.
          </p>

          <p>
            These providers may use cookies or similar technologies to provide
            and measure advertisements. Their use of information is governed
            by their own privacy policies and terms.
          </p>

          <h2>Analytics</h2>

          <p>
            We may use analytics services to understand website traffic,
            visitor behavior, and overall website performance. Analytics data
            helps us improve PayWorth and identify technical or usability
            issues.
          </p>

          <h2>Third-Party Services</h2>

          <p>
            PayWorth may use third-party services for analytics, hosting,
            security, advertising, or other website functionality. These
            services may process information according to their own privacy
            policies.
          </p>

          <h2>Data Security</h2>

          <p>
            We take reasonable measures to protect information processed
            through the website. However, no internet transmission or online
            service can be guaranteed to be completely secure.
          </p>

          <h2>Children's Privacy</h2>

          <p>
            PayWorth is not intended to knowingly collect personal information
            from children. We do not intentionally request personal information
            from children through the salary calculator.
          </p>

          <h2>External Links</h2>

          <p>
            PayWorth may contain links to third-party websites. We are not
            responsible for the privacy practices, content, or security of
            external websites. We recommend reviewing their privacy policies
            before providing information.
          </p>

          <h2>Your Choices</h2>

          <p>
            Depending on your location, you may have rights concerning your
            personal information, including rights to access, correct, delete,
            or restrict certain uses of your information.
          </p>

          <p>
            You may also control cookies through your browser and manage
            certain advertising preferences through the relevant advertising
            provider.
          </p>

          <h2>Changes to This Privacy Policy</h2>

          <p>
            We may update this Privacy Policy from time to time as PayWorth
            develops or as legal, technical, or business requirements change.
            Updates will be reflected on this page.
          </p>

          <h2>Contact</h2>

          <p>
            If you have questions about this Privacy Policy or PayWorth's
            privacy practices, please contact us through the contact information
            provided on the website.
          </p>

          <p>
            <strong>Last updated:</strong> September 2026
          </p>
        </section>
      </div>
    </main>
  );
}

export default PrivacyPolicyPage;