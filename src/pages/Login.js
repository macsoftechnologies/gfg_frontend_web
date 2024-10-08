import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../services/service";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
  const [data, setData] = useState({
    mobileNumber: "",
    otp: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await loginUser(data);
        console.log("response", response);
        if((response) && ((response.data.statusCode === 200) || (response.data.statusCode === 201))) {
            console.log("loginresponse",response)
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userData", JSON.stringify(response.data.data));
            toast.success(`User Login Successfully`, {
                onClose: () => navigate('/')
              });
        } else {
            toast.error(`Error: Login failed`);
        }
    } catch(error) {
        console.log("error", error);
        toast.error("Error: Login Failed");
    }
  }

  const handleSearch = () => {
    return null;
  }

  return (
    <div>
      <Header onSearch={handleSearch} />
      {/* <!-- breadcrumb start --> */}
      <div className="breadcrumb">
        <div className="container">
          <ul className="list-unstyled d-flex align-items-center m-0">
            <li className="breadcrumb-item">
              <Link to={'/'}>Home</Link>
            </li>
            <li className="breadcrumb-item active">Login</li>
          </ul>
        </div>
      </div>
      {/* <!-- breadcrumb end --> */}

      <main id="MainContent" className="content-for-layout">
        <div className="login-page">
          <div className="container">
            <form className="login-form mx-auto" onSubmit={handleSubmit}>
              <div className="section-header mb-3">
                <h2 className="section-heading customerreghead text-center ">
                  Login
                </h2>
              </div>
              <div className="row">
                <div className="col-12 form-group">
                  <fieldset>
                    <label className="label label-heading mb-3">Mobile Number</label>
                    <input
                      type="text"
                      name="mobileNumber"
                      id="mobileNumber"
                      className="form-control mb-3"
                      value={data.mobileNumber}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>
                <div className="col-12 form-group">
                  <fieldset>
                    <label className="label label-heading mb-3">OTP</label>
                    <input
                      type="password"
                      name="otp"
                      id="otp"
                      className="form-control mb-3"
                      value={data.otp}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>
                <div className="col-12">
                  {/* <a href="#" className="text_14 d-block">
                    Forgot your password?
                  </a> */}
                  <button
                    type="submit"
                    className="btn-primary d-block mt-4 btn-signin"
                  >
                    SIGN IN
                  </button>
                  <Link to={'/registerasmerchant'} className="btn-secondary mt-2 btn-signin">
                    CREATE AN ACCOUNT FOR MERCHANT
                  </Link>
                  <Link to={'/registerascustomer'} className="btn-secondary mt-2 btn-signin">
                    CREATE AN ACCOUNT FOR CUSTOMER
                  </Link>
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

export default Login;
