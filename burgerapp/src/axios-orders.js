import axios from 'axios';

const instance =axios.create({
    baseURL :'https://reactmyburger-35ac4-default-rtdb.firebaseio.com/'
});


export default instance;