import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const BottomNavigationBar = ({ navigation }) => {
    return (
        <View style={styles.navContainer}>
            {navItem(require('../../assets/home-icon.png'), 'Home', 'Home', navigation,currentTab === 'Home')}
            {navItem(require('../../assets/pts-icon.png'), 'PTs', 'PTs', navigation,currentTab === 'PTs')}
            {navItem(require('../../assets/setup-icon.png'), 'Setup', 'Setup', navigation, currentTab === 'Setup')} 
            {navItem(require('../../assets/progress-icon.png'), 'Progress', 'Progress', navigation,currentTab === 'Progress')}
            {navItem(require('../../assets/profile-icon.png'), 'Profile', 'Profile', navigation,currentTab === 'Profile')}
        </View>
    );
};

const navItem = (iconSource, label, navTarget, navigation, isCurrent) => (
    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(navTarget)}>
        <Image source={iconSource} style={[styles.icon, isCurrent && styles.iconCurrent]} />
        <Text style={[styles.navText, isCurrent && styles.navTextCurrent]}>{label}</Text>
    </TouchableOpacity>
);


const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#333',
        paddingBottom: 20,
        paddingTop: 10,
    },
    navItem: {
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
    iconCurrent: {
        tintColor: 'orange', 
    },
    navText: {
        color: 'white',
        fontSize: 11,
        paddingTop:5
    },
    navTextCurrent: {
        color: 'orange', 
    },
});

export default BottomNavigationBar;