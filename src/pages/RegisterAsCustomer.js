import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./RegisterAsCustomer.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCustomer } from "../services/service";
import MapComponent from "../components/MapComponent";

function RegisterAsCustomer() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    mobileNumber: "",
    altMobileNumber: "",
    address: "",
    profileImage: null,
    longitude: 0,
    latitude: 0,
  });

  const handleImageChange = (e, setImage, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set image preview
      };
      reader.readAsDataURL(file);

      setData((prevState) => ({
        ...prevState,
        [fieldName]: file, // Update data state with file object
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // setEditUser((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  const handlePositionChange = (lat, lng, address) => {
    setData((prevState) => ({
      ...prevState,
      latitude: lat,
      longitude: lng,
      address: address,
    }));
    // setEditUser((prevState) => ({
    //   ...prevState,
    //   latitude: lat,
    //   longitude: lng,
    //   address: address,
    // }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      console.log("formData", formData);
      const response = await addCustomer(formData);
      console.log("response", response);
      if (response && (response.data.statusCode === 200 || response.data.statusCode === 201)) {
        console.log("message",response.message);
        toast.success(`${response.data.message}`, {
          onClose: () => navigate('/login') // Navigate after toast is closed
        });
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error: Unable to add Customer");
    }
  };

  return (
    <div>
      <Header />
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
            <li>
              <Link to={'/login'}>Login</Link>
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
            <li>Register As Customer</li>
          </ul>
        </div>
      </div>
      {/* <!-- breadcrumb end --> */}

      <main id="MainContent" className="content-for-layout">
        <div className="login-page mt-100">
          <div className="container">
            <form
              action="#"
              className="login-form common-form mx-auto"
              onSubmit={handleSubmit}
            >
              <div className="section-header mb-3">
                <h2 className="section-heading customerreghead text-center">
                  Register As Customer
                </h2>
              </div>
              <div className="row">
                <div className="col-6">
                  <fieldset>
                    <label className="label">User Name</label>
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      value={data.userName}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>
                <div className="col-6">
                  <fieldset>
                    <label className="label">Mobile Number</label>
                    <input
                      type="text"
                      name="mobileNumber"
                      id="mobileNumber"
                      value={data.mobileNumber}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>
                <div className="col-6">
                  <fieldset>
                    <label className="label">Profile Image</label>
                    <input
                      type="file"
                      onChange={(e) => {
                        handleImageChange(e, setProfileImage, "profileImage");
                      }}
                    />
                  </fieldset>
                </div>
                      
                <div className="col-6">
                  {profileImage && (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="img-preview mt-2"
                    />
                  )}
                </div>
                <div className="col-6 mb-4">
                  <fieldset>
                    <label className="label">Address</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={data.address}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>
                <div className="col-md-12">
                  <MapComponent
                    initialPosition={[data.latitude, data.longitude]}
                    onPositionChange={handlePositionChange}
                    apiKey="AIzaSyCiUU7Q5X1hTMRAJr0YJZPOxw40FfZcZp0"
                  />
                </div>
                <div className="col-12 mt-3">
                  <button
                    type="submit"
                    className="btn-primary d-block mt-3 btn-signin"
                  >
                    CREATE
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default RegisterAsCustomer;
