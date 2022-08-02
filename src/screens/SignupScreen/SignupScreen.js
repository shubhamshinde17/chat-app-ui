import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions, Alert } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import axios from 'axios';
import { REACT_APP_API_URL } from "../../services/env-vars";

const SignupScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isValid, setIsValid] = useState(false);
    const { height } = useWindowDimensions();

    const onRegister = async (firstName, lastName, username, email, password, navigation) => {
        await checkFormValidity();
        if (isValid) {
            try {
                axios.post(`${REACT_APP_API_URL}/api/register`,
                    {
                        firstName, lastName, username, email, password
                    }
                )
                    .then((responseJson) => {
                        console.log(responseJson.data);
                        if (responseJson.data?.code === 200) {
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
        if (firstName != '' && lastName != '' && username != '' && email != '' && password != '') {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    return (
        <View style={styles.root}>
            <Text style={styles.logo}>Register Here!</Text>

            <CustomInput
                placeholder="First Name"
                value={firstName}
                setValue={setFirstName}
            />
            <CustomInput
                placeholder="Last Name"
                value={lastName}
                setValue={setLastName}
            />
            <CustomInput
                placeholder="Username"
                value={username}
                setValue={setUsername}
            />
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
                text="Register"
                onPress={() => onRegister(firstName, lastName, username, email, password, navigation)}
            />
            <CustomButton
                text="Login"
                onPress={() => navigation.navigate('Login')}
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

export default SignupScreen;