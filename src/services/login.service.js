import axios from "axios";

export const authenticate = async (email, password) => {
    const url = `/register?email=${email}&password=${password}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      localStorage.setItem('user', JSON.stringify(data[0]));

      if (data.length > 0) {
        return true;
      }
      return false;
    } catch (e) {
      let error = new Error("Authentication failed");
      error.status = 404;
      throw error;
    }
  };

