import React, { Component } from "react";
import { API_URL } from "../helper/API";
import { currencyFormatter } from "../helper/currency";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { connect } from "react-redux";
import {
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Button as ButtonStrap,
  Pagination,
  PaginationItem,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import Header from "../component/Header";
import Button from "../component/Button";
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./style/Admin_ManageProduct.css";
const Myswal = withReactContent(Swal);

class Admin_ManageProduct extends Component {
  state = {
    products: [],
    AddData: {
      date: "",
      nama: "",
      serial: "",
      stock: "",
      price: "",
      status: "",
      categoryId: 0,
    },
    editData: {
      date: "",
      nama: "",
      serial: "",
      stock: "",
      price: "",
      status: "",
      categoryId: 0,
    },
    categories: [],
    modalAdd: false,
    modalEdit: false,
    idProduct: 0,
    page: 1,
    totaldata: 0,
    limit: 6,
    isLoading: true,
    searchInput: "",
  };

  componentDidMount() {
    axios
      .get(
        `${API_URL}/products?_expand=category&_page=${this.state.page}&_limit=6`
      )
      .then((res) => {
        axios
          .get(`${API_URL}/categories`)
          .then((res1) => {
            this.setState({
              products: res.data,
              categories: res1.data,
              totaldata: res.headers["x-total-count"],
            });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidUpdate(prevprops, prevstate) {
    if (this.state.page !== prevstate.page) {
      axios
        .get(
          `${API_URL}/products?_expand=category&_page=${this.state.page}&_limit=6`
        )
        .then((res) => {
          this.setState({
            products: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  renderProducts = () => {
    if (this.state.products.length === 0) {
      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "63vh",
            width: "243%",
            backgroundColor: "lightgray",
          }}
        >
          <h1>Data Tidak Ditemukan</h1>
        </div>
      );
    }
    return this.state.products.map((val, index) => {
      let x = 6 * (this.state.page - 1);
      return (
        <tr key={val.id} style={{ fontWeight: "500", fontSize: "13px" }}>
          <td
            width="20px"
            style={{ verticalAlign: "middle", textAlign: "center" }}
          >
            {x + index + 1}
          </td>
          <td width="50px" style={{ verticalAlign: "middle" }}>
            {val.nama}
          </td>
          <td
            width="30px"
            style={{ verticalAlign: "middle", textAlign: "center" }}
          >
            {Date.now()}
          </td>
          <td
            width="100px"
            style={{ verticalAlign: "middle", textAlign: "center" }}
          >
            {val.serial}
          </td>
          <td
            width="100px"
            style={{ verticalAlign: "middle", textAlign: "center" }}
          >
            {currencyFormatter(val.price)}
          </td>
          <td width="250px" style={{ verticalAlign: "middle" }}>
            {val.stock}
          </td>
          <td
            width="120px"
            style={{ verticalAlign: "middle", textAlign: "center" }}
          >
            {val.category.nama}
          </td>
          <td
            width="100px"
            style={{ verticalAlign: "middle", textAlign: "center" }}
          >
            <span
              onClick={() => this.onEditClick(index)}
              className="mr-4"
              style={{ fontSize: "17px", color: "grey", cursor: "pointer" }}
            >
              <FiEdit />
            </span>
            <span
              onClick={() => this.OnDeleteClick(index)}
              className="mx-2"
              style={{ fontSize: "18px", color: "grey" }}
            >
              <FiTrash2 />
            </span>
          </td>
        </tr>
      );
    });
  };

  renderCategories = () => {
    return this.state.categories.map((val, index) => {
      return (
        <option value={val.id} key={index}>
          {val.nama}
        </option>
      );
    });
  };

  renderPaging = () => {
    let { limit, totaldata, page } = this.state;
    let berapaPaging = Math.ceil(totaldata / limit);
    let paging = [];
    for (let i = 0; i < berapaPaging; i++) {
      if (i + 1 === page) {
        paging.push(
          <PaginationItem active className="mb-5 mt-5 mr-1 ml-1">
            <button
              className="btn d-flex justify-content-center align-items-center"
              style={{
                width: "27px",
                height: "27px",
                backgroundColor: "rgb(50, 50, 50)",
                borderRadius: "50%",
                fontSize: "13px",
                color: "white",
              }}
            >
              {i + 1}
            </button>
          </PaginationItem>
        );
      } else {
        paging.push(
          <PaginationItem
            onClick={() => this.setState({ page: i + 1 })}
            className="mb-5 mt-5 ml-1 mr-1"
          >
            <button
              className="btn"
              style={{
                borderRadius: "50%",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              {i + 1}
            </button>
          </PaginationItem>
        );
      }
    }
    return paging;
  };

  toggle = () => {
    this.setState({ modalAdd: !this.state.modalAdd });
  };

  toggleEdit = () => {
    this.setState({ modalEdit: !this.state.modalEdit });
  };

  onAddDataChange = (e) => {
    let AddDatamute = this.state.AddData;
    AddDatamute[e.target.name] = e.target.value;
    this.setState({ AddData: AddDatamute });
  };

  onAddDataClick = () => {
    const {
      date,
      nama,
      serial,
      stock,
      category,
      price,
      status,
      categoryId,
    } = this.state.AddData;
    var dataPost = this.state.AddData;
    if (
      date &&
      nama &&
      serial &&
      stock &&
      category &&
      price &&
      status &&
      categoryId
    ) {
      axios
        .post(`${API_URL}/products`, dataPost)
        .then((res1) => {
          axios
            .get(
              `${API_URL}/products?_expand=category&_page=${this.state.page}&_limit=6`
            )
            .then((res) => {
              var obj = {
                date: "",
                nama: "",
                serial: "",
                stock: "",
                category: "",
                price: "",
                status: "",
                categoryId: 0,
              };
              this.setState({
                products: res.data,
                modalAdd: false,
                AddData: obj,
              });
              swal({
                title: "Produk berhasil ditambahkan",
                icon: "success",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      swal({
        title: "Data harus terisi",
        icon: "warning",
      });
    }
  };

  onEditChange = (e) => {
    let editData = this.state.editData;
    editData[e.target.name] = e.target.value;
    this.setState({ editData: editData });
  };

  onEditClick = (index) => {
    let editData = this.state.editData;
    let products = this.state.products;
    let idProduct = this.state.products[index].id;
    editData = {
      ...editData,
      date: products[index].date,
      nama: products[index].nama,
      serial: products[index].serial,
      stock: products[index].stock,
      category: products[index].category,
      price: products[index].price,
      categoryId: products[index].categoryId,
    };
    this.setState({ idProduct, editData, modalEdit: true });
  };

  onSaveEditClick = () => {
    const {
      date,
      nama,
      serial,
      stock,
      category,
      price,
      status,
      categoryId,
    } = this.state.editData;
    let dataEdit = this.state.editData;
    if (
      date &&
      nama &&
      serial &&
      stock &&
      category &&
      price &&
      status &&
      categoryId
    ) {
      axios
        .put(`${API_URL}/products/${this.state.idProduct}`, dataEdit)
        .then((res) => {
          axios
            .get(
              `${API_URL}/products?_expand=category&_page=${this.state.page}&_limit=6`
            )
            .then((res1) => {
              this.setState({
                products: res1.data,
                modalEdit: false,
              });
              swal({
                title: "Berhasil",
                icon: "success",
              });
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      swal({
        title: "Data harus terisi",
        icon: "warning",
      });
    }
  };

  OnDeleteClick = (index) => {
    let id = this.state.products[index].id;
    let namaProd = this.state.products[index].nama;
    Myswal.fire({
      title: `Anda yakin akan menghapus ${namaProd} ?`,
      text: "Data akan terhapus secara permanen",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_URL}/products/${id}`)
          .then(() => {
            axios
              .get(
                `${API_URL}/products?_expand=category&_page=${this.state.page}&_limit=6`
              )
              .then((res) => {
                this.setState({
                  products: res.data,
                });
                Myswal.fire(
                  "Terhapus!",
                  `${namaProd} telah terhapus`,
                  "success"
                );
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  onSearchChange = (e) => {
    this.setState({ searchInput: e.target.value });
    axios
      .get(
        `${API_URL}/products?_expand=category&_page=1&_limit=6&nama_like=${e.target.value}`
      )
      .then((res) => {
        this.setState({
          products: res.data,
          totaldata: res.headers["x-total-count"],
          page: 1,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Modal size="md" isOpen={this.state.modalAdd} toggle={this.toggle}>
          <ModalHeader className="warna" toggle={this.toggle}>
            Create Product
          </ModalHeader>
          <ModalBody>
            <input
              className="form-control my-1"
              type="text"
              name="nama"
              placeholder="Nama Product"
              value={this.state.AddData.nama}
              onChange={this.onAddDataChange}
            />
            <input
              className="form-control my-1"
              type="text"
              name="date"
              placeholder="tanggal"
              value={this.state.AddData.date}
              onChange={this.onAddDataChange}
            />
            <input
              className="form-control my-1"
              type="number"
              name="serial"
              placeholder="serial number"
              value={this.state.AddData.serial}
              onChange={this.onAddDataChange}
            />
            <input
              className="form-control my-1"
              type="number"
              name="stock"
              placeholder="stock"
              value={this.state.AddData.stock}
              onChange={this.onAddDataChange}
            />
            <input
              className="form-control my-1"
              type="text"
              name="category"
              placeholder="category"
              value={this.state.AddData.category}
              onChange={this.onAddDataChange}
            />
            <InputGroup>
              <ButtonStrap color="light">Rp.</ButtonStrap>
              <input
                className="form-control my-1"
                type="number"
                name="price"
                placeholder="price"
                value={this.state.AddData.price}
                onChange={this.onAddDataChange}
              />
              <input
                className="form-control my-1"
                type="status"
                name="status"
                placeholder="statusr"
                value={this.state.AddData.status}
                onChange={this.onAddDataChange}
              />
            </InputGroup>
            <select
              className="form-control my-1"
              name="categoryId"
              value={this.state.AddData.categoryId}
              onChange={this.onAddDataChange}
            >
              <option value="0" selected hidden>
                Pilih kategori
              </option>
              {this.renderCategories()}
            </select>
            <textarea
              className="form-control my-1"
              name="caption"
              placeholder="deskripsi"
              value={this.state.AddData.caption}
              cols="30"
              rows="3"
              onChange={this.onAddDataChange}
            ></textarea>
          </ModalBody>
          <ModalFooter className="pr-2">
            <Button
              className="px-4 py-2 tombol-add2"
              onClick={this.onAddDataClick}
            >
              Add
            </Button>
          </ModalFooter>
        </Modal>
        <Modal size="md" isOpen={this.state.modalEdit} toggle={this.toggleEdit}>
          <ModalHeader className="warna" toggle={this.toggleEdit}>
            Edit Data
          </ModalHeader>
          <ModalBody>
            <input
              className="form-control my-1"
              type="text"
              name="nama"
              placeholder="Nama Product"
              value={this.state.editData.nama}
              onChange={this.onEditChange}
            />
            <input
              className="form-control my-1"
              type="text"
              name="foto"
              placeholder="Url foto"
              value={this.state.editData.foto}
              onChange={this.onEditChange}
            />
            <input
              className="form-control my-1"
              type="number"
              name="harga"
              placeholder="Harga"
              value={this.state.editData.harga}
              onChange={this.onEditChange}
            />
            <select
              className="form-control my-1"
              name="categoryId"
              value={this.state.editData.categoryId}
              onChange={this.onEditChange}
            >
              {this.renderCategories()}
            </select>
            <textarea
              className="form-control my-1"
              name="caption"
              placeholder="caption"
              value={this.state.editData.caption}
              cols="30"
              rows="3"
              onChange={this.onEditChange}
            ></textarea>
          </ModalBody>
          <ModalFooter>
            <Button className="px-4 py-2" onClick={this.onSaveEditClick}>
              Save Data
            </Button>
          </ModalFooter>
        </Modal>

        <Navbar className="header-bg px-5 py-5" expand="md">
          <NavbarBrand href="/" style={{ color: "rgb(50, 50, 50)" }}>
            {" "}
            Home{" "}
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem></NavItem>
            <NavItem className="py-2 mx-2">
              <Button
                className="px-4 py-2 tombol-add"
                onClick={() => this.setState({ modalAdd: true })}
              >
                Create Product
              </Button>
            </NavItem>
          </Nav>
        </Navbar>

        <div className="mx-5 my-1">
          <div>
            <input
              type="search"
              className="form-control"
              placeholder="Search Product"
              value={this.state.searchInput}
              onChange={this.onSearchChange}
            />
          </div>
          <Table className="mt-3" bordered hover responsive>
            <thead
              style={{
                textAlign: "center",
                backgroundColor: "rgb(250, 250, 250)",
              }}
            >
              <tr style={{ color: "rgb(100, 100, 100)", fontSize: "13px" }}>
                <th>No.</th>
                <th>Nama Product</th>
                <th>Serial</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderProducts()}</tbody>
          </Table>
          <div className="d-flex justify-content-center">
            <Pagination>{this.renderPaging()}</Pagination>
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
export default connect(MaptstatetoProps)(Admin_ManageProduct);
