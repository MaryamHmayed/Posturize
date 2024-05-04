import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const patients = [
  { id: '1', name: 'Patient 1' },
  { id: '2', name: 'Patient 2' },
  { id: '3', name: 'Patient 3' },

];

const PatientsScreen = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello John, find your patients</Text>
      <FlatList
        data={patients}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.patientItem}>
            <Text style={styles.patientText}>{item.name}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
              <Text style={styles.chatButton}>Chat</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2B2B',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  patientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  patientText: {
    color: 'white',
  },
  chatButton: {
    color: '#FFA500',
  },
});

export default PatientsScreen;