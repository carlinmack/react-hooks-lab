import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import CaroselView from './CaroselView';
import Months from './Months';
import Days from './Days';
import NavigationView from './NavigationView';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: moment().month(),
            events: [],
            eventsHappening: [{
                "date": "2020-03-02T23:00:00.000Z",
                "id": 3,
                "name": "Christina Frazier",
                "pic": "3.png",
            },
            {
                "date": "2020-03-09T22:45:30.000Z",
                "id": 5,
                "name": "Jose Vasquez",
                "pic": "5.png",
            },
            {
                "date": "2020-03-09T22:45:30.000Z",
                "id": 6,
                "name": "Jose Vasquez",
                "pic": "5.png",
            },],
        };
    }

    componentDidMount() {
        const fetchData = async () => {
            let response = await fetch(
                'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/cards.json'
            );
            let parseObject = await response.json();
            let eventArray = this.assignIDs(parseObject);
            this.setState({
                events: eventArray,
            });
        };
        fetchData();
    }

    //Method that filters Events Pending
    eventsPending(events) {
        return events.filter(event => {
            return event.accepted === undefined ? true : false;
        });
    }

    //AssignIDs  this function will be remove in the future as id will be added to the invitations

    assignIDs(events) {
        return events.map((event, index) => {
            event.id = index;
            event.date = moment(event.date, 'DD-MM-YYYY hh:mm:ss');

            return event;
        });
    }

    acceptFunc(id) {
        console.log('aCcept')
        console.log(this.state)
    }

    decline(id) {
        console.log('DECLINE')
        console.log(this.state)
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationView />
                <Months month={this.state.month} />
                <LinearGradient colors={['white', '#ddd', 'white']}>
                    <CaroselView
                        eventsData={this.eventsPending(this.state.events)}
                        acceptCallback={this.acceptFunc}
                        declineCallback={this.decline}
                    />
                </LinearGradient>
                <Days
                    style={{ flex: 1, height: '100%' }}
                    eventsData={this.state.eventsHappening}
                    month={this.state.month} />
            </View>
        );
    }
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
