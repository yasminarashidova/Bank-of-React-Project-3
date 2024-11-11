/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Debits = (props) => {
  const { debits, accountBalance } = props;
  const [formData, setFormData] = useState({ description: '', amount: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, amount } = formData;
    if (description && amount) {
      const newDebit = {
        id: debits.length + 1, // Generate a unique ID (assuming IDs are sequential integers)
        description,
        amount: parseFloat(amount),
        date: new Date().toISOString().slice(0, 10), // Current date in YYYY-MM-DD format
      };

      // Call the addDebit function passed as a prop from app.js to update the debits array
      props.addDebit(newDebit);

      // Clear the form fields after adding the new debit
      setFormData({ description: '', amount: '' });
    }
  };

  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>({debit.id}) {debit.amount.toFixed(2)} {debit.description} {date} </li>
    });
  }

  return (
    <div>
      <h1>Debits</h1>
      {debitsView()}
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br/>
        <label htmlFor="description">Amount: </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <br/>
        <button type="submit">Add Debit</button>
      </form>
      <br />
      <br />
      <p>Account Balance: ${accountBalance.toFixed(2)}</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Debits;