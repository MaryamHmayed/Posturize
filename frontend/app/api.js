import axios from 'axios';

const registerUser = async (userData) => {
    console.log("check")
    try {
        const response = await axios.post('http://192.168.1.109:8000/api/register', userData);
        console.log(response);
        return response.data; 
    
    } catch (error) {
        console.error(error);
            
    }           
};



export default registerUser;