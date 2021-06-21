import React from 'react';
import './App.less';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Store from './pages/Store'
import Product from './pages/Product'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Register from './pages/Register'
import Shipping from './pages/Shipping'
import Profile from './pages/Profile'
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import 'animate.css';

import { StoreProvider } from "./store"




function App() {
    return (
        <StoreProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/store" component={Store}/>
                    <Route exact path="/store/:pageName" component={Store}/>
                    <Route exact path="/feeder" component={Feed} />
                    <Route exact path="/product/:category/:productId" component={Product}/>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/shipping" component={Shipping} />
                    <Route path="/payment" component={Payment} />
                    <Route path="/placeorder" component={PlaceOrder} />
                    <Route path="/order/:orderId" component={Order} />
                    <Route path="/profile" component={Profile} />
                </Switch>
            </BrowserRouter>
        </StoreProvider>
        
    );
}

export default App;