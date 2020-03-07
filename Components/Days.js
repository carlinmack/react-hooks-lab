import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import EventCard from './EventCard';

export default function Days(props) {
    let deviceWidth = Dimensions.get('window').width;
    let [days, setDays] = useState(moment().day())
    let [events, setEvents] = useState(props.eventsData)

    useEffect(() => {
        // console.log(moment().year(2019).month(props.month).daysInMonth())
        let daysinmonth = moment().year(2019).month(props.month).daysInMonth()
        let days = []
        for (let i = 1; i <= daysinmonth; i++) {
            days.push(
                moment().year(2019).month(props.month).date(i)
            )
        }
        setDays(days)
    }, [])

    useEffect(() => {

    }, [props.eventsData])

    function thisDaysEvents(item) {
        let today = []
        // console.log(events)

        for (let event of events) {
            // console.log(event)
            if (moment(item).isSame(event.date, 'day')) {
                today.push(event)
            }
        }

        if (today.length > 0) {
            // today.map(item => <EventCard id={item.id} pic={item.pic} name={item.name} date={item.date} />)

            // today = [<Text style={{ fontSize: 15, color: 'black' }}>Add new event</Text>, <Text style={{ fontSize: 15, color: 'green' }}>Add new event</Text>]

            return <EventCard id={today[0].id} pic={today[0].pic} name={today[0].name} date={today[0].date} />
        } else {
            return (
                <TouchableOpacity style={styles.buttonStyle}>
                    <Icon name="md-add" color="#15A5FF" size={20} />
                    <Text style={{ fontSize: 15, color: '#15A5FF' }}>Add new event</Text>
                </TouchableOpacity>
            )
        }
    }

    function renderItem({ item, index }) {
        return (
            <View style={styles.list}>
                <Text style={styles.dayTitle}>{moment(item).format("dddd D MMMM")}</Text>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    {thisDaysEvents(item)}
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={days}
                renderItem={renderItem}
                width={'100%'}
                style={{ padding: '10%', flex: 1, }}
                keyExtractor={item => item}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },
    list: {
        flexDirection: 'column',
        width: '100%',
        flex: 1,
        marginBottom: 15,
    },
    dayTitle: {
        fontSize: 24,
        fontWeight: "bold",
        opacity: 0.7,
        paddingBottom: 10,
    },
    buttonStyle: {
        flexDirection: "row",
        width: '55%',
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        borderColor: '#15A5FF',
        borderRadius: 100,
        borderWidth: 1,
    },
});
