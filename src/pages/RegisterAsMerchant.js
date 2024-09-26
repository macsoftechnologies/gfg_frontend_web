import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MapComponent from "../components/MapComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addMerchant } from "../services/service";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterAsMerchant.css";

function RegisterAsMerchant() {
  const [profileImage, setProfileImage] = useState(null);
  const [shopImage, setShopImage] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    mobileNumber: "",
    altMobileNumber: "",
    address: "",
    profileImage: null,
    shopName: "",
    shopLocation: "",
    shopImage: null,
    shopLicense: null,
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
  };

  const handlePositionChange = (lat, lng, address) => {
    setData((prevState) => ({
      ...prevState,
      latitude: lat,
      longitude: lng,
      address: address,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await addMerchant(formData);

      if (
        response &&
        (response.data.statusCode === 200 || response.data.statusCode === 201)
      ) {
        toast.success(`${response.data.message}`, {
          onClose: () => navigate("/login"),
        });
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error: Unable to add Merchant");
    }
  };

  const handleSearch = () => {
    return null;
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="breadcrumb">
        <div className="container">
          <ul className="list-unstyled d-flex align-items-center m-0">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={"/login"}>Login</Link>
            </li>
            <li className="breadcrumb-item active">Register As Merchant</li>
          </ul>
        </div>
      </div>

      <main id="MainContent" className="content-for-layout">
        <div className="login-page mt-100">
          <div className="container">
            <form
              action="#"
              className="login-form-register mx-auto"
              onSubmit={handleSubmit}
            >
              <div className="section-header mb-3">
                <h2 className="section-heading customerreghead text-center">
                  Register As Merchant
                </h2>
              </div>
              <div className="row">
                <div className="col-md-6 col-12 form-group">
                  <fieldset>
                    <label className="label label-heading mb-2">
                      User Name
                    </label>
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      className="form-control mb-2"
                      value={data.userName}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>

                <div className="col-md-6 col-12 form-group">
                  <fieldset>
                    <label className="label label-heading mb-2">
                      Shop Name
                    </label>
                    <input
                      type="text"
                      name="shopName"
                      id="shopName"
                      className="form-control mb-2"
                      value={data.shopName}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>

                <div className="col-md-6 col-12 form-group">
                  <fieldset>
                    <label className="label label-heading mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="mobileNumber"
                      id="mobileNumber"
                      className="form-control mb-2"
                      value={data.mobileNumber}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>

                <div className="col-md-6 col-12 form-group">
                  <fieldset>
                    <label className="label label-heading mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="form-control mb-2"
                      value={data.address}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>

                <div className="col-md-6 col-12 form-group">
                  <fieldset>
                    <label className="label label-heading mb-2">
                      Profile Image
                    </label>
                    <input
                      type="file"
                      className="form-control mb-2"
                      onChange={(e) => {
                        handleImageChange(e, setProfileImage, "profileImage");
                      }}
                    />
                  </fieldset>

                  <div className="d-md-none d-block">
                    {profileImage && (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="img-preview mt-2"
                      />
                    )}
                  </div>
                </div>

                <div className="col-md-6 col-12 form-group">
                  <fieldset>
                    <label className="label label-heading mb-2">
                      Shop Image
                    </label>
                    <input
                      type="file"
                      className="form-control mb-2"
                      onChange={(e) => {
                        handleImageChange(e, setShopImage, "shopImage");
                      }}
                    />
                  </fieldset>

                  <div className="d-md-none d-block">
                    {shopImage && (
                      <img
                        src={shopImage}
                        alt="Shop"
                        className="img-preview mt-2"
                      />
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-6 form-group d-md-block d-none">
                  {profileImage && (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="img-preview mt-2"
                    />
                  )}
                </div>
                <div className="col-md-6 col-6 form-group d-md-block d-none">
                  {shopImage && (
                    <img
                      src={shopImage}
                      alt="Shop"
                      className="img-preview mt-2"
                    />
                  )}
                </div>
                <MapComponent
                  initialPosition={[data.latitude, data.longitude]}
                  onPositionChange={handlePositionChange}
                  apiKey="AIzaSyCiUU7Q5X1hTMRAJr0YJZPOxw40FfZcZp0"
                />
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

export default RegisterAsMerchant;
