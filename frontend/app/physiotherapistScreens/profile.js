import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import useLogout from '../logout';
import { useUser } from '../userContext';
import { apiInstance } from '../route';

const ProfileScreen = () => {
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const { logoutUser } = useLogout();
  const { user } = useUser();


  const fetchProfileData = async () => {
    try {
      const response = await apiInstance.get('/pt/profile', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });
      const data = response.data;
      console.log(data)
      setBio(data.user.bio || '');
      setLocation(data.user.location || '');
      setPhoneNumber(data.user.phone_number || '');
      setProfileImage(data.user.profile_image ? `http://192.168.1.109:8000/storage/${data.user.profile_image}` : null);
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData(); 
  }, []);


  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri; 
      setProfileImage(selectedUri);
      uploadProfileImage(selectedUri);
    }
  };

  const uploadProfileImage = async (uri) => {
    const formData = new FormData();
    formData.append('profile_image', {
      uri,
      type: 'image/jpeg/png/gif', 
      name: 'profile.jpg'
    });
  
    try {
      const response = await apiInstance.post('/pt/update_image', formData, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status === 200) {
        const updatedProfilePath = `http://192.168.1.109:8000/storage/${response.data.path}`;
        setProfileImage(updatedProfilePath);
  
        alert('Profile image uploaded successfully');
      } else {
        alert(`Failed to upload image: Status code ${response.status}`);
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Image upload failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Icon name="edit" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Image source={require('../../assets/profileImage.png')} style={styles.profileImage} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.username}</Text>
        <Text style={styles.sectionTitle}>Bio</Text>
        <TextInput
          style={styles.bio}
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={3}
          underlineColorAndroid="transparent"
        />
        <Text style={styles.sectionTitle}>Location</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />
        <Text style={styles.sectionTitle}>Phone number</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          keyboardType='phone-pad'
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={logoutUser} >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D3A3A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 40,
    backgroundColor: "black",
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  profileImageContainer: {
    backgroundColor: '#000',
    height: 60,
  },
  profileImage: {
    width: 130,
    height: 130,
    position: "absolute",
    alignSelf: 'center',
    marginBottom: 90,
    borderRadius:65
  },
  infoContainer: {
    marginTop: 80,
    justifyContent: "space-between",
    gap: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    alignSelf: "center",
  },
  bio: {
    fontSize: 16,
    backgroundColor: 'transparent',
    color: "white",
    borderWidth: 1,
    borderColor: "#999",
    width: "83%",
    borderRadius: 5,
    textAlignVertical: 'top',
    marginLeft: 30,
  },
  sectionTitle: {
    marginLeft: 30,
    fontSize: 16,
    color: "#fff",
  },
  input: {
    fontSize: 16,
    backgroundColor: 'transparent',
    color: "white",
    borderWidth: 1,
    borderColor: "#999",
    width: "83%",
    borderRadius: 5,
    textAlignVertical: 'top',
    marginLeft: 30,
    height: 40,
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    marginTop: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileScreen;