import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginAction } from "./redux/actions";
import { connect } from "react-redux";
import { API_URL } from "./helper";
// import Home from "./pages/User_Home";
import ManageProduct from "./pages/Admin_ManageProduct";
// import NotFound from './pages/ErrorNotFound404';
// import Cart from './pages/User_Cart';
// import ProductDetail from "./pages/User_Products_Detail";
// import SignUp from "./pages/User_SignUp";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    isLoading: true,
  };
  componentDidMount() {
    let id = localStorage.getItem("id");
    axios
      .get(`${API_URL}/users/${id}`)
      .then((res) => {
        this.props.LoginAction(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Switch>
          {/* <Route path="/" exact component={Home} />
          <Route path="/user_signup" exact component={SignUp} /> */}
          <Route path="/" exact component={ManageProduct} />
          {/* <Route path="/cart" component={Cart} />
          <Route path="/product/:idprod" component={ProductDetail} /> */}
          {/* <Route path='*' component={NotFound} /> */}
        </Switch>
      </div>
    );
  }
}

const MaptstatetoProps = (state) => {
  return {
    dataUser: state.Auth,
  };
};
export default connect(MaptstatetoProps, { LoginAction })(App);
