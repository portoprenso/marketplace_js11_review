import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import ProductContextProvider from "./../contexts/ProductContext";
import ProductDetails from './../components/Home/ProductDetails';

const Routes = () => {
  return (
    <BrowserRouter>
      <ProductContextProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/details/:id" component={ProductDetails} />
        </Switch>
      </ProductContextProvider>
    </BrowserRouter>
  );
};

export default Routes;
