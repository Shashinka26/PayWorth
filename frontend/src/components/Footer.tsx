import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="footer-brand">
          <h2>PayWorth</h2>

          <p>
            Simple tools to help you understand what your salary is really
            worth.
          </p>
        </div>

        <div className="footer-links">
         <div>
  <h3>Calculators</h3>

  <Link to="/">US Salary Calculator</Link>

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

          <div>
            <h3>Company</h3>

            <Link to="/about">About</Link>

            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <h3>Legal</h3>

            <Link to="/privacy-policy">Privacy Policy</Link>

            <Link to="/terms">Terms of Use</Link>

            <Link to="/tax-disclaimer">Tax Disclaimer</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} PayWorth. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;