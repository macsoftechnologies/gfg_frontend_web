import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ onSearch }) {
  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setHasToken(true);
    }
  }, []);

  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <header className="border-btm-black header-1 headerClass">
      <div className="header-bottom d-md-block d-none">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-3 col-sm-3 col-3">
              <div className="header-logo">
                <Link className="linksClass logo-main" to={"/"}>
                  <img
                    className="gfg_logo_class"
                    src="/assets/img/gfg_logo.png"
                    alt="GFG"
                  />
                </Link>
              </div>
            </div>
            {/* <div className="col-lg-1 col-md-3 col-sm-3 col-3">
              <div className="headerservicesclass">Services</div>
            </div>
            <div className="col-lg-1 col-md-3 col-sm-3 col-3">
              {hasToken && (
                <Link className="profileAnchor" to={"/profile"}>
                  <div className="headerservicesclass">Profile</div>
                </Link>
              )}
            </div>
            <div className="col-lg-2 col-md-3 col-sm-3 col-2">
              <div className="header-action d-flex align-items-center justify-content-center">
                <Link className="headerloginclass" to={"/login"}>
                  <span>
                    {token ? (
                      <button
                        className="headerlogout_button"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    ) : (
                      "Login"
                    )}
                  </span>
                </Link>
              </div>
            </div> */}
            <div className="col-lg-4 col-md-3 col-sm-3 col-4">
              <ul class="nav justify-content-start">
                <li class="nav-item">
                  <Link class="nav-link active headerservicesclass" to="#">
                    Services
                  </Link>
                </li>
                {hasToken && (
                  <li class="nav-item">
                      <Link className="nav-link headerservicesclass" to={"/profile"}>
                        Profile
                      </Link>
                  </li>
                )}
                <li class="nav-item">
                <Link className="nav-item headerloginclass" to={"/login"}>
                  <span>
                    {token ? (
                      <button
                        className="headerlogout_button"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    ) : (
                      "Login"
                    )}
                  </span>
                </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-3 col-sm-3 col-4">
              <div className="headersearchsection">
                <input
                  className="headersearch form-control"
                  placeholder="Search Products Here..."
                  onChange={handleInputChange}
                />
                <i
                  className="fa fa-search headersearchicon"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-md-none d-block ">
        <nav class="navbar navbar-expand-lg bg-body-tertiary header-marg">
          <div class="container">
            <div className="header-logo">
              <Link className="linksClass logo-main" to={"/"}>
                <img
                  className="gfg_logo_class"
                  src="/assets/img/gfg_logo.png"
                  alt="GFG"
                />
              </Link>
            </div>
            <button
              class="navbar-toggler collapsed navbarToggleIcon"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="navbarSupportedContent">
              <div className="headersearchsection">
                <input
                  className="headersearch form-control"
                  placeholder="Search Products Here..."
                  onChange={handleInputChange}
                />
                <i
                  className="fa fa-search headersearchicon"
                  aria-hidden="true"
                ></i>
              </div>
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 mt-3">
                <li class="nav-item">
                  <Link className="headerloginclass mb-3">Services</Link>
                </li>

                <li class="nav-item">
                  {hasToken && (
                    <Link className="profileAnchor" to={"/profile"}>
                      Profile
                      {/* <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        className="profileSvgIcon"
                      >
                        <circle cx="12" cy="8" r="5" />
                        <path d="M3,21 h18 C 21,12 3,12 3,21" />
                      </svg> */}
                    </Link>
                  )}
                </li>
                <li class="nav-item">
                  <Link className="headerloginclass" to={"/login"}>
                    <span>
                      {token ? (
                        <button
                          className="headerlogout_button"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      ) : (
                        "Login"
                      )}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
