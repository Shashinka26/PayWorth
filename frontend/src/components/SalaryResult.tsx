import type { SalaryResult as SalaryResultType } from "../types/salary";

type SalaryResultProps = {
  result: SalaryResultType;
  payFrequency: string;
};

function SalaryResult({ result, payFrequency }: SalaryResultProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const totalTax =
    result.federalTax +
    result.stateTax +
    result.socialSecurity +
    result.medicare;

  const takeHomePercentage =
    result.grossAnnual > 0
      ? (result.netAnnual / result.grossAnnual) * 100
      : 0;

  const taxPercentage =
    result.grossAnnual > 0
      ? (totalTax / result.grossAnnual) * 100
      : 0;

  // Calculate take-home amount based on selected pay frequency
  const getPayAmount = () => {
    switch (payFrequency) {
      case "weekly":
        return result.netAnnual / 52;

      case "biweekly":
        return result.netAnnual / 26;

      case "semimonthly":
        return result.netAnnual / 24;

      case "monthly":
      default:
        return result.netAnnual / 12;
    }
  };

  const getPayLabel = () => {
    switch (payFrequency) {
      case "weekly":
        return "per week";

      case "biweekly":
        return "every 2 weeks";

      case "semimonthly":
        return "twice a month";

      case "monthly":
      default:
        return "per month";
    }
  };

  const selectedPayAmount = getPayAmount();

  return (
    <div className="result-card">
      <div className="result-top">
        <div className="result-label">YOUR TAKE-HOME PAY</div>

        <div className="result-main">
          {formatCurrency(selectedPayAmount)}
        </div>

        <div className="result-period">{getPayLabel()}</div>

        <div className="result-stats">
          <div className="result-stat">
            <span>Annual</span>
            <strong>{formatCurrency(result.netAnnual)}</strong>
          </div>

          <div className="result-stat">
            <span>Biweekly</span>
            <strong>{formatCurrency(result.netAnnual / 26)}</strong>
          </div>

          <div className="result-stat">
            <span>Weekly</span>
            <strong>{formatCurrency(result.netAnnual / 52)}</strong>
          </div>
        </div>

        <div className="result-divider" />

        <div className="tax-summary">
          <div className="tax-bar-section">
            <div className="tax-bar-label">
              <span>Take-home vs taxes</span>

              <span>
                {takeHomePercentage.toFixed(1)}% /{" "}
                {taxPercentage.toFixed(1)}%
              </span>
            </div>

            <div className="tax-bar">
              <div
                className="tax-bar-take-home"
                style={{ width: `${takeHomePercentage}%` }}
              />
              <div
                className="tax-bar-taxes"
                style={{ width: `${taxPercentage}%` }}
              />
            </div>

            <div className="tax-legend">
              <span>
                <i className="legend-dot take-home-dot" />
                Take-home
              </span>

              <span>
                <i className="legend-dot taxes-dot" />
                Taxes
              </span>
            </div>
          </div>

          <div className="effective-tax">
            <span>Effective tax rate</span>
            <strong>
              {((totalTax / result.grossAnnual) * 100).toFixed(2)}%
            </strong>
          </div>
        </div>
      </div>

      <div className="tax-breakdown">
        <h3>Tax breakdown</h3>

        <div className="breakdown-row">
          <span>Gross income</span>
          <strong>{formatCurrency(result.grossAnnual)}</strong>
        </div>

        <div className="breakdown-row">
          <span>Federal tax</span>
          <strong>{formatCurrency(result.federalTax)}</strong>
        </div>

        <div className="breakdown-row">
          <span>State tax</span>
          <strong>{formatCurrency(result.stateTax)}</strong>
        </div>

        <div className="breakdown-row">
          <span>Social Security</span>
          <strong>{formatCurrency(result.socialSecurity)}</strong>
        </div>

        <div className="breakdown-row">
          <span>Medicare</span>
          <strong>{formatCurrency(result.medicare)}</strong>
        </div>
      </div>
      <div className="calculation-info">
  <h3>How we calculate your estimate</h3>

  <ol>
    <li>Start with your gross annual income.</li>
    <li>Apply the federal standard deduction for your filing status.</li>
    <li>Calculate federal income tax using progressive tax brackets.</li>
    <li>Apply the applicable state income tax rules.</li>
    <li>Calculate Social Security and Medicare taxes.</li>
    <li>Subtract estimated taxes from your gross income.</li>
    <li>Divide your estimated net income by your selected pay frequency.</li>
  </ol>
</div>
      <div className="tax-disclaimer">
  <strong>Tax estimate</strong>

  <p>
    This calculator provides an estimate of your take-home pay based on
    the salary, state, filing status, and tax year you entered.
  </p>

  <p>
    Actual take-home pay may vary depending on tax credits, deductions,
    retirement contributions, health insurance, benefits, local taxes,
    and other payroll adjustments.
  </p>

  <p>
    PayWorth is for informational purposes only and is not tax or financial
    advice.
  </p>
</div>

    </div>
  );
}

export default SalaryResult;