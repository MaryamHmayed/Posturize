import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useUser } from '../userContext';
import { apiInstance } from '../route'; 

const ProgressScreen = () => {
    const { user } = useUser();
    const [data, setData] = useState(null);
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiInstance.get('/get_data', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                console.log('Response:', response.data);

                if (response.status === 200) {
                    const fetchedData = response.data;
                    console.log('Fetched Data:', fetchedData); 
                    setData(fetchedData);
                } else {
                    Alert.alert('Error', 'Failed to fetch posture data');
                }
            } catch (error) {
                Alert.alert('Error', 'An error occurred while fetching data');
                console.error('Error fetching posture data:', error);
            } 
        };

        fetchData();
    }, [user.token]);

  

    const formatElapsedTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const renderStats = () => {
        if (!data || !selectedDate) {
            return <Text style={styles.noDataText}>Select a date to see posture data</Text>;
        }

        const responseDate = data.updated_at.split('T')[0];

        if (responseDate !== selectedDate) {
            return <Text style={styles.noDataText}>No data available for the selected date</Text>;
        }

        return (
            <View style={styles.statsContainer}>
                <View style={styles.totalHours}>
                    <Text style={styles.hrTitle}>{formatElapsedTime(data.totalTimeTracked)}</Text>
                    <Text style={styles.statSubTitle}>Hours tracked</Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={[styles.statTitle, { color: '#05A37E' }]}>{data.posturePercentages.good}%</Text>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statSubTitle}>Good posture</Text>
                        <Text style={styles.statSubTitle}>{formatElapsedTime(data.postureDurations.good)}</Text>
                    </View>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={[styles.statTitle, { color: '#FE9120' }]}>{data.posturePercentages.bad}%</Text>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statSubTitle}>Bad posture</Text>
                        <Text style={styles.statSubTitle}>{formatElapsedTime(data.postureDurations.bad)}</Text>
                    </View>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={[styles.statTitle, { color: '#01627D' }]}>{data.posturePercentages.break}%</Text>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statSubTitle}>Break time</Text>
                        <Text style={styles.statSubTitle}>{formatElapsedTime(data.postureDurations.break)}</Text>
                    </View>
                </View>
            </View>
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Progress</Text>
            </View>
            <ScrollView style={styles.calendarContainer}>
                <Calendar
                    onDayPress={onDayPress}
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
    );
};

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
        paddingTop: 40,
        paddingVertical: 20,
    },
    calendarContainer: {
        marginHorizontal: 30,
        height: 180,
    },
    statsContainer: {
        padding: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    statTitle: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
    },
    statSubTitle: {
        color: '#fff',
        fontSize: 16,
    },
    totalHours: {
        backgroundColor: 'black',
        width: '85%',
        borderRadius: 7,
        height: 70,
        alignItems: 'center',
        marginBottom: 20,
    },
    hrTitle: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
        marginVertical: 0,
    },
    dataContainer: {
        backgroundColor: '#4A4949',
        width: '85%',
        borderRadius: 7,
        alignItems: 'center',
        color: '#fff',
        height: 70,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    statusContainer: {
        flexDirection: 'column',
    },
    noDataText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ProgressScreen;