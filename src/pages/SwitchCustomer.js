import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetailsById, switchUser } from "../services/service";
import { toast, ToastContainer } from "react-toastify";
import './SwitchCustomer.css';

function SwitchCustomer() {
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreview1, setImagePreview1] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState({
    mobileNumber: "",
    shopName: "",
    shopImage: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setData((prevState) => ({
        ...prevState,
        [name]: file,
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

  const switchToMerchant = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await switchUser(formData);
      if (
        (response && response.statusCode === 200) ||
        response.statusCode === 201
      ) {
        toast.success(`Success: ${response.message}`);
        navigate('/login')
        localStorage.clear();
      } else {
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      toast.error("Error: Unable to switch as merchant");
    }
  };

  const getUserDetails = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const response = await getUserDetailsById({ _id: userData._id });
      if (
        (response && response.statusCode === 200) ||
        response.statusCode === 201
      ) {
        setData({
          ...data,
          mobileNumber: response.data.mobileNumber,
        });
      } else {
        navigate("/login");
      }
    } catch (error) {
      throw new Error("Unable to fetch user details");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      <Header />
      <section>
        <div className="container">
          <div className="main-body">
            <nav
              aria-label="breadcrumb"
              className="main-breadcrumb breadcrumbright"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={'/'}>Home</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                {/* <span>
                    &nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>
                    &nbsp;
                  </span> */}
                  <Link to={'/profile'}>User Profile</Link>
                </li>
                {/* <span>
                    &nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>
                    &nbsp;
                  </span> */}
                <li className="breadcrumb-item active" aria-current="page">Switch To Merchant</li>
              </ol>
            </nav>
          </div>
        </div>
        <main id="MainContent" className="content-for-layout">
        <div className="login-page mt-100">
          <div className="container">
            <form action="#" className="login-form common-form mx-auto" onSubmit={switchToMerchant}>
              <div className="section-header mb-3">
                <h2 className="section-heading customerreghead text-center">
                  Switch As Merchant
                </h2>
              </div>
              <div className="row">
                  <div className="col-12">
                    <fieldset>
                      <label className="label">Shop Name</label>
                      <input
                        type="text"
                        name="shopName"
                        id="shopName"
                        value={data.shopName}
                        onChange={handleChange}
                      />
                    </fieldset>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-6">
                        <fieldset>
                          <label className="label">Shop Image</label>
                          <input
                            type="file"
                            name="shopImage"
                            onChange={handleFileChange}
                          />
                        </fieldset>
                      </div>
                      <div className="col-6">
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="Shop"
                            className="img-preview mt-2"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 switchLoginTextInfo mt-2">
                    <p className="swichloginPara">* Please login after submitting the shop Details.</p>
                  </div>
                <div className="col-12 mt-3">
                  <button
                    type="submit"
                    className="btn-primary d-block mt-3 btn-signin"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      </section>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default SwitchCustomer;
