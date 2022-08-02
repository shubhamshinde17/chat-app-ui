import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = async () => {

    return (
        <View style={styles.root}>
            <Text>Home Screen Updates</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 45,
        margin: 15,
    }
})

export default HomeScreen;