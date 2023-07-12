import axios from "axios";

const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class BudgetService {
  getBGT(formData) {
    // const data = JSON.stringify(formData);
    return axios.post(ACCTMGMT_API_BASE_URL + "/budget", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data);
  }
}

export default new BudgetService();