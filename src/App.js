import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInPage from './pages/signin/signin.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component'
import { selectCurrentUser } from './redux/user/user.selectors'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { checkUserSection, setCurrentUser } from './redux/user/user.actions'

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { checkUserSection } = this.props;
    checkUserSection()
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : <SignInPage />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    currentUser : selectCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
  checkUserSection: () => dispatch(checkUserSection())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);