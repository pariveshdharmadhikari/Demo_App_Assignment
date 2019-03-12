import axios from 'axios';

//BaseAPI
export default axios.create({
    baseURL:'http://10.10.10.224/restapi/wp-json'
    
});