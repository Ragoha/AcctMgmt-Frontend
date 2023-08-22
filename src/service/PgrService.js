import axios from "axios";
import { useNavigate } from "react-router-dom";


const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";

class PgrService {

    findpgrByCoCd(data) {
        return axios
            .get(ACCTMGMT_API_BASE_URL + "/pgr", {
                params: {
                    coCd: data.coCd,
                },
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
            })
            .then((response) => response.data);
    }

    insertPgr(data) {
        return axios
            .post(
                ACCTMGMT_API_BASE_URL + "/pgr",
                {
                    coCd: data.pgr.coCd,
                    pgrCd: data.pgr.pgrCd,
                    pgrNm: data.pgr.pgrNm,
                },
                {
                    headers: {
                        "access-token": data.accessToken,
                    },
                    withCredentials: true,
                }
            )
            .then((response) => {
                return response.data;
            });
    }

    deletePgr(data) {
        console.log(data);
        return axios
            .delete(ACCTMGMT_API_BASE_URL + "/pgr", {
                params: {
                    coCd: data.coCd,
                    pgrCd: data.pgrCd,
                },
                headers: {
                    "access-token": data.accessToken,
                },
                withCredentials: true,
            })
            .then((response) => response.data);
    }

    updateGisu(data) {
        return axios
            .put(
                ACCTMGMT_API_BASE_URL + "/gisu",
                {
                    coCd: data.coCd,
                    gisu: data.gisu.gisu,
                    frDt: data.gisu.frDt,
                    toDt: data.gisu.toDt,
                },
                {
                    headers: {
                        "access-token": data.accessToken,
                    },
                    withCredentials: true,
                }
            )
            .then((response) => {
                return response.data;
            });
    }
}


export default new PgrService();