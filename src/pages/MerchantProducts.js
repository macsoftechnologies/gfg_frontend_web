import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addMerchantProduct,
  adminProducts,
  editMerchantProduct,
  getMerchantProdById,
  getMerchantProductList,
  removeMerchantProduct,
} from "../services/service";
import $ from "jquery";
import "./MerchantProducts.css";
import { json, Link, useNavigate } from "react-router-dom";

function MerchantProducts() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [merchantProducts, setMerchantProducts] = useState([]);
  const [productIdToEdit, setProductIdToEdit] = useState();
  const [productIdToDelete, setProductIdToDelete] = useState();
  const [editingProduct, setEditingProduct] = useState();
  const [data, setData] = useState({
    _id: "",
    price: "",
  });
  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [addData, setAddData] = useState({
    adminProductId: "",
    userId: "",
    price: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredMerchantProducts, setFilteredMerchantProducts] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const getAdminProducts = async () => {
    try {
      const productsData = await adminProducts();
      console.log("productsData", productsData);
      setProductsData(productsData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const merchantProductsList = async () => {
    try {
      const responseBody = {
        userId: userData.userId,
      };
      const response = await getMerchantProductList(responseBody);
      if (
        (response && response.statusCode === 200) ||
        response.statusCode === 201
      ) {
        console.log("response", response);
        setMerchantProducts(response.data);
        setFilteredMerchantProducts(response.data);
        setLoading(false);
        console.log("merchantproducts", merchantProducts);
      } else {
        toast.error(`Error: ${response.message}`);
        setFilteredMerchantProducts([]);
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      toast.error("Error: unable to find products.");
    }
  };

  const getMerchantProductById = async (_id) => {
    try {
      console.log("productId", _id);
      const response = await getMerchantProdById({ _id: _id });
      console.log("getdetailsresponse", response);
      console.log(
        "getdetailsadminprod",
        response?.data[0]?.adminProductId[0]?.productName
      );
      if (
        (response && response.statusCode === 200) ||
        response.statusCode === 201
      ) {
        setEditingProduct(response.data[0]);
        setData({
          ...data,
          _id: response.data[0]._id,
          price: response.data[0].price,
        });
      } else {
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Error: Unable to get details of product");
    }
    console.log("editingProduct", editingProduct);
  };

  useEffect(() => {
    merchantProductsList();
    if (!userData) {
      navigate("/login");
    } else {
      getAdminProducts();
      merchantProductsList();
    }
  }, []);

  useEffect(() => {
    const filtered = merchantProducts.filter((merchant) =>
      merchant?.adminProductId[0]?.productName
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setFilteredMerchantProducts(filtered);
  }, [searchText, merchantProducts]);

  const deleteMerchantProd = async () => {
    try {
      const response = await removeMerchantProduct({ _id: productIdToDelete });
      if (
        (response && response.statusCode === 200) ||
        response.statusCode === 201
      ) {
        toast.success(`Success: ${response.message}`, {
          onClose: () => {
            $("#deleteProductModal").hide();
            window.location.reload();
          },
        });
      } else {
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Error: Unbale to delete Product");
    }
  };

  const handleEditClick = (productId) => {
    setProductIdToEdit(productId);
  };

  const handleDeleteClick = (productId) => {
    setProductIdToDelete(productId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(() => ({
      ...data,
      price: value,
    }));
    setAddData(() => ({
      ...addData,
      adminProductId: selectedProduct.adminProductId,
      userId: userData.userId,
      price: value,
    }));
  };

  const editmerchantprod = async () => {
    try {
      const response = await editMerchantProduct(data);
      if (
        (response && response.statusCode === 200) ||
        response.statusCode === 201
      ) {
        toast.success(`Success: ${response.message}`, {
          onClose: () => {
            $("#deleteProductModal").hide();
            window.location.reload();
          },
        });
      } else {
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Error: Unable to edit Merchant Product");
    }
  };

  const adminProductSelection = (product) => {
    console.log("product", product);
    setSelectedProduct(product);
    $('#collapseExample').hide();
  };

  const showCollapse = () => {
    $('#collapseExample').show();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addMerchantProduct(addData);
      console.log("response", response);
      if (
        (response && response.statusCode === 200) ||
        response.statusCode === 201
      ) {
        toast.success(`Success: ${response.message}`, {
          onClose: () => {
            $("#addProductModal").hide();
            window.location.reload();
            setSelectedProduct({});
            setData({
              adminProductId: "",
              userId: "",
              price: "",
            });
          },
        });
      } else {
        setSelectedProduct({});
        setAddData({
          ...addData,
          adminProductId: "",
          userId: "",
          price: ""
        })
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Error: Unable to add product");
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* <AnnouncementBar /> */}
      <Header onSearch={handleSearch} />

      {/* <!-- breadcrumb start --> */}
      <div className="breadcrumb">
        <div className="container merchantprodsBreadcrumb">
          <ul className="list-unstyled d-flex align-items-center m-0">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <svg
                className="icon icon-breadcrumb"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.4">
                  <path
                    d="M25.9375 8.5625L23.0625 11.4375L43.625 32L23.0625 52.5625L25.9375 55.4375L47.9375 33.4375L49.3125 32L47.9375 30.5625L25.9375 8.5625Z"
                    fill="#000"
                  />
                </g>
              </svg>
            </li>
            <li>Merchant Products</li>
          </ul>

          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#addProductModal"
          >
            Add Product
          </button>
        </div>
      </div>
      {/* <!-- breadcrumb end --> */}

      <div className="container">
        <h5 className="m-5">List of Merchant Products</h5>
        <table className="table table-striped merchantProdsTable">
          <thead>
            <tr>
              <th className="merchantsTableheading" scope="col">
                S.No
              </th>
              <th className="merchantsTableheading" scope="col">
                Product Name
              </th>
              {/* <th className="merchantsTableheading" scope="col">Category Name</th> */}
              <th className="merchantsTableheading" scope="col">
                Product Image
              </th>
              <th className="merchantsTableheading" scope="col">
                Product Specifications
              </th>
              <th className="merchantsTableheading" scope="col">
                Price
              </th>
              <th className="merchantsTableheading" scope="col">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredMerchantProducts &&
              filteredMerchantProducts.map((product, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{product?.adminProductId[0]?.productName}</td>
                  {/* <td>{product.adminProductId[0]?.categoryId[0]?.categoryName}</td> */}
                  <td>
                    <img
                      src={`https://gfg.org.in/${product?.adminProductId[0]?.productImage}`}
                      alt={product?.adminProductId[0]?.productName}
                      width="150"
                    />
                  </td>
                  <td>
                    <ul>
                      {product?.adminProductId[0]?.productSpecifications &&
                        Object.entries(
                          product?.adminProductId[0]?.productSpecifications
                        ).map((specification, index) => (
                          <li className="productSpecificationLi">
                            <strong>{specification[0]}:</strong>{" "}
                            {specification[1]}
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td>
                    <i className="fa fa-inr" aria-hidden="true"></i>
                    {product?.price}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary merchantprodedit"
                      onClick={() => {
                        handleEditClick(product?._id);
                        getMerchantProductById(product?._id);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#editProductModal"
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger merchantproddelete"
                      onClick={() => {
                        handleDeleteClick(product?._id);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#deleteProductModal"
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* edit product modal */}
      <div
        className="modal fade"
        id="editProductModal"
        tabIndex="-1"
        aria-labelledby="editProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editProductModalLabel">
                Edit Merchant Product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {editingProduct && (
                <div>
                  <div className="row">
                    <div className="col-md-6 col-6 mt-3"><label><b>Name :</b></label></div>
                    <div className="col-md-6 col-6 mt-3"><p>{editingProduct?.adminProductId[0]?.productName}</p></div>
                    <div className="col-md-6 col-6 mt-3"><b>Product Image <span>:</span></b></div>
                    <div className="col-md-6 col-6 mt-3"><img
                      src={`https://gfg.org.in/${editingProduct?.adminProductId[0]?.productImage}`}
                      alt={editingProduct?.adminProductId[0]?.productName}
                      width="150"
                    /></div>

                    <div className="col-md-6 col-6 mt-3"><b>Product Specifications <span>:</span></b></div>
                    <div className="col-md-6 col-6 mt-3">
                      <ul>
                        {editingProduct?.adminProductId[0]?.productSpecifications &&
                          Object.entries(
                            editingProduct?.adminProductId[0]?.productSpecifications
                          ).map((specification, index) => (
                            <li className="productSpecificationLiEdit">
                              <strong className="productEditSpecul">
                                {specification[0]}:
                              </strong>{" "}
                              {specification[1]}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-md-6 col-6 mt-3"><b>Product Price :</b></div>
                <div className="col-md-6 col-6 mt-3 price-edit">
                  <i className="fa fa-inr" aria-hidden="true"></i>
                  <input
                    type="text"
                    placeholder="please enter price"
                    className="editPriceInput"
                    id="price"
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={editmerchantprod}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* delete product modal */}
      <div
        className="modal fade"
        id="deleteProductModal"
        tabIndex="-1"
        aria-labelledby="deleteProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteProductModalLabel">
                Delete Merchant Product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure to delete this product?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={deleteMerchantProd}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* addmerchantproduct modal */}
      <div
        className="modal fade"
        id="addProductModal"
        tabIndex="-1"
        aria-labelledby="addProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addProductModalLabel">
                Add Product for Sale
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="dropdown-center mb-2">
                <p class="d-inline-flex gap-1">
                  <a
                    class="btn btn-primary"
                    data-bs-toggle="collapse"
                    href="#collapseExample"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    onClick={() => showCollapse()}
                  >
                    Select Product
                  </a>
                </p>
                <div class="collapse" id="collapseExample">
                  <div class="card card-body">
                    <table className="table table-dark">
                      <thead>
                        <tr>
                          <td>ProductName</td>
                          <td>ProductImage</td>
                          <td>Action</td>
                        </tr>
                      </thead>
                      <tbody>
                        {productsData &&
                          productsData.map((product) => (
                            <tr>
                              <td>{product.productName}</td>
                              <td>
                                <img
                                  src={`https://gfg.org.in/${product.productImage}`}
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => adminProductSelection(product)}
                                >
                                  Select
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-6 mt-3">
                  <label
                    for="productFormInput1"
                    className="form-label productFormInput1"
                  >
                    <b> Selected Product Image :</b>
                  </label>
                </div>
                <div className="col-md-6 col-6 mt-3">
                  <img
                    style={{ width: "150px", height: "150px" }}
                    className="selectedImage"
                    src={`https://gfg.org.in/${selectedProduct.productImage}`}
                  />
                </div>
                <div className="col-md-6 col-7 mt-3">
                  <b>  <label
                    for="productFormInput1"
                    className="form-label productFormInput1"
                  >
                    Selcted Product Name :
                  </label></b>
                </div>
                <div className="col-md-6 col-5 mt-3">
                  <p className="mb-0">{selectedProduct.productName}</p>
                </div>
                <div className="col-md-6 col-6 mt-3">
                  <label><b>ProductSpecifications :</b></label>
                </div>
                <div className="col-md-6 col-6 mt-3">
                  <ul>
                    {selectedProduct.productSpecifications &&
                      Object.entries(selectedProduct.productSpecifications).map(
                        (specification, index) => (
                          <li>
                            <strong>{specification[0]}:</strong>{" "}
                            {specification[1]}
                          </li>
                        )
                      )}
                  </ul>
                </div>
                <div className="col-md-6 col-6 mt-3"><b><label for="price" className="form-label productFormInput1">
                  Price :
                </label></b></div>
                <div className="col-md-6 form-group price-edit col-6 mt-3">
                  <i className="fa fa-inr " aria-hidden="true"></i>
                  <input
                    type="text"
                    className="productpriceInput form-control"
                    id="price"
                    name="price"
                    placeholder="enter your product price"
                    value={addData.price}
                    onChange={handleChange}
                    
                  />
                </div>

              </div>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default MerchantProducts;
