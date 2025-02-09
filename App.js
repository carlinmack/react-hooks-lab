import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Alert,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';

import { LinearGradient } from 'expo-linear-gradient';

import * as Facebook from 'expo-facebook';
import { NavigationContainer } from '@react-navigation/native';
import LoadingScreen from './Components/LoadingScreen';
import HomeScreen from './Components/HomeScreen';
import * as SecureStore from 'expo-secure-store';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = { loading: true, token: null };
    }

    componentWillMount() {
        this.checkForToken();
    }

    //Check Async Storage if token is available
    //If it is available set loading state to false
    async checkForToken() {
        let token = await SecureStore.getItemAsync('token');
        console.log(token);
        this.setState({
            token: token,
            loading: false,
        });
    }

    //Write token to secure storage.
    async saveTokenToSecureStorage(token) {
        SecureStore.setItemAsync('token', token);
        this.setState({
            token: token,
        });
    }

    render() {
        if (this.state.loading === true) {
            return <LoadingScreen />;
        } else {
            return <HomeScreen />;
        }
    }

    async logIn() {
        try {
            //Seed documentation on course site at mobileappdev.teachable.com
            //For default user names and passwords.
            await Facebook.initializeAsync('238123923880467');
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(
                    `https://graph.facebook.com/me?access_token=${token}`
                );
                this.saveTokenToSecureStorage(token);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    ImageBackground: {
        width: 258,
        height: 258,
    },
    topContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '90%'

    },
    dinDinText: {
        fontSize: 29,
        color: '#353535',
        letterSpacing: 0,
    },
    subText: {
        opacity: 0.5,
        fontSize: 14,
        color: '#000000',
        letterSpacing: 0,
    },
    buttonText: {
        fontSize: 14,
        color: "#FFFFFF",
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 58,
        backgroundColor: "#0F8CFF",
    },
    label: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
