import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android';
const HomeScreen = () => {

    const [postureData, setPostureData] = useState({
        sitting: '1:30',
        goodPosture: 64,
        badPosture: 19,
        breakTime: 17,
      });

    return (
        <View style={styles.container}>
          <Text style={styles.header}>Your current posture is flawless, keep it up!</Text>
          <View style={styles.card}>
            <Text>You've been sitting for {postureData.sitting} now</Text>
            <ProgressBar style={styles.progressBar} styleAttr="Horizontal" color="#00FF00" progress={postureData.goodPosture / 100} />
            <Text>{postureData.goodPosture}% Good posture</Text>
            <ProgressBar style={styles.progressBar} styleAttr="Horizontal" color="#FF0000" progress={postureData.badPosture / 100} />
            <Text>{postureData.badPosture}% Bad posture</Text>
            <ProgressBar style={styles.progressBar} styleAttr="Horizontal" color="#0000FF" progress={postureData.breakTime / 100} />
            <Text>{postureData.breakTime}% Break time</Text>
          </View>
        </View>
      );













}