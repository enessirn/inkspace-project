import axios from "axios";
axios.defaults.withCredentials = true;
async function logout() {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/auth/logout`, null);
      localStorage.removeItem("isLogin");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);

    }
  }

export default logout;
