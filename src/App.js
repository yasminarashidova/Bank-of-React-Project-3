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

  componentDidMount() {
    //Fetches the credits data
    fetch('https://johnnylaicode.github.io/api/credits.json')
      .then(response => response.json())
      .then(data => {
        const totalCredits = data.reduce((total, credit) => total + credit.amount, 0);
        this.setState({ creditList: data, accountBalance: totalCredits });
      })
      .catch(error => {
        console.error('Error fetching credits data:', error);
      });

      //Fetches the debits data
    fetch('https://johnnylaicode.github.io/api/debits.json')
    .then(response => response.json())
    .then(data => {
      const totalDebits = data.reduce((total, debit) => total + debit.amount, 0);
      this.setState({ debitList: data, accountBalance: this.state.accountBalance - totalDebits });
    })
    .catch(error => {
      console.error('cant fetch debit data:', error);
    });

    }

    addCredits = (info) => {
      let credits = [...this.state.creditList];
      let newCreditSubmission = {
        amount: info.amount,
        description: info.description,
        date: info.date,
      };
      credits.push(newCreditSubmission);
      let newBalance = Number(this.state.accountBalance) + Number(info.amount);
      this.setState({ creditList: credits, accountBalance: newBalance });
      console.log(credits);
    };
    
    addDebit = (debit) => {
      this.setState(prevState => ({
        debitList: [...prevState.debitList, debit],
        accountBalance: prevState.accountBalance - debit.amount
      }));
    };


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
    const CreditsComponent = () => (<Credits credits={this.state.creditList} accountBalance={this.state.accountBalance} addCredits={this.addCredits} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} accountBalance={this.state.accountBalance} addDebit={this.addDebit} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-starter-code">
        <div style={{ backgroundColor: '#f0f8ff', minHeight: '100vh', padding: '10px' }}>
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