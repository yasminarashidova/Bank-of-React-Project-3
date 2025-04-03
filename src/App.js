import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

function App() {
  // State for credits, debits, and account balance
  const [credits, setCredits] = useState([]);
  const [debits, setDebits] = useState([]);
  const [accountBalance, setAccountBalance] = useState(0);

  // Fetch initial data for credits and debits
  useEffect(() => {
    axios.get('https://moj-api.herokuapp.com/credits')
      .then(res => {
        setCredits(res.data);
      })
      .catch(err => console.error("Error fetching credits:", err));

    axios.get('https://moj-api.herokuapp.com/debits')
      .then(res => {
        setDebits(res.data);
      })
      .catch(err => console.error("Error fetching debits:", err));
  }, []);

  // Recalculate account balance whenever credits or debits change.
  // Account Balance = total credits - total debits.
  useEffect(() => {
    const totalCredits = credits.reduce((acc, credit) => acc + parseFloat(credit.amount), 0);
    const totalDebits = debits.reduce((acc, debit) => acc + parseFloat(debit.amount), 0);
    const balance = totalCredits - totalDebits;
    setAccountBalance(parseFloat(balance.toFixed(2)));
  }, [credits, debits]);

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link> |{' '}
          <Link to="/user-profile">User Profile</Link> |{' '}
          <Link to="/login">Login</Link> |{' '}
          <Link to="/credits">Credits</Link> |{' '}
          <Link to="/debits">Debits</Link>
        </nav>
        <Switch>
          <Route exact path="/" render={(props) => (
            <Home {...props} accountBalance={accountBalance} />
          )} />
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/login" component={Login} />
          <Route path="/credits" render={(props) => (
            <Credits
              {...props}
              credits={credits}
              setCredits={setCredits}
              accountBalance={accountBalance}
              setAccountBalance={setAccountBalance}
            />
          )} />
          <Route path="/debits" render={(props) => (
            <Debits
              {...props}
              debits={debits}
              setDebits={setDebits}
              accountBalance={accountBalance}
              setAccountBalance={setAccountBalance}
            />
          )} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
