import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: "http://localhost:4000",
      withCredentials: true,
      errors:[]
    });
  }
  
  signup({ email, password, confirmPassword, shippingAddres}) {
   
  
    return this.auth
      .post("/auth/signup", { email, password, confirmPassword, shippingAddres })
      .then(({ data }) => data);
  }

  login({ email, password }) {
    return this.auth
      .post("/auth/login", { email, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post("/auth/logout", {}).then(({ data }) => data);
  }

  user() {
    return this.auth.get("/auth/user").then(({ data }) => data);
  }

  
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
