import React, { Component } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { API_URL } from '../helper/API';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import {
  LoginAction,
  LoginActionThunk,
  ResetActionthunk,
  RegActionThunk,
} from "../redux/actions";
import Loader from "react-loader-spinner";
import IconButton from "@material-ui/core/IconButton";
import Button from '../component/Button';
import axios from "axios";
import { Link }from 'react-router-dom'; 
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

const Style = {
  root: {
    "& label.Mui-focused": {
      color: "#fbab7e",
    }
  },
};

class SignUp extends Component {
  state = {
    isVisible: false,
    isVisibleConfirm: false,
    confirmpassword: "",
    username: "",
    password: "",
  };

  toggleVis = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  toggleConfirm = () => {
    this.setState({ isVisibleConfirm: !this.state.isVisibleConfirm });
  };

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSignSubmit = (e) => {
    e.preventDefault();
    const { username, password, confirmpassword } = this.state;
    let data = {
      username,
      password,
      confirmpassword,
    };
    this.props.RegActionThunk(data);
  };

  render() {
    const { classes } = this.props;
    if (this.props.dataUser.islogin) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="container" style={{ marginTop: "120px" }}>
          <div className="row " style={{ height: "70vh", width: "150vh" }}>
            <div className="col-md-7">gambar</div>
            <div className="rounded col-md-5 d-flex justify-content-center shadow">
              <form onSubmit={this.onSignSubmit} style={{ width: "90%" }}>
                <h3 style={{ color: "rgb(100, 100, 100)", paddingTop: "32px", textAlign: "center", fontWeight: "600" }}>Daftar Sekarang</h3>
                <span
                  style={{ marginLeft: "89px", fontSize: '13px' }}
                >
                  Sudah punya akun ?
                  <span
                    style={{ color: "blue" }}
                  >
                    <Link to="/" style={{ textDecoration: 'none', color: 'blue', marginLeft: '5px' }}>
                      Login
                    </Link>
                  </span>
                </span>


                <p style={{ fontSize: '13px', fontWeight: "500", marginTop: "24px", marginBottom: "7px", lineHeight: '1px' }}>Username</p>
                <FormControl className={classes.root} style={{ width: '100%', paddingBottom: '10px', paddingTop: '5px' }}>
                  <OutlinedInput
                    type='text'
                    style={{ height: '40px' }}
                    onChange={this.onInputChange}
                    value={this.state.username}
                    name="username"
                  />
                </FormControl>


                <p style={{ fontSize: '13px', fontWeight: "500", marginTop: "13px", marginBottom: "7px", lineHeight: '1px' }}>Password</p>
                <FormControl className={classes.root} style={{ width: '100%', paddingBottom: '10px', paddingTop: '5px' }}>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={this.state.isVisible ? "text" : "password"}
                    value={this.state.password}
                    onChange={this.onInputChange}
                    style={{ height: '40px' }}
                    name="password"
                    endAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          className="ml-2"
                          aria-label="toggle password visibility"
                          onClick={this.toggleVis}
                        >
                          {this.state.isVisible ? (
                            <AiFillEye
                              style={{ color: "rgb(74, 116, 255)", fontSize: "23px" }}
                              onClick={this.toggleVis}
                            />
                          ) : (
                            <AiFillEyeInvisible
                              style={{ color: "#9f9f9f", fontSize: "23px" }}
                              onClick={this.toggleVis}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>


                <p style={{ fontSize: '13px', fontWeight: "500", marginTop: "13px", marginBottom: "7px", lineHeight: '1px' }}>Konfirmasi password</p>
                <FormControl className={classes.root} style={{ width: '100%', paddingBottom: '10px', paddingTop: '5px' }}>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={this.state.isVisibleConfirm ? "text" : "password"}
                    value={this.state.confirmpassword}
                    onChange={this.onInputChange}
                    style={{ height: '40px' }}
                    name="confirmpassword"
                    endAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          className="ml-2"
                          aria-label="toggle password visibility"
                          onClick={this.toggleConfirm}
                        >
                          {this.state.isVisibleConfirm ? (
                            <AiFillEye
                              style={{ color: "rgb(74, 116, 255)", fontSize: "23px" }}
                              onClick={this.toggleConfirm}
                            />
                          ) : (
                            <AiFillEyeInvisible
                              style={{ color: "#9f9f9f", fontSize: "23px" }}
                              onClick={this.toggleConfirm}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <div className="mt-3">
                  <Button
                    submit={true}
                    className="px-4 py-2 w-100"
                  >
                    Daftar
                    </Button>
                </div>
                {this.props.dataUser.error ? (
                  <Alert color="danger mt-2">
                    {this.props.dataUser.error}{" "}
                    <span
                      className="float-right"
                      onClick={this.props.ResetActionthunk}
                    >
                      X
                    </span>
                  </Alert>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const MaptstatetoProps = (state) => {
  return {
    dataUser: state.Auth,
  };
};

export default withStyles(Style)(
  connect(MaptstatetoProps, {
    LoginAction,
    LoginActionThunk,
    ResetActionthunk,
    RegActionThunk,
  })(SignUp)
);