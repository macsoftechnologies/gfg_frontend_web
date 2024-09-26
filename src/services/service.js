import axios from "axios";

export const getAddress = (lat, lng) => {
  try {
    const apiKey = "4b166d0d32f064238cff077e7057d862";
    return new Promise((resolve, reject) => {
      const apiUrl = `https://apis.mapmyindia.com/advancedmaps/v1/${apiKey}/rev_geocode?lat=${lat}&lng=${lng}`;
      fetch(`${apiUrl}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("addressData", data);
          const { results } = data;
          console.log("results", results);
          if (results.length > 0) {
            const { formatted_address } = results[0];
            resolve(formatted_address);
          } else {
            reject("No address found");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  } catch (error) {
    console.log(error);
  }
};

export const addMerchant = async (merchantdata) => {
  try {
    const response = await axios.post(
      "https://api.gfg.org.in/user/merchantregister",
      merchantdata
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const addCustomer = async (customerData) => {
  try {
    const response = await axios.post(
      "https://api.gfg.org.in/user/customerregister",
      customerData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      "https://api.gfg.org.in/user/loginuser",
      userData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const adminProducts = async () => {
  try {
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.get(
        "https://api.gfg.org.in/product/getproductslist",
        config
      );
  
      return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const addMerchantProduct = async (prodData) => {
  try {
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post(
        "https://api.gfg.org.in/product/addmerchantproduct",
        prodData,
        config
      );
  
      return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMerchantProductList = async (prodData) => {
  try {
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post(
        "https://api.gfg.org.in/product/getmerchantproducts",
        prodData,
        config
      );
  
      return response.data;
  } catch (error) {
    throw error;
  }
};

export const editMerchantProduct = async (_id) => {
  try {
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post(
        "https://api.gfg.org.in/product/editmerchantproduct",
        _id,
        config
      );
  
      return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeMerchantProduct = async (_id) => {
  try {
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post(
        "https://api.gfg.org.in/product/deletemerchantproduct",
        _id,
        config
      );
  
      return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMerchantProdById = async (data) => {
  try {
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post(
        "https://api.gfg.org.in/product/getmerchantproductbyid",
        data,
        config
      );
  
      return response.data;
  } catch (error) {
    throw error;
  }
}

export const getAdminProdById = async (data) => {
  try {
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post(
        "https://api.gfg.org.in/product/getproductbyid",
        data,
        config
      );
  
      return response.data;
  } catch (error) {
    throw error;
  }
}

export const getProductMerchants = async (data) => {
  try {
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post(
        "https://api.gfg.org.in/product/searchproducts",
        data,
        config
      );
  
      return response.data;
  } catch (error) {
    throw error;
  }
}

export const getUserDetailsById = async (data) => {
  try {
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post(
        "https://api.gfg.org.in/user/getuserbyid",
        data,
        config
      );
  
      return response.data;
  } catch (error) {
    throw error;
  }
}

export const switchUser = async (data) => {
  try {
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post(
        "https://api.gfg.org.in/user/switchuser",
        data,
        config
      );
  
      return response.data;
  } catch (error) {
    throw error;
  }
}

export const editUser = async (data) => {
  try {
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post(
        "https://api.gfg.org.in/user/updateuser",
        data,
        config
      );
  
      return response.data;
  } catch (error) {
    throw error;
  }
}

export const searchAdminProducts = async (data) => {
  try {
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post(
        "https://api.gfg.org.in/product/searchadminproducts",
        data,
        config
      );
  
      return response.data;
  } catch (error) {
    throw error;
  }
}

export const getCategories = async () => {
  try {
      const response = await axios.get(
        "https://api.gfg.org.in/product/getcatogerieslist"
      );
  
      return response.data;
  } catch (error) {
    throw error;
  }
}

export const advertisementsList = async (data) => {
  try {
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.post(
        "https://api.gfg.org.in/advertisements/getadsbylocation",
        data,
        config
      );
  
      return response.data;
  } catch (error) {
    throw error;
  }
}