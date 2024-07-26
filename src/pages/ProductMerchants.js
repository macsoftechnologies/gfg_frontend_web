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
    if(!localStorage.getItem("token")) {
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
              <li>
                <Link to={'/'}>Home</Link>
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
              <li>Product Details</li>
            </ul>
          </div>
        </div>
        <main id="MainContent" className="content-for-layout">
          <div className="product-page mt-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-12 locationText">
                  <span className="locationTextSpan">Location</span> : {`${localStorage.getItem("Address")}`}
                </div>
                <div className="col-lg-4 col-md-10 col-10 mapselector" onClick={toggleModal}>
                  <p className="mapText">Change Location Here</p>
                  <i
                    className="fa fa-map-marker mappointer"
                    // aria-hidden="true"
                    // data-bs-toggle="modal"
                    // data-bs-target="#changeLocationModal"
                  ></i>
                </div>
                {isMerchant && (
                  <div className="col-lg-2 col-md-2 col-2">
                    <Link to={'/merchantproducts'}><button className="btn btn-primary">My Products</button></Link>
                  </div>
                )}
                <div className="col-lg-12 col-md-12 col-12 mt-5">
                  <div className="container">
                    <h3>List of Products</h3>
                    <div className="row mt-3">
                      <table className="table table-striped merchantProdsTable">
                        <thead>
                          <tr>
                            <th className="merchantsTableheading" scope="col">
                              S.No
                            </th>
                            <th className="merchantsTableheading" scope="col">
                              Product Name
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
                              Product Image
                            </th>
                            <th className="merchantsTableheading" scope="col">
                              Product Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredMerchants  &&
                            filteredMerchants.map((product, index) => (
                              <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>{product.adminProductId[0].productName}</td>
                                <td>{product.userId[0].userName}</td>
                                <td>{product.userId[0].mobileNumber}</td>
                                <td>{product.userId[0].address}</td>
                                <td>
                                  <img
                                    src={`https://gfg.org.in/${product.adminProductId[0].productImage}`}
                                    alt={product.userId[0].shopImage}
                                    width="150"
                                  />
                                </td>
                                <td>
                                  <i className="fa fa-inr" aria-hidden="true"></i>
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
                ></button>
              </div>
              <div className="modal-body">
                <MapComponent
                  initialPosition={[parseFloat(localStorage.getItem("latitude")), parseFloat(localStorage.getItem("longitude"))]}
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
                  initialPosition={[parseFloat(localStorage.getItem("latitude")), parseFloat(localStorage.getItem("longitude"))]}
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
