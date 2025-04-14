/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
==================================================*/
import React from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Credits = (props) => {
  // Create the list of Credit items
  let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {  
      // Extract properties from each credit JSON array element
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount.toFixed(2)} {credit.description} {date}</li>
    });
  }

  // Render the list of Credit items and a form to input new Credit item
  return (
    <div>
      <h1>Credits</h1>

      <AccountBalance accountBalance={props.accountBalance} />
      
      <h3>Credits List</h3>
      <ul>
        {creditsView()}
      </ul>

      <form onSubmit={props.addCredit}>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" required />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input type="number" name="amount" step="0.01" min="0" required />
        </div>
        <button type="submit">Add Credit</button>
      </form>
      
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;
