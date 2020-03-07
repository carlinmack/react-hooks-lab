import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import moment from "moment";
import Icon from 'react-native-vector-icons/Ionicons';

export default function InvationCard(props) {
    let imageBase =
        'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/Images/';

    function formatDate(date) {
        return moment(date).format('dddd Do MMMM - h:mm a')
    }

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
            <View style={styles.buttomSection}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => { props.declineCallback() }}>
                    <Icon name="md-close" color="red" size={20} />
                    <Text style={{ fontSize: 15, color: 'red' }}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => { props.acceptCallback() }}>
                    <Icon name="md-checkmark" color="#38D459" size={20} />
                    <Text style={{ fontSize: 15, color: '#38D459' }}>Accept</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 315,
        height: 120,
        elevation: 11,
        borderRadius: 4,
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
    buttomSection: {
        flexDirection: 'row',
        borderTopColor: '#D8D8D8',
        borderTopWidth: 1,
        height: 52,
        width: '100%',
    },
    time: {
        fontSize: 14,
        opacity: 0.5,
    },
});
