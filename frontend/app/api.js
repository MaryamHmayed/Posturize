import axios from 'axios';

const registerUser = async (userData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/register', userData);
        
        return response.data; 
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            
            throw { general: "Network error or server not reachable" };
        }
    }
};

export default registerUser;