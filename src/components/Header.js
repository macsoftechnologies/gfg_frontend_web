// import React, { useEffect, useState } from "react";
// import "./Header.css";
// import { Link, useNavigate } from "react-router-dom";

// function Header() {
//   const [hasToken, setHasToken] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setHasToken(true);
//     }
//   }, []);

//   const token = localStorage.getItem("token");
//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/')
//   };

//   return (
//     <header className="sticky-header border-btm-black header-1">
//       <div className="header-bottom">
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-3 col-md-4 col-4">
//               <div className="header-logo">
//                 <Link className="linksClass logo-main" to={"/"}>
//                     GFG
//                 </Link>
//               </div>
//             </div>
//             <div className="col-lg-3 col-md-8 col-8">
//               <div className="headersearchsection">
//                 <input
//                   className="headersearch form-control"
//                   placeholder="Search Products Here..."
//                 />
//                 <i  className="fa fa-search headersearchicon" aria-hidden="true"></i>
//               </div>
//             </div>
//             <div className="col-lg-3 col-md-8 col-8">
//               <div className="headerservicesclass">Services</div>
//             </div>
//             <div className="col-lg-3 col-md-8 col-8">
//               <div className="header-action d-flex align-items-center justify-content-end">
//                 <Link className="headerloginclass" to={"/login"}>
//                   <span>
//                     {token ? (
//                       <button className="headerlogout_button" onClick={handleLogout}>
//                         Logout
//                       </button>
//                     ) : (
//                       "Login"
//                     )}
//                   </span>
//                 </Link>
//                 {hasToken && (
//                   <Link className="profileAnchor" to={"/profile"}>
                  
//                       <h6 className="profileIconText">Profile</h6>
//                       <svg
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         stroke="#fff"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         fill="none"
//                         className="profileSvgIcon"
//                       >
//                         <circle cx="12" cy="8" r="5" />
//                         <path d="M3,21 h18 C 21,12 3,12 3,21" />
//                       </svg>
                    
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;


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
    navigate('/');
  };

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <header className="sticky-header border-btm-black header-1">
      <div className="header-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-4 col-4">
              <div className="header-logo">
                <Link className="linksClass logo-main" to={"/"}>
                  GFG
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-8 col-8">
              <div className="headersearchsection">
                <input
                  className="headersearch form-control"
                  placeholder="Search Products Here..."
                  onChange={handleInputChange}
                />
                <i className="fa fa-search headersearchicon" aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-lg-3 col-md-8 col-8">
              <div className="headerservicesclass">Services</div>
            </div>
            <div className="col-lg-3 col-md-8 col-8">
              <div className="header-action d-flex align-items-center justify-content-end">
                <Link className="headerloginclass" to={"/login"}>
                  <span>
                    {token ? (
                      <button className="headerlogout_button" onClick={handleLogout}>
                        Logout
                      </button>
                    ) : (
                      "Login"
                    )}
                  </span>
                </Link>
                {hasToken && (
                  <Link className="profileAnchor" to={"/profile"}>
                    <h6 className="profileIconText">Profile</h6>
                    <svg
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
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
