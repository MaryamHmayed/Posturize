import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const ProgressScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Progress</Text>
            </View>
            <View style={styles.calendarContainer}>
                <Calendar/>

            </View>

        </ScrollView>
    )}


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#2B2B2B',
        },
        header: {
            padding: 20,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
        },
        headerTitle: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
        },
        calendarContainer: {
            marginBottom: 10,
        },
    })

    export default ProgressScreen;