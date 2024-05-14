import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SensorDataContext = createContext();

export const useSensorData = () => useContext(SensorDataContext);

export const SensorDataProvider = ({ children }) => {
    const [sensorData, setSensorData] = useState({ S0: null, S1: null, S2: null });
    const [postureStatus, setPostureStatus] = useState(''); 
    const [postureDurations, setPostureDurations] = useState({ good: 0, bad: 0, break: 0 });
    const [totalTimeTracked, setTotalTimeTracked] = useState(0);
    const [posturePercentages, setPosturePercentages] = useState({ good: "0.0", bad: "0.0", break: "0.0" });

    const lastUpdateRef = useRef(Date.now());

    useEffect(() => {
        interval = setInterval(fetchSensorData, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now();
            const elapsed = (now - lastUpdateRef.current) / 1000;
            lastUpdateRef.current = now;

            setTotalTimeTracked(prevTotal => {
                const newTotal = prevTotal + elapsed;
                setPostureDurations(prevDurations => {
                    const newDurations = {
                        ...prevDurations,
                        [postureStatus]: prevDurations[postureStatus] + elapsed,
                    };
                    if (newTotal > 0) {
                        // setPosturePercentages({
                        //     good: postureStatus === 'good' ? "100.0" : "0.0",
                        //     bad: postureStatus === 'bad' ? "100.0" : "0.0",
                        //     break: postureStatus === 'break' ? "100.0" : "0.0",
                        // });
                    // } else {
                        setPosturePercentages({
                            good: calculatePercentage(newDurations.good, newTotal),
                            bad: calculatePercentage(newDurations.bad, newTotal),
                            break: calculatePercentage(newDurations.break, newTotal),
                        });
                    }

                    return newDurations;
                });
                return newTotal;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [postureStatus]);

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

    const determinePosture = (values) => {
        const sensors = [values.S0, values.S1, values.S2];
        if (sensors.every(val => val < 20)) return 'break';
        else if (sensors.some(val => (val > 20 && val < 70) || val > 800)) return 'bad';
        return 'good';
    };

    const calculatePercentage = (duration, total) => {
        return total > 0 ? ((duration / total) * 100).toFixed(1) : "0.0";
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
        }}>
            {children}
        </SensorDataContext.Provider>
    );
};

export default SensorDataContext;