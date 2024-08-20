import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { editUser, getUserDetailsById, switchUser } from "../services/service";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import { ToastContainer, toast } from "react-toastify";
import MapComponent from "../components/MapComponent";

function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const [isMerchant, setIsMerchant] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [editData, setEditData] = useState({});

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setEditData((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    }
  };

  const handleFileChange1 = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview1(reader.result);
      };
      reader.readAsDataURL(file);
      setEditData((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    }
  };

  const handleFileChange2 = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview2(reader.result);
      };
      reader.readAsDataURL(file);
      setEditData((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getUserDetails = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const response = await getUserDetailsById({ _id: userData._id });
      if (
        (response && response.statusCode === 200) ||
        response.statusCode === 201
      ) {
        setUserDetails(response.data);
        setEditData(response.data);
        if (response.data.role.includes("merchant")) {
          setIsMerchant(true);
        } else {
          setIsMerchant(false);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      throw new Error("Unable to fetch user details");
    }
  };

  const handlePositionChange = (lat, lng, address) => {
    setEditData((prevState) => ({
      ...prevState,
      latitude: lat,
      longitude: lng,
      address: address,
    }));
  };

  const editSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(editData).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (key !== "password") {
          formData.append(key, value);
        }
      });
      const response = await editUser(formData);
      if (
        (response && response.statusCode === 200) ||
        response.statusCode === 201
      ) {
        toast.success(`Success: ${response.message}`);
        window.location.reload();
      } else {
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      toast.error("Error: Unable to update user");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      getUserDetails();
    }
  }, []);

  const handleSearch = () => {
    return null;
  }

  return (
    <div>
      {/* <AnnouncementBar /> */}
      <Header onSearch={handleSearch} />
      <section>
        <div className="container">
          <div className="main-body mt-3">
            <nav
              aria-label="breadcrumb"
              className="main-breadcrumb breadcrumbright"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/"}>
                    Home
                  </Link>
                </li>
                <li className="" aria-current="page">
                  <span>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;</span>User Profile
                </li>
              </ol>
              <div className="row">
                <div className="col-sm-12">
                  <button
                    className="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#editUserModal"
                  >
                    Edit
                  </button>
                  {!isMerchant && (
                    <button
                      type="button"
                      className="btn btn-info switchButtonClass"
                    >
                      <Link to={"/switchtomerchant"} className="switchAnchorClass">
                        Switch As Merchant
                      </Link>
                    </button>
                  )}
                </div>
              </div>
            </nav>

            <div className="row gutters-sm mt-5">
              <div className="col-md-4">
                <div className="card profileImagesectionclass">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center">
                      <img
                        src={`https://gfg.org.in/${userDetails.profileImage}`}
                        alt="Admin"
                        className="userrounded-circle"
                      />
                      <div className="mt-3">
                        <h4>{userDetails.userName}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card detailsCard">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Name</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {userDetails.userName}
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Mobile</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {userDetails.mobileNumber}
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Location</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {userDetails.address}
                      </div>
                    </div>
                    {isMerchant && (
                      <>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3 ">
                            <h6 className="shopImageTextclass">Shop Image</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {userDetails.shopImage && (
                              <img
                                src={`https://gfg.org.in/${userDetails.shopImage}`}
                                alt="Shop"
                                className="shopImageClass"
                              />
                            )}
                          </div>
                        </div>

                        <hr />

                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Shop Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {userDetails.shopName}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Edit User Modal */}
      <div
        className="modal fade"
        id="editUserModal"
        tabIndex="-1"
        aria-labelledby="editUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editUserModalLabel">
                Edit Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={editSubmit}>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-2 mb-2 labelClass">
                          <div>Name</div>
                          
                        </div>
                        <div className="col-md-10 mb-2">
                          <input
                            type="text"
                            className="form-control"
                            id="editName"
                            name="userName"
                            value={editData.userName || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-2 mb-2 labelClass">
                          <div>Mobile</div>
                          
                        </div>
                        <div className="col-md-10 mb-2">
                          <input
                            type="tel"
                            className="form-control"
                            id="editMobile"
                            name="mobileNumber"
                            value={editData.mobileNumber || ""}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-2 mb-2 labelClass">
                          <div>Profile Image</div>
                          
                        </div>
                        <div className="col-md-5 mb-2 editimageinput">
                          <input
                            type="file"
                            className="form-control"
                            id="editProfileImage"
                            name="profileImage"
                            onChange={handleFileChange}
                          />
                        </div>
                        <div className="col-md-5 mb-3">
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Product Preview"
                              width="100"
                              style={{ marginTop: "10px" }}
                            />
                          ) : (
                            editData.profileImage && (
                              <img
                                src={`https://gfg.org.in/${editData.profileImage}`}
                                alt="Current Product"
                                width="100"
                                style={{ marginTop: "10px" }}
                              />
                            )
                          )}
                        </div>
                        <div className="col-md-2 mb-2 labelClass">
                          <div>Address</div>
                         
                        </div>
                        <div className="col-md-10 mb-2">
                          <input
                            type="text"
                            className="form-control"
                            id="editAddress"
                            name="address"
                            value={editData.address || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        {isMerchant && (
                          <>
                            <div className="col-md-2 mb-2 labelClass">
                              <div>Shop Name</div>
                              
                            </div>
                            <div className="col-md-10 mb-2">
                              <input
                                type="text"
                                className="form-control"
                                id="editShopName"
                                name="shopName"
                                value={editData.shopName || ""}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-md-2 mb-2 labelClass">
                              <div>Shop Image</div>
                              
                            </div>
                            <div className="col-md-5 mb-2 editimageinput">
                              <input
                                type="file"
                                className="form-control"
                                id="editShopImage"
                                name="shopImage"
                                onChange={handleFileChange1}
                              />
                            </div>
                            <div className="col-md-5 mb-3">
                              {imagePreview1 ? (
                                <img
                                  src={imagePreview1}
                                  alt="Product Preview"
                                  width="100"
                                  style={{ marginTop: "10px" }}
                                />
                              ) : (
                                editData.shopImage && (
                                  <img
                                    src={`https://gfg.org.in/${editData.shopImage}`}
                                    alt="Current Product"
                                    width="100"
                                    style={{ marginTop: "10px" }}
                                  />
                                )
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    {editData && editData.coordinates && (
                      <div className="col-md-12">
                        <MapComponent
                          initialPosition={[
                            editData.coordinates.coordinates[1],
                            editData.coordinates.coordinates[0],
                          ]}
                          onPositionChange={handlePositionChange}
                          apiKey="AIzaSyCiUU7Q5X1hTMRAJr0YJZPOxw40FfZcZp0"
                        />
                      </div>
                    )}
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
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Profile;
