import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SensorDataContext = createContext();

export const useSensorData = () => useContext(SensorDataContext);

export const SensorDataProvider = ({ children }) => {
    const [sensorData, setSensorData] = useState({ S0: null, S1: null, S2: null });
    const [postureStatus, setPostureStatus] = useState('Normal');
    const [postureDurations, setPostureDurations] = useState({ good: 0, bad: 0, break: 0 });
    const [totalTimeTracked, setTotalTimeTracked] = useState(0);
    const [posturePercentages, setPosturePercentages] = useState({ good: "0.0", bad: "0.0", break: "0.0" });

    const lastUpdateRef = useRef(Date.now());

    useEffect(() => {
        const interval = setInterval(fetchSensorData, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setInterval(updateDurations, 1000);
        return () => clearInterval(timer);
    }, []);

    const fetchSensorData = async () => {
        try {
            const response = await axios.get('https://io.adafruit.com/api/v2/strain_project/feeds/data', {
                headers: { "X-AIO-Key": "aio_lBVi28TCPXAyKsfxCFVdfow8EXlc" }
            });
            if (response.data) {
                const { last_value, updated_at } = response.data;
                updatePostureData(last_value, updated_at);
            }
        } catch (error) {
            console.error('Failed to fetch sensor data:', error);
        }
    };

   

    const updatePostureData = (last_value, updated_at) => {
        const values = parseSensorValues(last_value);
        const newStatus = determinePosture(values);
        if (newStatus !== postureStatus) {
            setPostureStatus(newStatus);
        }
        setSensorData({
            ...values,
            lastUpdatedDate: new Date(updated_at).toLocaleDateString('en-US'),
            lastUpdatedTime: new Date(updated_at).toLocaleTimeString('en-US')
        });
    };


    const parseSensorValues = (dataString) => dataString.split(', ').reduce((acc, current) => {
        const [key, value] = current.split(': ');
        acc[key.trim()] = parseInt(value, 10);
        return acc;
    }, {});

    

  

  
   
    return (
        <SensorDataContext.Provider value={{
            sensorData,
            postureStatus,
            
           
            elapsedTime: formatElapsedTime(totalTimeTracked),
            
        }}>
            {children}
        </SensorDataContext.Provider>
    );
};

export default SensorDataContext;