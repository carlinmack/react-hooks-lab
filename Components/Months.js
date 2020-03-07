import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import moment from 'moment';

export default function Months(props) {
    let deviceWidth = Dimensions.get('window').width;
    let [monthIndex, _] = useState(props.month)

    function renderItem({ item, index }) {
        return (
            <Text>{item.trim()}</Text>
        );
    }

    return (
        <View style={styles.container}>
            <Carousel
                data={[...moment.months(), ...moment.months()]}
                renderItem={renderItem}
                sliderHeight={50}
                sliderWidth={deviceWidth}
                itemWidth={deviceWidth * 0.2}
                firstItem={monthIndex}
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
        height: 50,
    },
});
