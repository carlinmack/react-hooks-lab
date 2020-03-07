import * as React from 'react';
import Constants from 'expo-constants';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function NavigationView(props) {
    const navigation = useNavigation();
    return (
        <View style={styles.topNavigationView}>
            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                }}
                onPress={() => navigation.openDrawer()}>
                <Icon name="md-menu" color="#15A5FF" size={25} />
            </TouchableOpacity>

            <Text style={styles.topNavigationViewText}> DinDin </Text>

            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                }}>
                <Icon name="md-search" color="#15A5FF" size={25} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'white',
    },
    topNavigationView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 90,
    },
    topNavigationViewText: {
        fontSize: 17,
        color: '#353535',
    },
});