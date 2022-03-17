import api from "./index.js";
import domain from "./domain.js";


export default {
    async request(credentials){
        return api.post(domain.multitur, credentials);
    }
}