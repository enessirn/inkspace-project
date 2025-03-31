import axios from "axios";

async function logout() {
    try {
      await axios.post("/api/auth/logout", null, { withCredentials: true });
      localStorage.removeItem("isLogin");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);

    }
  }

export default logout;
