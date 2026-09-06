import { useState, type FormEvent } from "react";
import type { SalaryRequest, SalaryResult } from "../types/salary";
import { calculateSalary } from "../services/salaryApi";

type SalaryFormProps = {
  onResult: (result: SalaryResult) => void;
  onInputChange: () => void;
};

function SalaryForm({ onResult, onInputChange }: SalaryFormProps) {
  const [annualSalary, setAnnualSalary] = useState("85000");
  const [state, setState] = useState("CA");
  const [filingStatus, setFilingStatus] = useState("single");
  const [taxYear, setTaxYear] = useState(2026);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    // Validate salary
    const salary = Number(annualSalary);

    if (!annualSalary.trim()) {
      setError("Please enter your annual salary.");
      return;
    }

    if (!Number.isFinite(salary)) {
      setError("Please enter a valid salary.");
      return;
    }

    if (salary <= 0) {
      setError("Salary must be greater than $0.");
      return;
    }

    if (salary > 100000000) {
      setError("Please enter a reasonable salary amount.");
      return;
    }

    const request: SalaryRequest = {
      annualSalary: salary,
      state,
      filingStatus,
      taxYear,
    };

    try {
      setLoading(true);

      const result = await calculateSalary(request);

await new Promise((resolve) => setTimeout(resolve, 1000));

onResult(result);
    } catch (err) {
      console.error("Salary calculation failed:", err);
      setError("Unable to calculate salary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSalaryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnnualSalary(event.target.value);
    setError("");
    onInputChange();
  };

  const handleStateChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setState(event.target.value);
    setError("");
    onInputChange();
  };

  const handleFilingStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilingStatus(event.target.value);
    setError("");
    onInputChange();
  };

  const handleTaxYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTaxYear(Number(event.target.value));
    setError("");
    onInputChange();
  };

  return (
    <form className="salary-form" onSubmit={handleSubmit}>
      <div className="calculator-badge">
        2026 US Salary Calculator
      </div>

      <h2>Calculate your take-home pay</h2>

      <p className="calculator-description">
        Enter your salary and tax details to see your estimated income
        after taxes.
      </p>

      {/* Annual Salary */}
      <div className="form-group">
        <label htmlFor="annualSalary">Annual salary</label>

        <div className="salary-input-wrapper">
          <span>$</span>

          <input
  id="annualSalary"
  type="number"
  value={annualSalary}
  onChange={handleSalaryChange}
  step="1"
  placeholder="85000"
  disabled={loading}
/>
        </div>
      </div>

      {/* State + Tax Year */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="state">State</label>

          <select
            id="state"
            value={state}
            onChange={handleStateChange}
            disabled={loading}
          >
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="taxYear">Tax year</label>

          <select
            id="taxYear"
            value={taxYear}
            onChange={handleTaxYearChange}
            disabled={loading}
          >
            <option value={2026}>2026</option>
            <option value={2025}>2025</option>
          </select>
        </div>
      </div>

      {/* Filing Status */}
      <div className="form-group">
        <label htmlFor="filingStatus">Filing status</label>

        <select
          id="filingStatus"
          value={filingStatus}
          onChange={handleFilingStatusChange}
          disabled={loading}
        >
          <option value="single">Single</option>
          <option value="married">Married</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      {/* Button */}
      <button
        type="submit"
        className="calculate-button"
        disabled={loading}
      >
        {loading ? "Calculating..." : "Calculate My Pay"}
      </button>
    </form>
  );
}

export default SalaryForm;