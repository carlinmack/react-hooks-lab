import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import CaroselView from './CaroselView';
import Months from './Months';
import Days from './Days';
import NavigationView from './NavigationView';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

export default function MainCalendarScreen(props) {
    let [month, setMonth] = useState(moment("2019-12-25").month())
    let [eventsMaybe, setEvents] = useState([])
    let [eventsHappening, setEventHappening] = useState([{
        "name": "Todd Bladwin",
        "date": "Thursday, 12/12/2019, 01:25:00",
        "pic": "4.png"
    }])

    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch(
                'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/cards.json'
            );
            let parseObject = await response.json();
            let eventArray = assignIDs(parseObject);

            setEvents(eventArray)
        };

        fetchData();
    }, []);

    //Method that filters Events Pending
    function eventsPending(events) {
        return events.filter(event => {
            return event.accepted === undefined ? true : false;
        });
    }

    //AssignIDs  this function will be remove in the future as id will be added to the invitations

    function assignIDs(events) {
        return events.map((event, index) => {
            event.id = index;
            event.date = moment(event.date, 'DD-MM-YYYY hh:mm:ss');

            return event;
        });
    }

    function acceptFunc(id) {
        let eventAccepted = eventsMaybe.filter(event => event.id === id)
        setEventHappening(eventsHappening => [...eventsHappening, ...eventAccepted])
        setEvents(eventsMaybe.filter(event => event.id !== id))
    }

    function decline(id) {
        setEvents(eventsMaybe.filter(event => event.id !== id))
    }

    // useEffect(() => {
    //     console.log(eventsHappening)
    // }, [eventsHappening])

    return (
        <View style={styles.container}>
            <NavigationView />
            <Months month={month} />
            <LinearGradient colors={['white', '#ddd', 'white']}>
                <CaroselView eventsData={eventsPending(eventsMaybe)}
                    acceptCallback={acceptFunc}
                    declineCallback={decline} />
            </LinearGradient>
            <Days
                style={{ flex: 1, height: '100%' }}
                eventsData={eventsHappening}
                month={month} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'white',
    },
});

