import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions, Alert } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import axios from 'axios';
import { REACT_APP_API_URL } from "../../services/env-vars";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const { height } = useWindowDimensions();

    const onLogin = async (email, password, navigation) => {
        await checkFormValidity();
        if (isValid) {
            try {
                axios.post(`${REACT_APP_API_URL}/api/login`,
                    {
                        email, password
                    }
                )
                    .then((responseJson) => {
                        let responseData = responseJson.data;
                        if (responseData?.code === 200) {
                            console.log(responseData);
                            AsyncStorage.setItem('token', JSON.stringify(responseData?.token));
                            navigation.navigate('Home');
                        } else {
                            Alert.alert('Failed!', 'Please try again!');
                        }
                    })
                    .catch(error => console.log(error));
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Please enter valid data!");
        }
    }

    const checkFormValidity = async () => {
        if (email != '' && password != '') {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    return (
        <View style={styles.root}>
            <Text style={styles.logo}>Welcome</Text>

            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
            />
            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />
            <CustomButton
                text="Login"
                onPress={() => onLogin(email, password, navigation)}
            />
            <CustomButton
                text="Register"
                onPress={() => navigation.navigate('Register')}
            />
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

export default LoginScreen;