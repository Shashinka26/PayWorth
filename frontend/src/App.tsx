import { useState } from "react";
import "./App.css";

import SalaryForm from "./components/SalaryForm";
import SalaryResult from "./components/SalaryResult";
import type { SalaryResult as SalaryResultType } from "./types/salary";

function App() {
  const [result, setResult] = useState<SalaryResultType | null>(null);

  return (
    <main className="app">
      <header className="app-header">
        <h1>PayWorth</h1>
        <p>Know what your salary is really worth.</p>
      </header>

      <section className="calculator-container">
       <SalaryForm
  onResult={setResult}
  onInputChange={() => setResult(null)}
/>

        {result && (
          <SalaryResult result={result} />
        )}
      </section>
    </main>
  );
}

export default App;