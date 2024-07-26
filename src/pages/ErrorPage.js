import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div>
      <Header />
      <section>
      {/* <!-- breadcrumb start --> */}
        <div className="breadcrumb">
            <div className="container">
                <ul className="list-unstyled d-flex align-items-center m-0">
                    <li><Link to={'/'}>Home</Link></li>
                    <li>
                        <svg className="icon icon-breadcrumb" width="64" height="64" viewBox="0 0 64 64" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.4">
                                <path
                                    d="M25.9375 8.5625L23.0625 11.4375L43.625 32L23.0625 52.5625L25.9375 55.4375L47.9375 33.4375L49.3125 32L47.9375 30.5625L25.9375 8.5625Z"
                                    fill="#000" />
                            </g>
                        </svg>
                    </li>
                    <li>404</li>
                </ul>
            </div>
        </div>
        {/* <!-- breadcrumb end --> */}

        <main id="MainContent" className="content-for-layout">
            <div className="error-page mt-100">
                <div className="container">
                    <div className="error-content text-center">
                        <div className="error-img mx-auto">
                            <img src="assets/img/error/error.png" alt="error" />
                        </div>
                        <p className="error-subtitle">Page Not Found</p>
                        <Link to={'/'} className="btn-primary mt-4">BACK TO HOMEPAGE</Link>
                    </div>
                </div>
            </div>            
        </main>
      </section>
      <Footer />
    </div>
  )
}

export default ErrorPage