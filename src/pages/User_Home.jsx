import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { API_URL } from "../helper/API";
import { currencyFormatter } from "../helper/currency";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Pagination,
  PaginationItem,
} from 'reactstrap';
import axios from 'axios';
import Button from "../component/Button";
import Header from '../component/Header';
import ControlledCarousel from './Carrousel';

class User_Home extends Component {
  state = {
    data: [],
    page: 1,
    limit: 12,
    categories: [],
    totaldata: 0,
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/products?_expand=category&_page=${this.state.page}&_limit=${this.state.limit}`)
      .then((res) => {
        this.setState({
          data: res.data,
          totaldata: res.headers["x-total-count"],
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  componentDidUpdate(prevprops, prevstate) {
    if (this.state.page !== prevstate.page) {
      axios
        .get(
          `${API_URL}/products?_expand=category&_page=${this.state.page}&_limit=${this.state.limit}`
        )
        .then((res) => {
          this.setState({
            data: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  renderPaging = () => {
    let { limit, totaldata, page } = this.state;
    let berapaPaging = Math.ceil(totaldata / limit);
    console.log(berapaPaging)
    let paging = [];
    for (let i = 0; i < berapaPaging; i++) {
      if (i + 1 === page) {
        paging.push(
          <PaginationItem active className="mb-5 mr-1 ml-1">
            <button
              className="btn d-flex justify-content-center align-items-center"
              style={{
                width: '27px',
                height: '27px',
                backgroundColor: 'rgb(50, 50, 50)',
                borderRadius: '50%',
                fontSize: '13px',
                color: 'white',
              }}
            >{i + 1}</button>
          </PaginationItem>
        );
      } else {
        paging.push(
          <PaginationItem onClick={() => this.setState({ page: (i + 1) })} className="mb-5 ml-1 mr-1">
            <button
              className="btn"
              style={{
                borderRadius: '50%',
                fontSize: '13px',
                fontWeight: '600'
              }}
            >{i + 1}</button>
          </PaginationItem>
        );
      }
    }
    return paging;
  };

  renderProducts = () => {
    return this.state.data.map((val, index) => {
      return (
        <div key={index} className="col-md-2 p-2">
          <Link to={{ pathname: `/product/${val.id}`, state: { product: val } }} style={{ textDecoration: 'none', color: 'black' }}>
            <Card style={{ borderRadius: "10px", border: 'none' }} className="shadow">
              <CardImg
                width="250px"
                height="200px"
                src={val.foto}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle tag="p" style={{ fontSize: "13px", marginBottom: "25px" }}>{val.nama}</CardTitle>
                <CardSubtitle tag="p" style={{ fontSize: "14px", color: "rgb(50, 50, 50)", fontWeight: "700" }} className="mb-2">
                  {currencyFormatter(val.harga)}
                </CardSubtitle>
              </CardBody>
            </Card>
          </Link>

        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <Header />
        <ControlledCarousel />
        <div
          className="row"
          style={{ margin: '60px' }}
        > {this.renderProducts()}
        </div>
        <div className="d-flex justify-content-center">
          <Pagination>{this.renderPaging()}</Pagination>
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
export default connect(MaptstatetoProps)(User_Home);