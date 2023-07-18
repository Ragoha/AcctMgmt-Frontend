import axios from "axios";

const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class BudgetService {
  getBGT(formData) {
    // const data = JSON.stringify(formData);
    alert(formData);
    axios.post(ACCTMGMT_API_BASE_URL + "/budget", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new BudgetService();