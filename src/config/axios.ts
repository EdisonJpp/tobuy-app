import axios from 'axios'; 

const customAxios = axios.create({
    baseURL : process.env.REACT_APP_BACKEND || 'https://tobuy-com-20.herokuapp.com'
});

export default customAxios ; 