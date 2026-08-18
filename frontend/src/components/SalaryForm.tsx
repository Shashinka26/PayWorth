import { useState } from "react";
import type { SalaryRequest, SalaryResult } from "../types/salary";
import { calculateSalary } from "../services/salaryApi";

type SalaryFormProps = {
  onResult: (result: SalaryResult) => void;
  onInputChange: () => void;
};

function SalaryForm({
  onResult,
  onInputChange,
}: SalaryFormProps) {
  const [annualSalary, setAnnualSalary] = useState("85000");
  const [state, setState] = useState("CA");
  const [filingStatus, setFilingStatus] = useState("single");
  const [taxYear, setTaxYear] = useState(2026);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const salary = Number(annualSalary);

    if (!annualSalary.trim()) {
      setError("Please enter your annual salary.");
      return;
    }

    if (!Number.isFinite(salary) || salary <= 0) {
      setError("Annual salary must be greater than zero.");
      return;
    }

    if (salary > 10000000) {
      setError(
        "Please enter an annual salary below $10,000,000."
      );
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

      onResult(result);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Could not calculate salary.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="salary-form-card"
      onSubmit={handleSubmit}
    >
      <div className="form-header">
        <span className="form-eyebrow">
          2026 US Salary Calculator
        </span>

        <h2>Calculate your take-home pay</h2>

        <p>
          Enter your salary and tax details to see your
          estimated income after taxes.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="annualSalary">
          Annual salary
        </label>

        <div className="salary-input-wrapper">
          <span>$</span>

          <input
            id="annualSalary"
            type="number"
            min="1"
            max="10000000"
            step="1"
            value={annualSalary}
           onChange={(e) => {
  setAnnualSalary(e.target.value);
  onInputChange();
}}
            placeholder="85000"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="state">
            State
          </label>

          <select
            id="state"
            value={state}
            onChange={(e) => {
  setState(e.target.value);
  onInputChange();
}}
          >
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
            <option value="NV">Nevada</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="WY">Wyoming</option>
            <option value="AK">Alaska</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="taxYear">
            Tax year
          </label>

          <select
            id="taxYear"
            value={taxYear}
            onChange={(e) => {
  setTaxYear(Number(e.target.value));
  onInputChange();
}}
          >
            <option value={2026}>2026</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="filingStatus">
          Filing status
        </label>

        <select
          id="filingStatus"
          value={filingStatus}
         onChange={(e) => {
  setFilingStatus(e.target.value);
  onInputChange();
}}
        >
          <option value="single">
            Single
          </option>

          <option value="marriedjointly">
            Married Filing Jointly
          </option>

          <option value="marriedseparately">
            Married Filing Separately
          </option>

          <option value="headofhousehold">
            Head of Household
          </option>
        </select>
      </div>

      <button
        className="calculate-button"
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Calculating..."
          : "Calculate My Pay"}
      </button>

      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}

export default SalaryForm;