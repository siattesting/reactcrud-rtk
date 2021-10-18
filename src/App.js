import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { AddShopForm } from './features/shops/AddShopForm'
import { EditShopForm } from './features/shops/EditShopForm'
import { ShopCard } from './features/shops/ShopCard'
import { ShopsList } from './features/shops/ShopsList'
import { AddUserForm } from './features/users/AddUserForm'
import { EditUserForm } from './features/users/EditUserForm'
import { UserCard } from './features/users/UserCard'
import { UsersList } from './features/users/UsersList'
import { OffersList } from './features/offers/OffersList'
import { AddOfferForm } from './features/offers/AddOfferForm'
import { OfferCard } from './features/offers/OfferCard'
import { EditOfferForm } from './features/offers/EditOfferForm'
import { Loginpage } from './components/LoginPage'
import { HomePage } from './components/HomePage'
import { AboutPage } from './components/AboutPage'


function App() {
  return (
    <Router>
      <Navbar />
      <div className="w3-container">
        <Switch>
        <Route exact path={'/login'} component={Loginpage} />
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <HomePage />
              </React.Fragment>
            )}
          />
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/adduser" component={AddUserForm} />
          <Route exact path="/users/:userId" component={UserCard} /> 
          <Route exact path="/edituser/:userId" component={EditUserForm} />

          <Route exact path="/shops" component={ShopsList} />
          <Route exact path="/addshop" component={AddShopForm} />
          <Route exact path="/shops/:shopId" component={ShopCard} /> 
          <Route exact path="/editshop/:shopId" component={EditShopForm} />

          <Route exact path="/offers" component={OffersList} />
          <Route exact path="/addoffer/:shopId" component={AddOfferForm} />
          <Route exact path="/offers/:offerId" component={OfferCard} />
          <Route exact path="/editoffer/:offerId" component={EditOfferForm} />

          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/home" component={HomePage} />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
