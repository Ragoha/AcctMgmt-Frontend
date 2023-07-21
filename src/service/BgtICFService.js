import axios from "axios";

const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class BtgICFService {
  getBGT(formData) {
    // const data = JSON.stringify(formData);
    alert(formData);
    return axios.post(ACCTMGMT_API_BASE_URL + "/budget", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getBgtICFList() {
    return axios
      .get(ACCTMGMT_API_BASE_URL + "/bgt/bgticf")
      .then((response) => response.data);
  }

  deleteBgtICF(sq) {
    return axios.delete(ACCTMGMT_API_BASE_URL + "/bgt/bgticf/" + sq);
  }
}

export default new BtgICFService();