import React, { Component } from 'react';
import './style/header.css';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  LoginAction,
  LoginActionThunk,
  ResetActionthunk,
  ResetAction,
  LogoutAction,
  RegActionThunk,
} from "../redux/actions";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { IoIosNotifications, IoMdCart } from "react-icons/io";
import { withStyles } from "@material-ui/core/styles";
import { MdEmail } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Alert } from "reactstrap";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import logo from '../assets/webShoes-01.jpg';

const Style = {
  root: {
    "& label.Mui-focused": {
      color: "#fbab7e",
    },
  },
};

class Header extends Component {
  state = {
    isOpen: false,
    isLogin: false,
    modal: false,
    isVisible: false,
    password: "",
    username: "",
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  toggleModal = () => {
    this.setState({ isLogin: !this.state.isLogin });
  }

  visToggle = () => {
    this.setState({ isVisible: !this.state.isVisible })
  }

  onLoginClick = () => {
    this.setState({ isLogin: !this.state.isLogin })
  }

  onLoginClickYes = () => {
    if (this.props.dataUser.islogin) {
      this.setState({ isLogin: !this.state.isLogin, username: '', password: '' })
    } else {
      return null
    }
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    console.log(e)
  }

  onLoginSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    var data = {
      username: username,
      password: password,
    };
    this.props.RegActionThunk(data);
  };

  onLogoutClick = () => {
    localStorage.removeItem('id');
    this.props.LogoutAction();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="d-flex">
        <Navbar className="header-bg px-5 py-5" expand="md">
          <div className="col-3">
            <NavbarBrand href="/" ><img src={logo} alt="logo" width="100px" /></NavbarBrand>
          </div>

          <div className="d-flex col-9">
            <div className="d-flex kategori">
              {/* <NavItem className="li">Men</NavItem>
              <NavItem className="li">Women</NavItem>
              <NavItem className="li">Kids</NavItem>
              <NavItem className="li">Surf</NavItem>
              <NavItem className="li">BMX</NavItem> */}
            </div>
            <InputGroup style={{ marginLeft: "10px", width: "40%" }} className="inputSearch">
              <Input className="inputSearch" placeholder="search" />
              <InputGroupAddon addonType="append" style={{ cursor: 'pointer', height: '20px' }}>
                <InputGroupText> <BiSearch /> </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar className="search">
              <Nav className="ml-auto" navbar>
                {this.props.dataUser.islogin ? (
                  <>
                    <NavItem className="py-2 mx-2">
                      <>
                        <IoMdCart className="cart" style={{ fontSize: "30px", color: "rgb(133, 133, 133)" }} />
                        {this.props.dataUser.cart.length ? (
                          <Badge
                            style={{
                              position: "relative",
                              fontSize: "12px",
                              height: '23px',
                              width: '23px',
                              paddingTop: '3px',
                              fontWeight: "bold",
                              bottom: 11,
                              right: 5,
                              backgroundColor: "rgb(231, 24, 24)",
                              borderRadius: "50%",
                              border: "3px solid white"
                            }}
                          > {this.props.dataUser.cart.length} </Badge>
                        ) : (
                          <Badge
                            className="mr-1"
                            style={{
                              height: '23px',
                              width: '23px',
                              bottom: 11,
                              right: 5,
                              backgroundColor: "transparent",
                            }}
                          >  </Badge>
                        )}
                      </>
                    </NavItem>
                    <NavItem className="py-2 mx-3">History</NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle
                        nav
                        className='d-flex ml-2'
                        style={{
                          color: 'rgb(50, 50, 50)',
                          textDecoration: 'none',
                          textTransform: 'uppercase',
                          fontWeight: '600'
                        }}>
                        <div>
                          <img
                            src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                            alt="profile"
                            style={{
                              position: "relative",
                              width: '23px',
                              height: '23px',
                              bottom: 2,
                              right: 10,
                              borderRadius: '50%',
                            }} />
                        </div>
                        {this.props.dataUser.username}
                      </DropdownToggle>
                      <DropdownMenu right>
                        {this.props.dataUser.role == 'admin' ? (
                          <Link to="/admin_manage_product">
                            <DropdownItem>Manage product</DropdownItem>
                          </Link>
                        ) : null}
                        <DropdownItem onClick={this.onLogoutClick}>Logout</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </>
                ) : (
                  <>
                    <NavItem className="mx-2">
                      <button className="header-login px-4 py-2" style={{ borderRadius: "8px" }} onClick={this.onLoginClick}>
                        Login
                    </button>
                    </NavItem>
                    {/* <NavItem className="mx-2">
                      <button className="header-sign px-4 py-2 mr-5" style={{ borderRadius: "8px" }}>
                        <Link to="/user_signup" style={{ textDecoration: 'none', color: 'white' }}>
                          Daftar
                      </Link>
                      </button>
                    </NavItem> */}
                  </>
                )}
              </Nav>
            </Collapse>
          </div>
        </Navbar>

        {this.state.isLogin ? (
          <>
            <Modal size="md" isOpen={this.state.isLogin} toggle={this.toggleModal} className="modal-login">
              <ModalHeader toggle={this.toggleModal} className="login-header">
                <h2 className="title-login">Login</h2>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={this.onLoginSubmit} >
                  <span style={{ fontSize: '15px', fontWeight: "600" }}>Username</span>
                  <FormControl className={classes.root} style={{ width: '100%', paddingBottom: '15px', paddingTop: '5px' }}>
                    <OutlinedInput
                      type="text"
                      style={{ height: '40px' }}
                      value={this.state.username}
                      onChange={this.onInputChange}
                      name="username"
                    />
                  </FormControl>
                  <span style={{ fontSize: '15px', fontWeight: "600" }}>Password</span>
                  <FormControl className={classes.root} style={{ width: '100%', paddingBottom: '10px', paddingTop: '5px' }}>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={this.state.isVisible ? "text" : "password"}
                      value={this.state.password}
                      style={{ height: '40px' }}
                      onChange={this.onInputChange}
                      name="password"
                      endAdornment={
                        <InputAdornment position="start">
                          <IconButton
                            className="ml-2"
                            aria-label="toggle password visibility"
                            onClick={this.visToggle}
                          >
                            {this.state.isVisible ? (
                              <AiFillEye
                                style={{ color: "rgb(74, 116, 255)", fontSize: "23px" }}
                                onClick={this.visToggle}
                              />
                            ) : (
                              <AiFillEyeInvisible
                                style={{ color: "#9f9f9f", fontSize: "23px" }}
                                onClick={this.visToggle}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <Button className="px-4 py-2 tombol-login" submit={true} onChange={this.onLoginClickYes()}>
                    Login
                  </Button>
                  {this.props.dataUser.error ? (
                    <Alert color="danger mt-2">
                      {this.props.dataUser.error}{" "}
                      <span
                        className="float-right errorr"
                        onClick={this.props.ResetActionthunk}
                      >
                        x
                    </span>
                    </Alert>
                  ) : null}
                </form>
              </ModalBody>
              <ModalFooter className="modal-footer">
                <p className="mr-4" style={{ fontSize: '13px' }}> Belum punya akun?
                <span
                    style={{ color: 'blue' }}>
                    <Link
                      to="/user_signup"
                      style={{ textDecoration: 'none', color: 'blue', marginLeft: '5px' }}
                    >Create Account</Link>
                  </span>
                </p>
              </ModalFooter>
            </Modal>
          </>

        ) : (
          null
        )
        }

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
    ResetAction,
    LogoutAction,
    RegActionThunk,
  })(Header)
);