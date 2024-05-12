import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SensorDataContext = createContext();

export const useSensorData = () => useContext(SensorDataContext);

export const SensorDataProvider = ({ children }) => {
    const [sensorData, setSensorData] = useState({
        S0: null, S1: null, S2: null,
        lastUpdatedDate: '',
        lastUpdatedTime: ''
    });
    const [postureStatus, setPostureStatus] = useState('Normal');
    const [postureDurations, setPostureDurations] = useState({ good: 0, bad: 0, break: 0 });

    const [loading, setLoading] = useState(true);

    const lastUpdateRef = useRef(Date.now());

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now();
            const elapsed = (now - lastUpdateRef.current) / 1000; // Time in seconds
      
            setPostureDurations(prev => ({
                ...prev,
                [postureStatus]: prev[postureStatus] + elapsed
            }));
            lastUpdateRef.current = now;
        }, 1000);

        return () => clearInterval(timer);
    }, [postureStatus]);

    useEffect(() => {
        const fetchSensorData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://io.adafruit.com/api/v2/strain_project/feeds/data', {
                    headers: { "X-AIO-Key": "aio_lBVi28TCPXAyKsfxCFVdfow8EXlc" }
                });
                const { last_value, updated_at } = response.data;
                updatePostureData(last_value, updated_at);
            } catch (error) {
                console.error('Failed to fetch sensor data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSensorData();
        const interval = setInterval(fetchSensorData, 10000);
        return () => clearInterval(interval);
    }, []);

    const updatePostureData = (last_value, updated_at) => {
        const values = last_value.split(', ').reduce((acc, current) => {
            const [key, value] = current.split(': ');
            acc[key.trim()] = parseInt(value, 10);
            return acc;
        }, {});
        setSensorData({
            ...values,
            lastUpdatedDate: new Date(updated_at).toLocaleDateString('en-US'),
            lastUpdatedTime: new Date(updated_at).toLocaleTimeString('en-US')
        });
        const newStatus = determinePosture(values);
        if (newStatus !== postureStatus) {
            setPostureStatus(newStatus);
        }
    };

    const determinePosture = (values) => {
        const sensors = [values.S0, values.S1, values.S2];
        if (sensors.every(val => val < 20)) return 'break';
        else if (sensors.some(val => val < 50 || val > 800)) return 'bad';
        return 'good';
    };

    const posturePercentages = {
        good: (postureDurations.good / totalTimeTracked) * 100,
        bad: (postureDurations.bad / totalTimeTracked) * 100,
        break: (postureDurations.break / totalTimeTracked) * 100,
    };

    return (
        <SensorDataContext.Provider value={{
            sensorData,
            postureStatus,
            posturePercentages,
            elapsedTime: formatElapsedTime(totalTimeTracked),
            loading
        }}>
            {children}
        </SensorDataContext.Provider>
    );
};

const formatElapsedTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export default SensorDataContext;