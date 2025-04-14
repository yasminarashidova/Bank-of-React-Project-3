/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Lifecycle method - fetch data when component mounts
  componentDidMount() {
    // Fetch credits
    fetch('https://johnnylaicode.github.io/api/credits.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ creditList: data });
        this.updateAccountBalance();
      })
      .catch(error => console.log(error));

    // Fetch debits
    fetch('https://johnnylaicode.github.io/api/debits.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ debitList: data });
        this.updateAccountBalance();
      })
      .catch(error => console.log(error));
  }

  // Update account balance based on credits and debits
  updateAccountBalance = () => {
    const { creditList, debitList } = this.state;
    
    // Calculate total credits
    const totalCredits = creditList.reduce((total, credit) => {
      return total + parseFloat(credit.amount);
    }, 0);
    
    // Calculate total debits
    const totalDebits = debitList.reduce((total, debit) => {
      return total + parseFloat(debit.amount);
    }, 0);
    
    // Calculate account balance (credits - debits)
    const accountBalance = totalCredits - totalDebits;
    
    // Update state with new account balance (rounded to 2 decimal places)
    this.setState({ accountBalance: parseFloat(accountBalance.toFixed(2)) });
  }

  // Add a new credit
  addCredit = (e) => {
    e.preventDefault();
    
    // Get form values
    const description = e.target.description.value;
    const amount = parseFloat(e.target.amount.value);
    
    // Create a new credit object
    const newCredit = {
      id: this.state.creditList.length + 1,
      description: description,
      amount: amount,
      date: new Date().toISOString().slice(0, 10)
    };
    
    // Update state with new credit and recalculate balance
    this.setState({
      creditList: [...this.state.creditList, newCredit]
    }, () => {
      this.updateAccountBalance();
      // Reset form
      e.target.description.value = '';
      e.target.amount.value = '';
    });
  }

  // Add a new debit
  addDebit = (e) => {
    e.preventDefault();
    
    // Get form values
    const description = e.target.description.value;
    const amount = parseFloat(e.target.amount.value);
    
    // Create a new debit object
    const newDebit = {
      id: this.state.debitList.length + 1,
      description: description,
      amount: amount,
      date: new Date().toISOString().slice(0, 10)
    };
    
    // Update state with new debit and recalculate balance
    this.setState({
      debitList: [...this.state.debitList, newDebit]
    }, () => {
      this.updateAccountBalance();
      // Reset form
      e.target.description.value = '';
      e.target.amount.value = '';
    });
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (
      <Credits 
        credits={this.state.creditList} 
        accountBalance={this.state.accountBalance} 
        addCredit={this.addCredit} 
      />
    ) 
    const DebitsComponent = () => (
      <Debits 
        debits={this.state.debitList} 
        accountBalance={this.state.accountBalance} 
        addDebit={this.addDebit} 
      />
    ) 

    return (
      <Router basename="/Bank-of-React-Project-3">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;
