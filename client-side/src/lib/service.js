import axios from "axios";

class apiService {
  constructor() {
    this.auth = axios.create({
      baseURL: "http://localhost:4000",
      withCredentials: true,
    });
  }
  get_wishlist(props) {
    return this.auth.get(`/user/wishlistid/${props.user._id}`);
  }
}

const ApiService = new apiService();
export default ApiService;
