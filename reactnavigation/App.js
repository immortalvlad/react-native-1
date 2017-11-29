import React from 'react';
import { Platform, StatusBar, StyleSheet, View,Text } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';


// import App from './app/playground/App';
import App from './app/transition/App';

export default ()=>(
    <View style={styles.container}>
      <View style={styles.statusBarUnderlay} />
      <App/>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});

