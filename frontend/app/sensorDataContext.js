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

    const [loading, setLoading] = useState(true);

    const lastUpdateRef = useRef(Date.now());
    const lastStatusRef = useRef(postureStatus);

    useEffect(() => {
        const interval = setInterval(fetchSensorData, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            updateDurations();
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const goodPercentage = calculatePercentage(postureDurations.good, totalTimeTracked);
        const badPercentage = calculatePercentage(postureDurations.bad, totalTimeTracked);
        const breakPercentage = calculatePercentage(postureDurations.break, totalTimeTracked);
        setPosturePercentages({ good: goodPercentage, bad: badPercentage, break: breakPercentage });
    }, [postureDurations, totalTimeTracked]);

    const fetchSensorData = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const updateDurations = () => {
        const now = Date.now();
        const elapsed = (now - lastUpdateRef.current) / 1000; 
        if (elapsed > 0) {
            setTotalTimeTracked(prev => (prev || 0) + elapsed); 
            setPostureDurations(prev => ({
                ...prev,
                [postureStatus]: (prev[postureStatus] || 0) + elapsed 
            }));
        }
        lastUpdateRef.current = now;
    };

    const updatePostureData = (last_value, updated_at) => {
        const now = Date.now();
        const elapsed = (now - lastUpdateRef.current) / 1000;
      
        if (postureStatus === lastStatusRef.current) {
            const updatedDurations = {
                ...postureDurations,
                [postureStatus]: (postureDurations[postureStatus] || 0) + elapsed
            };
            setPostureDurations(updatedDurations);
            updatePercentages(updatedDurations, totalTimeTracked + elapsed); 
            
        }
        lastUpdateRef.current = now;
        const values = parseSensorValues(last_value);
        const newStatus = determinePosture(values);
        lastStatusRef.current = newStatus;
        setPostureStatus(newStatus);
        setTotalTimeTracked(prev => prev + elapsed);
    };

    const parseSensorValues = (dataString) => {
        return dataString.split(', ').reduce((acc, current) => {
            const [key, value] = current.split(': ');
            acc[key.trim()] = parseInt(value, 10);
            return acc;
        }, {});
    };

    const determinePosture = (values) => {
        const sensors = [values.S0, values.S1, values.S2];
        if (sensors.every(val => val < 20)) return 'break';
        else if (sensors.some(val => val < 50 || val > 800)) return 'bad';
        return 'good';
    };


    const updatePercentages = (durations, totalTracked) => {
        const newPercentages = {
            good: calculatePercentage(durations.good, totalTracked),
            bad: calculatePercentage(durations.bad, totalTracked),
            break: calculatePercentage(durations.break, totalTracked),
        };
        setPosturePercentages(newPercentages);
    };
    
    useEffect(() => {
        updatePercentages(postureDurations, totalTimeTracked);
    }, [postureDurations, totalTimeTracked]);

    const calculatePercentage = (duration, total) => {
        return total > 0 ? ((duration / total * 100).toFixed(1)) : "0.0";
    };

    const formatElapsedTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };
   
    return (
        <SensorDataContext.Provider value={{
            sensorData,
            postureStatus,
            postureDurations: {
                good: formatElapsedTime(postureDurations.good),
                bad: formatElapsedTime(postureDurations.bad),
                break: formatElapsedTime(postureDurations.break)
            },
            posturePercentages,
            elapsedTime: formatElapsedTime(totalTimeTracked),
            loading
        }}>
            {children}
        </SensorDataContext.Provider>
    );
};

export default SensorDataContext;