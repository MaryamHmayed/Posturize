import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const SensorDataApp = () => {
  const [sensorData, setSensorData] = useState({
    S0: null, S1: null, S2: null, lastUpdatedDate: '', lastUpdatedTime: ''
  });
  const [postureStatus, setPostureStatus] = useState('');

  const extractAndFormatTimestamp = (timestamp) => {
    const dateObject = new Date(timestamp);
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(dateObject);
    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(dateObject);
    return {
      date: formattedDate,
      time: formattedTime
    };
  };

  const fetchSensorData = async () => {
    try {
      const response = await axios.get('https://io.adafruit.com/api/v2/strain_project/feeds/data', {
        headers: {
          "X-AIO-Key": "aio_lBVi28TCPXAyKsfxCFVdfow8EXlc",
        }
      });
      const { last_value, updated_at } = response.data;
      const { date, time } = extractAndFormatTimestamp(updated_at);
      const values = last_value.split(', ').reduce((acc, current) => {
        const [key, value] = current.split(': ');
        acc[key] = parseInt(value, 10);
        return acc;
      }, {});

      setSensorData({ ...values, lastUpdatedDate: date, lastUpdatedTime: time });
      compareValues(values); 
    } catch (error) {
      console.error('Failed to fetch sensor data:', error);
    }
  };

  const compareValues = (currentValues) => {
    if (currentValues.S0 > 20) {
      setPostureStatus('Posture 1');
    } else if (currentValues.S1 > 20) {
      setPostureStatus('Posture 2');
    } else {
      setPostureStatus('Normal');
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await fetchSensorData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>Current Sensor Values: S0: {sensorData.S0}, S1: {sensorData.S1}, S2: {sensorData.S2}</Text>
      <Text>Last Updated: {sensorData.lastUpdatedDate} at {sensorData.lastUpdatedTime}</Text>
      <Text>Posture Status: {postureStatus}</Text>
    </View>
  );
};

export default SensorDataApp;