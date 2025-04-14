/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
==================================================*/
import React from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Debits = (props) => {
  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  
      // Extract properties from each debit JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount.toFixed(2)} {debit.description} {date}</li>
    });
  }
  
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      <AccountBalance accountBalance={props.accountBalance} />
      
      <h3>Debits List</h3>
      <ul>
        {debitsView()}
      </ul>

      <form onSubmit={props.addDebit}>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" required />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input type="number" name="amount" step="0.01" min="0" required />
        </div>
        <button type="submit">Add Debit</button>
      </form>
      
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;
