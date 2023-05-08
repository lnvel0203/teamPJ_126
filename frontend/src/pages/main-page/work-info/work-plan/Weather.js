import React from 'react';

const taxBrackets = [
  { limit: 12000000, rate: 0.06, deduction: 0 },
  { limit: 46000000, rate: 0.15, deduction: 1080000 },
  { limit: 88000000, rate: 0.24, deduction: 5220000 },
  { limit: 150000000, rate: 0.35, deduction: 14900000 },
  { limit: 300000000, rate: 0.38, deduction: 19400000 },
  { limit: 500000000, rate: 0.4, deduction: 25400000 },
  { limit: 1000000000, rate: 0.42, deduction: 35400000 },
  { limit: Infinity, rate: 0.45, deduction: 65400000 }
];

function findBracket(taxableIncome) {
  return taxBrackets.find((bracket) => taxableIncome <= bracket.limit);
}

function calculateIncomeTax(taxableIncome) {
  const bracket = findBracket(taxableIncome);
  const tax = taxableIncome * bracket.rate - bracket.deduction;
  return tax;
}

function IncomeTaxCalculator() {
  const [taxableIncome, setTaxableIncome] = React.useState(0);
  const [incomeTax, setIncomeTax] = React.useState(0);

  function handleInputChange(event) {
    setTaxableIncome(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const incomeTax = calculateIncomeTax(taxableIncome);
    setIncomeTax(incomeTax);
  }

  return (
    <div>
      <h1>Income Tax Calculator</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Taxable Income:
          <input type="number" value={taxableIncome} onChange={handleInputChange} />
        </label>
        <button type="submit">Calculate</button>
      </form>
      <p>Income Tax: {incomeTax}</p>
    </div>
  );
}

export default IncomeTaxCalculator;
