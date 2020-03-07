import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import moment from "moment";
import Icon from 'react-native-vector-icons/Ionicons';

export default function Event(props) {
    let imageBase =
        'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/Images/';

    function formatDate(date) {
        return moment(date).format('dddd Do MMMM - h:mm a')
    }

    // console.log(props)

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Image
                    style={styles.profileImage}
                    source={{ uri: imageBase + props.pic }}
                />
                <View style={styles.textSection}>
                    <Text>{props.name}</Text>
                    <Text style={styles.time}>{formatDate(props.date)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '90%',
        height: 120,
    },
    profileImage: {
        width: 50,
        height: 50,
        margin: 10,
    },
    topSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: 50,
    },
    buttonStyle: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    time: {
        fontSize: 14,
        opacity: 0.5,
    },
});
