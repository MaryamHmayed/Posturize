import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const useLogout = () => {
  const navigation = useNavigation();

  const logoutUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.log('No token found, cannot logout.');
        return;
      }

      const response = await axios.post('http://192.168.1.109:8000/api/logout', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
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

  return { logoutUser };
};

export default useLogout;