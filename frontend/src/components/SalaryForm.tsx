import { useState, type FormEvent, type ChangeEvent } from "react";
import type { SalaryRequest, SalaryResult } from "../types/salary";
import { calculateSalary } from "../services/salaryApi";

type SalaryFormProps = {
  onResult: (result: SalaryResult) => void;
  onInputChange: () => void;
};

function SalaryForm({ onResult, onInputChange }: SalaryFormProps) {
  const [annualSalary, setAnnualSalary] = useState("85000");

  const [inputMode, setInputMode] =
    useState<"annual" | "hourly">("annual");

  const [hourlyRate, setHourlyRate] = useState("30");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");

  const [state, setState] = useState("CA");
  const [filingStatus, setFilingStatus] = useState("single");
  const [taxYear, setTaxYear] = useState(2026);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    // Calculate annual salary
    let salary: number;

    if (inputMode === "annual") {
      salary = Number(annualSalary);
    } else {
      const hourly = Number(hourlyRate);
      const hours = Number(hoursPerWeek);
      const weeks = Number(weeksPerYear);

      salary = hourly * hours * weeks;
    }

    // Validate input
    if (inputMode === "annual") {
      if (!annualSalary.trim()) {
        setError("Please enter your annual salary.");
        return;
      }
    } else {
      if (!hourlyRate.trim()) {
        setError("Please enter your hourly pay.");
        return;
      }

      if (!hoursPerWeek.trim()) {
        setError("Please enter hours per week.");
        return;
      }

      if (!weeksPerYear.trim()) {
        setError("Please enter weeks per year.");
        return;
      }

      const hourly = Number(hourlyRate);
      const hours = Number(hoursPerWeek);
      const weeks = Number(weeksPerYear);

      if (!Number.isFinite(hourly) || hourly <= 0) {
        setError("Hourly pay must be greater than $0.");
        return;
      }

      if (!Number.isFinite(hours) || hours <= 0 || hours > 168) {
        setError("Hours per week must be between 1 and 168.");
        return;
      }

      if (!Number.isFinite(weeks) || weeks <= 0 || weeks > 52) {
        setError("Weeks per year must be between 1 and 52.");
        return;
      }
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

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      onResult(result);
    } catch (err) {
      console.error("Salary calculation failed:", err);
      setError("Unable to calculate salary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSalaryChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setAnnualSalary(event.target.value);
    setError("");
    onInputChange();
  };

  const handleHourlyRateChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setHourlyRate(event.target.value);
    setError("");
    onInputChange();
  };

  const handleHoursPerWeekChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setHoursPerWeek(event.target.value);
    setError("");
    onInputChange();
  };

  const handleWeeksPerYearChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setWeeksPerYear(event.target.value);
    setError("");
    onInputChange();
  };

  const handleStateChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setState(event.target.value);
    setError("");
    onInputChange();
  };

  const handleFilingStatusChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setFilingStatus(event.target.value);
    setError("");
    onInputChange();
  };

  const handleTaxYearChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setTaxYear(Number(event.target.value));
    setError("");
    onInputChange();
  };

  const handleInputModeChange = (
    mode: "annual" | "hourly"
  ) => {
    setInputMode(mode);
    setError("");
    onInputChange();
  };

  const annualEquivalent =
    Number(hourlyRate || 0) *
    Number(hoursPerWeek || 0) *
    Number(weeksPerYear || 0);

  return (
    <form className="salary-form" onSubmit={handleSubmit}>
      <div className="calculator-badge">
        {taxYear} US Salary Calculator
      </div>

      <h2>Calculate your take-home pay</h2>

      <p className="calculator-description">
        Enter your salary and tax details to see your estimated income
        after taxes.
      </p>

      {/* Input Mode */}
      <div className="input-mode">
        <button
          type="button"
          className={inputMode === "annual" ? "active" : ""}
          onClick={() => handleInputModeChange("annual")}
          disabled={loading}
        >
          Annual Salary
        </button>

        <button
          type="button"
          className={inputMode === "hourly" ? "active" : ""}
          onClick={() => handleInputModeChange("hourly")}
          disabled={loading}
        >
          Hourly Pay
        </button>
      </div>

      {/* Annual Salary */}
      {inputMode === "annual" && (
        <div className="form-group">
          <label htmlFor="annualSalary">
            Annual salary
          </label>

          <div className="salary-input-wrapper">
            <span>$</span>

            <input
              id="annualSalary"
              type="number"
              min="0"
              value={annualSalary}
              onChange={handleSalaryChange}
              step="1"
              placeholder="85000"
              disabled={loading}
            />
          </div>
        </div>
      )}

      {/* Hourly Pay */}
      {inputMode === "hourly" && (
        <>
          <div className="form-group">
            <label htmlFor="hourlyRate">
              Hourly pay
            </label>

            <div className="salary-input-wrapper">
              <span>$</span>

              <input
                id="hourlyRate"
                type="number"
                min="0"
                step="0.01"
                value={hourlyRate}
                onChange={handleHourlyRateChange}
                placeholder="30"
                disabled={loading}
              />
            </div>
          </div>

          <div className="hourly-fields">
            <div className="form-group">
              <label htmlFor="hoursPerWeek">
                Hours per week
              </label>

              <input
                id="hoursPerWeek"
                type="number"
                min="1"
                max="168"
                value={hoursPerWeek}
                onChange={handleHoursPerWeekChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="weeksPerYear">
                Weeks per year
              </label>

              <input
                id="weeksPerYear"
                type="number"
                min="1"
                max="52"
                value={weeksPerYear}
                onChange={handleWeeksPerYearChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="annual-equivalent">
            Annual equivalent:{" "}
            <strong>
              $
              {annualEquivalent.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </strong>
          </div>
        </>
      )}

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
            <option value="AK">Alaska</option>
            <option value="CA">California</option>
            <option value="FL">Florida</option>
            <option value="NH">New Hampshire</option>
            <option value="NV">Nevada</option>
            <option value="NY">New York</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="WA">Washington</option>
            <option value="WY">Wyoming</option>
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
        <label htmlFor="filingStatus">
          Filing status
        </label>

        <select
          id="filingStatus"
          value={filingStatus}
          onChange={handleFilingStatusChange}
          disabled={loading}
        >
          <option value="single">Single</option>
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

      {/* Error */}
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      {/* Calculate Button */}
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