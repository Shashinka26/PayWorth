import type { SalaryResult as SalaryResultType } from "../types/salary";

type SalaryResultProps = {
  result: SalaryResultType;
};

function SalaryResult({ result }: SalaryResultProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
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
  return (
    <section className="salary-result-card">
      <div className="result-main">
        <span className="result-label">Your take-home pay</span>

        <div className="result-monthly">
          {formatCurrency(result.netMonthly)}
        </div>

        <span className="result-period">per month</span>

        <div className="result-stats">
          <div>
            <span>Annual</span>
            <strong>{formatCurrency(result.netAnnual)}</strong>
          </div>

          <div>
            <span>Biweekly</span>
            <strong>{formatCurrency(result.netBiweekly)}</strong>
          </div>

          <div>
            <span>Weekly</span>
            <strong>{formatCurrency(result.netWeekly)}</strong>
          </div>
        </div>

        <div className="effective-tax">
            <div className="income-visual">
  <div className="income-visual-header">
    <span>Take-home vs taxes</span>

    <span>
      {takeHomePercentage.toFixed(1)}% / {taxPercentage.toFixed(1)}%
    </span>
  </div>

  <div className="income-bar">
    <div
      className="income-bar-net"
      style={{ width: `${takeHomePercentage}%` }}
    />

    <div
      className="income-bar-tax"
      style={{ width: `${taxPercentage}%` }}
    />
  </div>

  <div className="income-legend">
    <span>
      <i className="legend-dot net-dot" />
      Take-home
    </span>

    <span>
      <i className="legend-dot tax-dot" />
      Taxes
    </span>
  </div>
</div>
          Effective tax rate
          <strong>{result.effectiveTaxRate.toFixed(2)}%</strong>
        </div>
      </div>

      <div className="tax-breakdown">
        <h3>Tax breakdown</h3>

        <div className="tax-row">
          <span>Gross income</span>
          <strong>{formatCurrency(result.grossAnnual)}</strong>
        </div>

        <div className="tax-row">
          <span>Federal tax</span>
          <strong>{formatCurrency(result.federalTax)}</strong>
        </div>

        <div className="tax-row">
          <span>State tax</span>
          <strong>{formatCurrency(result.stateTax)}</strong>
        </div>

        <div className="tax-row">
          <span>Social Security</span>
          <strong>{formatCurrency(result.socialSecurity)}</strong>
        </div>

        <div className="tax-row">
          <span>Medicare</span>
          <strong>{formatCurrency(result.medicare)}</strong>
        </div>
      </div>
    </section>
  );
}

export default SalaryResult;