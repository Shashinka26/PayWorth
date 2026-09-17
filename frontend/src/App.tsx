import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import SalaryForm from "./components/SalaryForm";
import SalaryResult from "./components/SalaryResult";
import CaliforniaSalaryPage from "./pages/CaliforniaSalaryPage";
import NewYorkSalaryPage from "./pages/NewYorkSalaryPage";
import TexasSalaryPage from "./pages/TexasSalaryPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import TaxDisclaimerPage from "./pages/TaxDisclaimerPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/Footer";
import NewJerseySalaryPage from "./pages/NewJerseySalaryPage";
import MassachusettsSalaryPage from "./pages/MassachusettsSalaryPage";
import type { SalaryResult as SalaryResultType } from "./types/salary";
import NorthCarolinaSalaryPage from "./pages/NorthCarolinaSalaryPage";
import Salary100kPage from "./pages/Salary100kPage";
import Salary50kPage from "./pages/Salary50kPage";
import Salary75kPage from "./pages/Salary75kPage";
import Salary150kPage from "./pages/Salary150kPage";



function App() {
  const [result, setResult] = useState<SalaryResultType | null>(null);
  const [payFrequency, setPayFrequency] = useState("monthly");

 return (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <main className="app">
            <header className="app-header">
              <h1>PayWorth</h1>
              <p>Know what your salary is really worth.</p>
            </header>

            <section className="calculator-container">
              <SalaryForm
                onResult={setResult}
                onInputChange={() => setResult(null)}
                onPayFrequencyChange={setPayFrequency}
              />

              {result && (
                <SalaryResult
                  result={result}
                  payFrequency={payFrequency}
                />
              )}
            </section>

            <section className="seo-content">
              <h2>US Salary & Take-Home Pay Calculator</h2>

              <p>
                Use the PayWorth salary calculator to estimate your
                take-home pay after federal taxes, state taxes, Social
                Security, and Medicare. Enter your salary, state, filing
                status, tax year, and pay frequency to see an estimated
                paycheck amount.
              </p>

              <h2>How much of your salary do you take home?</h2>

              <p>
                Your take-home pay is the amount of money you keep after
                estimated federal income tax, state income tax, Social
                Security, and Medicare taxes are deducted from your gross
                salary.
              </p>

              <h2>What affects your take-home pay?</h2>

              <ul>
                <li>Annual salary or hourly pay rate</li>
                <li>Federal income tax</li>
                <li>State income tax</li>
                <li>Filing status</li>
                <li>Social Security tax</li>
                <li>Medicare tax</li>
                <li>Pay frequency</li>
                <li>Tax year</li>
              </ul>

              <h2>Salary calculator by state</h2>

              <p>
                State taxes can make a significant difference in your
                take-home pay. PayWorth allows you to compare estimated
                take-home pay across supported US states.
              </p>

              <h2>Important note</h2>

              <p>
                PayWorth provides an estimate for informational purposes
                only. Actual paycheck amounts may vary based on tax
                credits, deductions, retirement contributions, health
                insurance, benefits, local taxes, and other payroll
                adjustments.
              </p>
            </section>
          </main>
        }
      />

      <Route
        path="/california-salary-calculator"
        element={<CaliforniaSalaryPage />}
      />

     <Route
      path="/new-york-salary-calculator"
      element={<NewYorkSalaryPage />}
    />
    <Route
  path="/texas-salary-calculator"
  element={<TexasSalaryPage />}
/>

<Route
  path="/privacy-policy"
  element={<PrivacyPolicyPage />}
/>
<Route
  path="/terms"
  element={<TermsPage />}
/>
<Route
  path="/tax-disclaimer"
  element={<TaxDisclaimerPage />}
/>

<Route
  path="/about"
  element={<AboutPage />}
/>

<Route
  path="/contact"
  element={<ContactPage />}
/>

<Route
  path="/new-jersey-salary-calculator"
  element={<NewJerseySalaryPage />}
/>

<Route
  path="/massachusetts-salary-calculator"
  element={<MassachusettsSalaryPage />}
/>

<Route
  path="/north-carolina-salary-calculator"
  element={<NorthCarolinaSalaryPage />}
/>

<Route
  path="/salary/100000"
  element={<Salary100kPage />}
/>

<Route
  path="/salary/50000"
  element={<Salary50kPage />}
/>

<Route
  path="/salary/75000"
  element={<Salary75kPage />}
/>
<Route
  path="/salary/150000"
  element={<Salary150kPage />}
/>


    </Routes>
    <Footer />
  </BrowserRouter>
);
}

export default App;