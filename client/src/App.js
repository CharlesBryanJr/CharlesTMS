import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

import Dashboard from './components/Dashboard/Dashboard';

import Carriers from './components/Carriers/Carriers';
import Carrier from './components/Carriers/Carrier/Carrier';
import CreateCarrier_TP from './components/Carriers/CreateCarrier/CreateCarrier_TP';
import CreateCarrier_UAPI from './components/Carriers/CreateCarrier/CreateCarrier_UAPI';

import Loads from './components/Loads/Loads';
import CreateLoad_TP from './components/Loads/CreateLoad/CreateLoad_TP';
import CreateLoad_UAPI from './components/Loads/CreateLoad/CreateLoad_UAPI';

import Invoices from './components/Invoices/Invoices';
import CreateInvoice_TP from './components/Invoices/CreateInvoice/CreateInvoice_TP';
import CreateInvoice_UAPI from './components/Invoices/CreateInvoice/CreateInvoice_UAPI';

import Draft from './components/Drafts/Draft';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/Dashboard" />} />
          <Route path="/Dashboard" exact component={Dashboard} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/Dashboard" />)} />
          <Route path="/Carriers" exact component={Carriers} />
          <Route path="/CreateCarrier_TP" exact component={CreateCarrier_TP} />
          <Route path="/Loads" exact component={Loads} />
          <Route path="/CreateLoad_TP" exact component={CreateLoad_TP} />
          <Route path="/Invoices" exact component={Invoices} />
          <Route path="/CreateInvoice_TP" exact component={CreateInvoice_TP} />
          <Route path="/Draft" exact component={Draft} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;