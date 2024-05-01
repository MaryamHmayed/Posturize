import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const ProgressScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Progress</Text>
            </View>
            <ScrollView style={styles.calendarContainer}>
                <Calendar
                theme={{
                    backgroundColor: '#2B2B2B',
                    calendarBackground: '#2B2B2B',
                    textSectionTitleColor: 'white',
                    textSectionTitleDisabledColor: 'gray',
                    selectedDayBackgroundColor: '#FFA500',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#FFA500',
                    dayTextColor: 'white',
                    textDisabledColor: 'gray',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: 'white',
                    indicatorColor: 'blue',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16
                }}
                
                
                
                />


            </ScrollView>

        </ScrollView>
    )}


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#2B2B2B',
        },
        header: {
            
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
        },
        headerTitle: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            paddingTop:50,
            paddingVertical:20
        },
        calendarContainer: {
            marginHorizontal: 30,
            height:180
            

        },
    })

    export default ProgressScreen;