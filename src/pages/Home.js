import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import Header from "../components/Header";
import "./Home.css";
import "animate.css";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { advertisementsList, getCategories } from "../services/service";
import { toast, ToastContainer } from "react-toastify";

function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [userToken, setUserToken] = useState();
  const [advertisements, setAdvertisements] = useState([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filteredCategoryList, setFilteredCategoryList] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const getCategoryList = async () => {
    try {
      const response = await getCategories();
      setCategoryList(response.data);
      setFilteredCategoryList(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const getAdvertisements = async () => {
        try {
          let advertiseData = {
            longitude: userData.coordinates.coordinates[0],
            latitude: userData.coordinates.coordinates[1],
          };
          console.log("advertData", advertiseData);
          const response = await advertisementsList(advertiseData);
          console.log("adsResponse", response);
          if (
            (response && response.statusCode === 200) ||
            response.statusCode === 201
          ) {
            setAdvertisements(response.data);
          }
        } catch (error) {
          console.log("error", error);
          toast.error("Error: Failed to fetch advertisements");
        }
      };
      getAdvertisements();
      setUserToken(localStorage.getItem("token"));
      localStorage.setItem("longitude", userData.coordinates.coordinates[0]);
      localStorage.setItem("latitude", userData.coordinates.coordinates[1]);
      localStorage.setItem("Address", userData.address);
    }
    getCategoryList();
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const filtered = categoryList.filter((merchant) =>
      merchant.categoryName
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setFilteredCategoryList(filtered);
  }, [searchText, categoryList]);

  const navigateToProducts = (categoryId) => {
    console.log("categoryId", categoryId);
    const token = localStorage.getItem("token");
    if (categoryId && token) {
      navigate(`/productdetails/${categoryId}`);
    } else if (categoryId && !token) {
      toast.error("Error: Please Login to visit our products");
      navigate("/login");
    } else if (!categoryId && token) {
      toast.error("Error: Please select a valid item");
    }
  };

  const groupAdvertisements = (ads) => {
    const groupedAds = [];
    if (ads.length <= 2) {
      groupedAds.push(ads);
    } else {
      for (let i = 0; i < ads.length; i += 2) {
        groupedAds.push(ads.slice(i, i + 2));
      }
    }
    return groupedAds;
  };

  const groupedAdvertisements = groupAdvertisements(advertisements);

  const sliderSettings = {
    dots: false, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className="body-wrapper">
      <Header onSearch={handleSearch} />

      <main id="MainContent" className="content-for-layout">
        <div className="featured-collection mt-5 overflow-hidden">
          <div className="collection-tab-inner">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-12">
                  <div className="row">
                  <h2 className="section-heading primary-color">Our Products</h2>
                    {filteredCategoryList &&
                      filteredCategoryList.map((category) => (
                        <div
                          className="col-lg-4 col-md-6 col-12"
                          data-aos="fade-up"
                          data-aos-duration="700"
                        >
                          <div className="product-card">
                            <div
                              className="product-card-img categoryParent"
                              onClick={() =>
                                navigateToProducts(category.categoryId)
                              }
                            >
                              <img
                                src={`https://gfg.org.in/${category.categoryImage}`}
                                className="categoryImageClass"
                              />
                              <div className="categoryNameClass">
                                {category.categoryName}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="col-lg-4 col-12">
                  <div className="slidersDiv">
                  {userToken && advertisements.length > 0 && (
                      <Slider {...sliderSettings}>
                        {groupedAdvertisements.map((group, index) => (
                          <div key={index} className="slide">
                            <div className="row">
                              {group.map((adv, advIndex) => (
                                <div
                                  key={advIndex}
                                  className="col-lg-12 col-md-6 col-12 mt-5"
                                  data-aos-duration="700"
                                >
                                  <div className="product-card mt-0 mb-4">
                                    <div className="product-card-img categoryParent">
                                      <img
                                        className="advertisementImageClass"
                                        src={`https://gfg.org.in/${adv}`}
                                        alt="Advertisement"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </Slider>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Home;
