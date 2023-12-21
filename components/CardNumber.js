import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { partitionCardNumber } from '../utils/CardUtils';

export default function CardNumber({ issuer, number, focusedField, handleTextClick, animateValues }) {
    const partitions = partitionCardNumber(issuer, number);

    const styles = StyleSheet.create({
        text: {
            color: 'white',
            fontSize: '20px'
        },
        focusedTextHolder: {
            outlineColor: "white",
            outlineStyle: "solid",
            outlineWidth: 2,
            borderRadius: 5,
            backgroundColor: 'rgba(50, 50, 255, 0.3)'
        },
        cardNumbersRow: {
            flexDirection: 'row',
            justifyContent: 'space-evenly', // or 'space-between' for equal spacing
            alignItems: 'center',
            height: '100%', // Adjust as needed
        },
        cardNumberFocus: {
            width: '95%',
            //height: '20%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
        }
    });

    return (
        <View style={styles.cardNumbersRow}>
            <View style={styles.cardNumberFocus}>
                <Pressable onPress={() => handleTextClick('cardNumber')} style={[styles.cardNumberFocus, focusedField === 'cardNumber' && styles.focusedTextHolder]}>
                    {partitions.map((partition, index) => {
                        return (
                            <Animated.View key={index} /*style={animatedStyle}*/>
                                <Text style={styles.text}>
                                    {partition !== null ? partition : '####'}
                                </Text>
                            </Animated.View>
                        );
                    })}
                </Pressable>
            </View>
        </View>
    );


}
