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

            <View style={styles.statsContainer}>
                <View style={styles.totalHours}>
                <Text style={styles.hrTitle}>08:35</Text>
                <Text style={styles.statSubTitle}>Hours tracked</Text>
                </View >
                <View style={styles.dataContainer}>
                <Text style={[styles.statTitle, { color: '#05A37E' }]}>64%</Text>
                <Text style={styles.statSubTitle}>Good posture </Text>
                <Text style={styles.statSubTitle}>05:35 hours</Text>
                </View>
                <View style={styles.dataContainer} >
                <Text style={[styles.statTitle, { color: '#FE9120' }]}>19%</Text>
                <Text style={styles.statSubTitle}>Bad posture</Text>
                <Text style={styles.statSubTitle}>01:50 hours</Text>
                </View>
                <View style={styles.dataContainer}>
                <Text style={[styles.statTitle, { color: '#01627D' }]}>17%</Text>
                <Text style={styles.statSubTitle}>Break time</Text>
                <Text style={styles.statSubTitle}>01:10 hours</Text>
                </View>
            </View>

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
            paddingTop:40,
            paddingVertical:20
        },
        calendarContainer: {
            marginHorizontal: 30,
            height:180
            

        },
        statsContainer: {
            padding: 10,
            alignItems: 'center',
            
        },
        statTitle: {
            color: 'white',
            fontSize: 26,
            fontWeight: 'bold',
            
        },
        statSubTitle: {
            color: '#fff',
            fontSize: 16,
            
        },
        totalHours:{
            backgroundColor:"black",
            width:"85%",
            borderRadius:7,
            height:70,
            alignItems:"center",
            marginBottom:20,
            
        },
        hrTitle:{
            fontSize:32,
            color:"#fff",
            fontWeight: 'bold',
            marginVertical: 0,
        },
        dataContainer:{
            backgroundColor:"#4A4949",
            width:"85%",
            borderRadius:7,
            alignItems:"center",
            color:"#fff",
            height:80,
            marginBottom:10,
        }

    });
    

    export default ProgressScreen;