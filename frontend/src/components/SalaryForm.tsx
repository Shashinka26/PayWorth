import { useState } from "react";
import type { SalaryResult } from "../types/salary";
import { calculateSalary } from "../services/salaryApi";

type SalaryFormProps = {
  onResult: (result: SalaryResult) => void;
  onInputChange: () => void;
  onPayFrequencyChange: (frequency: string) => void;
  initialState?: string;
  initialTaxYear?: number;
  initialSalary?: string;
};

function SalaryForm({
  onResult,
  onInputChange,
  onPayFrequencyChange,
  initialState = "CA",
  initialTaxYear = 2026,
  initialSalary = "85000",
}: SalaryFormProps) {
  const [annualSalary, setAnnualSalary] = useState(initialSalary);

  const [inputMode, setInputMode] =
    useState<"annual" | "hourly">("annual");

  const [hourlyRate, setHourlyRate] = useState("30");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");

  const [state, setState] = useState(initialState);
  const [filingStatus, setFilingStatus] = useState("single");
  const [taxYear, setTaxYear] = useState(initialTaxYear);
  const [payFrequency, setPayFrequency] = useState("monthly");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStateChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setState(event.target.value);
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

  const handleFilingStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilingStatus(event.target.value);
    setError("");
    onInputChange();
  };

  const handlePayFrequencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const frequency = event.target.value;

    setPayFrequency(frequency);
    onPayFrequencyChange(frequency);
  };

  const handleAnnualSalaryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnnualSalary(event.target.value);
    setError("");
    onInputChange();
  };

  const handleHourlyRateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHourlyRate(event.target.value);
    setError("");
    onInputChange();
  };

  const handleHoursPerWeekChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHoursPerWeek(event.target.value);
    setError("");
    onInputChange();
  };

  const handleWeeksPerYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWeeksPerYear(event.target.value);
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    onInputChange();

    let salary = 0;

    if (inputMode === "annual") {
      salary = Number(annualSalary);

      if (!annualSalary.trim()) {
        setError("Please enter your annual salary.");
        return;
      }
    } else {
      const rate = Number(hourlyRate);
      const hours = Number(hoursPerWeek);
      const weeks = Number(weeksPerYear);

      if (!hourlyRate.trim()) {
        setError("Please enter your hourly rate.");
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

      if (!Number.isFinite(rate) || rate <= 0) {
        setError("Please enter a valid hourly rate.");
        return;
      }

      if (hours < 1 || hours > 168) {
        setError("Hours per week must be between 1 and 168.");
        return;
      }

      if (weeks < 1 || weeks > 52) {
        setError("Weeks per year must be between 1 and 52.");
        return;
      }

      salary = rate * hours * weeks;
    }

    if (!Number.isFinite(salary) || salary <= 0) {
      setError("Please enter a valid salary amount.");
      return;
    }

    if (salary > 100000000) {
      setError("Salary cannot exceed $100,000,000.");
      return;
    }

    const request = {
      annualSalary: salary,
      state,
      filingStatus,
      taxYear,
    };

    try {
      setLoading(true);

      const [result] = await Promise.all([
        calculateSalary(request),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);

      onResult(result);
    } catch (err) {
      console.error(err);
      setError("Unable to calculate salary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="salary-form" onSubmit={handleSubmit}>
      <p className="calculator-eyebrow">
        {taxYear} US Salary Calculator
      </p>

      <h2>Calculate your take-home pay</h2>

      <p className="calculator-description">
        Enter your salary and tax details to see your estimated income
        after taxes.
      </p>

      <div className="input-mode-toggle">
        <button
          type="button"
          className={
            inputMode === "annual" ? "active" : ""
          }
          onClick={() => handleInputModeChange("annual")}
          disabled={loading}
        >
          Annual Salary
        </button>

        <button
          type="button"
          className={
            inputMode === "hourly" ? "active" : ""
          }
          onClick={() => handleInputModeChange("hourly")}
          disabled={loading}
        >
          Hourly Pay
        </button>
      </div>

      {inputMode === "annual" ? (
        <div className="form-group">
          <label htmlFor="annualSalary">
            Annual salary
          </label>

          <div className="currency-input">
            <span>$</span>

            <input
              id="annualSalary"
              type="number"
              min="0"
              step="100"
              value={annualSalary}
              onChange={handleAnnualSalaryChange}
              disabled={loading}
              placeholder="85000"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="hourlyRate">
              Hourly rate
            </label>

            <div className="currency-input">
              <span>$</span>

              <input
                id="hourlyRate"
                type="number"
                min="0"
                step="0.01"
                value={hourlyRate}
                onChange={handleHourlyRateChange}
                disabled={loading}
                placeholder="30"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hoursPerWeek">
                Hours per week
              </label>

              <input
                id="hoursPerWeek"
                type="number"
                min="1"
                max="168"
                step="1"
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
                step="1"
                value={weeksPerYear}
                onChange={handleWeeksPerYearChange}
                disabled={loading}
              />
            </div>
          </div>
        </>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="state">
            State
          </label>

          <select
            id="state"
            value={state}
            onChange={handleStateChange}
            disabled={loading}
          >
            <option value="AK">Alaska</option>
            <option value="CA">California</option>
            <option value="FL">Florida</option>
            <option value="IL">Illinois</option>
            <option value="MA">Massachusetts</option>
            <option value="NH">New Hampshire</option>
            <option value="NV">Nevada</option>
            <option value="NY">New York</option>
            <option value="NJ">New Jersey</option>
            <option value="NC">North Carolina</option>
            <option value="PA">Pennsylvania</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="WA">Washington</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="taxYear">
            Tax year
          </label>

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

      <div className="form-group">
        <label htmlFor="payFrequency">
          Pay frequency
        </label>

        <select
          id="payFrequency"
          value={payFrequency}
          onChange={handlePayFrequencyChange}
          disabled={loading}
        >
          <option value="weekly">Weekly</option>
          <option value="biweekly">Every 2 weeks</option>
          <option value="semimonthly">
            Twice a month
          </option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

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