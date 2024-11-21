/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { Component } from "react";
import AccountBalance from './AccountBalance';
import { Link } from "react-router-dom";

class Credit extends Component {
  constructor() {
    super();
    this.state = {
      credit: {
        id: "",
        amount: 0.0,
        description: "",
        date: "",
      },
    };
  }

  // Create the list of Credit items
  creditsView = () => {
    const { credits } = this.props;
    return credits.map((cred) => {
      // Extract properties for display
      let date = cred.date.slice(0, 10);
      return (
        <li key={cred.id}>
          {cred.amount} {cred.description} {date}
        </li>
      );
    });
  };
  

  // Handle input changes and update state
  handleChange = (e) => {
    const updatedCredit = { ...this.state.credit }; // Copy state object
    updatedCredit[e.target.name] = e.target.value;
    updatedCredit["date"] = new Date().toISOString(); // Set the current date
    this.setState({ credit: updatedCredit }); // Update state
  };

  // Handle form submission
  handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    this.props.addCredits(this.state.credit); // Call function passed from App.js
  };

  render() {
    return (
      <div style={{ backgroundColor: '#f0f8ff', padding: '10px' }}>
        <h1>Credits</h1>
        <AccountBalance accountBalance={this.props.accountBalance} />
        <br />
        {this.creditsView()}

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Description"
            style={{ width: "350px" }}
            onChange={this.handleChange}
            required
          />
          <br />
          <input
            type="number"
            pattern="^\d+(\.\d{1,2})?$"
            name="amount"
            placeholder="Amount in $"
            title="Please enter the $ amount up to two decimal places."
            onChange={this.handleChange}
            required
          />
          <button type="submit">Add Credit</button>
        </form>
        <br />
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default Credit;
