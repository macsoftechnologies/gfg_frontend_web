import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./ProductMerchants.css";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAdminProdById, getProductMerchants } from "../services/service";
import MapComponent from "../components/MapComponent";
import $ from "jquery";
import { Modal } from "reactstrap";

function ProductMerchants() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [merchants, setMerchants] = useState([]);
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const isMerchant = userData.role.includes("merchant");
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isOpen);
  };

  const getMerchants = async () => {
    try {
      const apiData = {
        categoryId: categoryId,
        latitude: localStorage.getItem("latitude"),
        longitude: localStorage.getItem("longitude"),
      };
      const response = await getProductMerchants(apiData);
      console.log("MerchantsResponse", response);
      if (response.statusCode === 200 || response.statusCode === 201) {
        setMerchants(response.data);
        setFilteredMerchants(response.data);
        setLoading(false);
      } else {
        setMerchants([]);
        setFilteredMerchants([]);
        setLoading(false);
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      toast.error("Error: Unable to fetch merchants of product");
    }
  };

  const handlePositionChange = (lat, lng, address) => {
    localStorage.setItem("longitude", lng);
    localStorage.setItem("latitude", lat);
    localStorage.setItem("Address", address);
  };

  const modalSubmit = () => {
    toggleModal();
    getMerchants();
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    getMerchants();
  }, []);

  useEffect(() => {
    const filtered = merchants.filter((merchant) =>
      merchant.adminProductId[0].productName
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setFilteredMerchants(filtered);
  }, [searchText, merchants]);

  const handleSearch = (text) => {
    setSearchText(text);
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
      <section>
        <div className="breadcrumb">
          <div className="container">
            <ul className="list-unstyled d-flex align-items-center m-0">
              <li className="breadcrumb-item">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="breadcrumb-item active">Product Details</li>
            </ul>
          </div>
        </div>
        <main id="MainContent" className="content-for-layout">
          <div className="product-page mt-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12 locationText">
                  <span className="locationTextSpan">Location</span> :{" "}
                  {`${localStorage.getItem("Address")}`}
                </div>
                <div
                  className="col-lg-4 col-md-4 col-6 mapselector location-mar"
                  onClick={toggleModal}
                >
                  <p className="mapText">Change Location Here</p>
                  <i
                    className="fa fa-map-marker mappointer"
                    // aria-hidden="true"
                    // data-bs-toggle="modal"
                    // data-bs-target="#changeLocationModal"
                  ></i>
                </div>
                {isMerchant && (
                  <div className="col-lg-2 col-md-2 col-6 location-mar">
                    <Link to={"/merchantproducts"}>
                      <button className="btn btn-primary myProductsClass">
                        My Products
                      </button>
                    </Link>
                  </div>
                )}
                <div className="col-lg-12 col-md-12 col-12">
                  <div className="container">
                    <div className="row">
                      <h2 className="primary-color productMerchantHeading">
                        List of <span>Products</span>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-12 d-md-block d-none">
                  <div className="container">
                    <div className="row mt-5">
                      <table className="table table-striped merchantProdsTable ">
                        <thead>
                          <tr>
                            <th className="merchantsTableheading" scope="col">
                              S.No
                            </th>
                            <th className="merchantsTableheading" scope="col">
                              Product Name
                            </th>
                            <th className="merchantsTableheading" scope="col">
                              Product Image
                            </th>
                            <th className="merchantsTableheading" scope="col">
                              Product Specifications
                            </th>
                            <th className="merchantsTableheading" scope="col">
                              Merchant Name
                            </th>
                            <th className="merchantsTableheading" scope="col">
                              Contact Number
                            </th>
                            <th className="merchantsTableheading" scope="col">
                              Address
                            </th>
                            <th className="merchantsTableheading" scope="col">
                              Product Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredMerchants &&
                            filteredMerchants.map((product, index) => (
                              <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>{product.adminProductId[0].productName}</td>
                                <td>
                                  <img
                                    src={`https://api.gfg.org.in/${product.adminProductId[0].productImage}`}
                                    alt={product.userId[0].shopImage}
                                    width="150"
                                  />
                                </td>
                                <td>
                                  <ul>
                                    {product?.adminProductId[0]
                                      ?.productSpecifications &&
                                      Object.entries(
                                        product?.adminProductId[0]
                                          ?.productSpecifications
                                      ).map((specification, index) => (
                                        <li className="productSpecificationLi">
                                          <strong>{specification[0]}:</strong>{" "}
                                          {specification[1]}
                                        </li>
                                      ))}
                                  </ul>
                                </td>
                                <td>{product.userId[0].userName}</td>
                                <td>{product.userId[0].mobileNumber}</td>
                                <td className="merchantAddress">
                                  {product.userId[0].address}
                                </td>
                                <td>
                                  <i
                                    className="fa fa-inr"
                                    aria-hidden="true"
                                  ></i>
                                  <span className="productPrice">
                                    {product.price}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* mobileresponsive accordian */}
                <div class="d-md-none d-block mt-3">
                  {filteredMerchants &&
                    filteredMerchants.map((product, index) => (
                      <div
                        class="accordion mb-2"
                        id={`accordionExample-${index}`}
                        key={index}
                      >
                        <div class="accordion-item">
                          <h2 class="accordion-header product_accordian_header" id={`heading-${index}`}>
                            <button
                              class="accordion-button collapsed product_accordian"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse-${index}`}
                              aria-expanded="true"
                              aria-controls={`collapse-${index}`}
                            >
                              <div>
                                <img
                                  className="product_accord_image"
                                  src={`https://api.gfg.org.in/${product.adminProductId[0].productImage}`}
                                  alt={product.userId[0].shopImage}
                                />
                              </div>
                              <div>{product.adminProductId[0].productName}</div>
                              <div>
                                <i className="fa fa-inr" aria-hidden="true"></i>
                                <span className="productPrice">
                                  {product.price}
                                </span>
                              </div>
                            </button>
                          </h2>
                          <div
                            id={`collapse-${index}`}
                            class="accordion-collapse collapse"
                            data-bs-parent={`#accordionExample-${index}`}
                          >
                            <div class="accordion-body productmerchantaccordbody">
                              <div className="d-flex">
                                <label>Product Specifications </label>
                                <ul className="productmerchantaccordul">
                                    {product?.adminProductId[0]
                                      ?.productSpecifications &&
                                      Object.entries(
                                        product?.adminProductId[0]
                                          ?.productSpecifications
                                      ).map((specification, index) => (
                                        <li className="productSpecificationLi">
                                          <strong>{specification[0]}:</strong>{" "}
                                          {specification[1]}
                                        </li>
                                      ))}
                                  </ul>
                              </div>
                              <div className="d-flex">
                                <label>Merchant Name </label>
                                <p>{product.userId[0].userName}</p>
                              </div>
                              <div className="d-flex">
                                <label>Contact Number </label>
                                <p>{product.userId[0].mobileNumber}</p>
                              </div>
                              <div className="d-flex">
                                <label>Address </label>
                                <p>{product.userId[0].address}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Modal isOpen={isOpen} toggle={toggleModal}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="changeLocationModalLabel">
                Change Location
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="locationModalButton"
                onClick={toggleModal}
              ></button>
            </div>
            <div className="modal-body">
              <MapComponent
                initialPosition={[
                  parseFloat(localStorage.getItem("latitude")),
                  parseFloat(localStorage.getItem("longitude")),
                ]}
                onPositionChange={handlePositionChange}
                apiKey="AIzaSyCiUU7Q5X1hTMRAJr0YJZPOxw40FfZcZp0"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={toggleModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={modalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
        <div
          className="modal fade"
          id="changeLocationModal"
          tabIndex="-1"
          aria-labelledby="changeLocationModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="changeLocationModalLabel">
                  Change Location
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="locationModalButton"
                ></button>
              </div>
              <div className="modal-body">
                <MapComponent
                  initialPosition={[
                    parseFloat(localStorage.getItem("latitude")),
                    parseFloat(localStorage.getItem("longitude")),
                  ]}
                  onPositionChange={handlePositionChange}
                  apiKey="AIzaSyCiUU7Q5X1hTMRAJr0YJZPOxw40FfZcZp0"
                />
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
                  onClick={modalSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default ProductMerchants;
