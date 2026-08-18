import type { SalaryRequest, SalaryResult } from "../types/salary";

const API_URL = "http://localhost:5199/api/Salary/calculate";

export async function calculateSalary(
  request: SalaryRequest
): Promise<SalaryResult> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    let message = "Salary calculation failed.";

    try {
      const errorBody = await response.text();

      if (errorBody) {
        message = errorBody.replace(/^"|"$/g, "");
      }
    } catch {
      // keep default message
    }

    throw new Error(message);
  }

  return response.json();
}