import api from "./index.js";

export default {
    async getSanatories(){
        return api.post('sanatories');
    }
}