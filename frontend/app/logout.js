import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

 const logoutUser = async (token) => {
    const navigation = useNavigation();
    try {
 
        const token = await AsyncStorage.getItem('userToken');
        
        const response = await axios.post('http://192.168.1.109:8000/api/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (response.status === 200) {
          console.log('Logout successful');
          await AsyncStorage.removeItem('userToken'); 
          await AsyncStorage.removeItem('userType'); 
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Logout failed:', error);
       
      }
    };

    export default logoutUser;