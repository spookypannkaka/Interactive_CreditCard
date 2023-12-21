import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Pressable, Animated} from 'react-native';
import FlipCard from 'react-native-flip-card';
import useRandomImage from '../utils/RandomImageNr';
import { issuerPicker } from '../utils/CardUtils';
import CardNumber from './CardNumber';

function Card(props) {
    const previousNumberRef = useRef(props.number);
    const animateValues = props.number.split('').map(() => new Animated.Value(0));
    const randomImageNumber = useRandomImage();
    const backgroundImage = require(`../assets/${randomImageNumber}.jpeg`);
    const chipImage = require(`../assets/chip.png`);

    useEffect(() => {
        // Animation trigger
        props.number.split('').forEach((digit, index) => {
            if (digit !== previousNumberRef.current[index]) {
                Animated.sequence([
                    Animated.timing(animateValues[index], {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true
                    }),
                    Animated.timing(animateValues[index], {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: true
                    })
                ]).start();
            }
        });

        previousNumberRef.current = props.number;
    }, [props.number]);

    const handleTextClick = (field) => {
        props.onFocusText(field);
    };

    return (

        <FlipCard
            friction={10}
            flipHorizontal={true}
            flipVertical={false}
            flip={props.isFlipped}
            clickable={false}
        >
        {/* Face Side */}
        <View style={styles.background}>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 6, }}>
                <View style={styles.overlay}></View>
            </ImageBackground>

            <View style={styles.imageComponents}>
                <Image source={chipImage} style={{ position: 'absolute', top: 10, left: 10, width: 101 * 0.6, height: 82 * 0.6, borderRadius: 10 }}/>
                <Image source={require(`../assets/${issuerPicker(props.number)}.png`)} style={{ position: 'absolute', right: 10, width: '20%', aspectRatio: 1 }} resizeMode="contain" />

                {/* Show and animate card number */}
                <CardNumber
                    issuer={props.issuer}
                    number={props.number}
                    focusedField={props.focusedField}
                    handleTextClick={handleTextClick}
                    animateValues={animateValues}
                />

                <View style={styles.bottomLeftText}>
                    <Pressable onPress={() => handleTextClick('cardHolder')} style={[styles.pressableTextContainer, props.focusedField === 'cardHolder' && styles.focusedTextHolder]}>
                        <Text style={styles.fadedText}>Card Holder</Text>
                        <Text style={[styles.text]}>{props.holder}</Text>
                    </Pressable>
                </View>

                <View style={styles.bottomRightText}>
                    <Pressable onPress={() => handleTextClick('cardMonth')} style={[styles.pressableTextContainer, (props.focusedField === 'cardMonth' || props.focusedField === 'cardYear') && styles.focusedTextHolder]}>
                        <Text style={styles.fadedText}>Expires</Text>
                        <View style={styles.expirationContainer}>
                            <Text style={[styles.text]}>{props.month} / </Text>
                            <Pressable onPress={() => handleTextClick('cardYear')}>
                                <Text style={[styles.text]}>{props.year}</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </View>

            </View>
        </View>

        {/* Back Side */}
            <View style={styles.background}>
                <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 6, transform: [{ rotate: '180deg' }]}}>
                    <View style={styles.overlay}></View>
                </ImageBackground>

                <View style={styles.imageComponents}>

                    <View style={styles.blackBar}/>
                    <Text style={{position: 'absolute', top: 65, right: 15, color: 'white',}}>CVV</Text>
                    <View style={styles.whiteBar}>
                        <Text style={{position: 'absolute', right: 15, color: 'black',}}>{props.cvv}</Text>
                    </View>

                    <Image source={issuerPicker(props.number)} style={{ position: 'absolute', right: 10, bottom: 10, width: '20%', aspectRatio: 1, opacity: 0.5 }} resizeMode="contain" />

                </View>
            </View>
        </FlipCard>
    );
}

const styles = StyleSheet.create({
    background: {
        width: '350px',
        height: '200px',
        borderRadius: '20px',
        //position: 'absolute',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 6
    },
    imageComponents: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    text: {
        color: 'white',
        fontSize: '16px',
        textTransform: 'uppercase',
    },
    fadedText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '14px',
    },
    focusedTextHolder: {
        outlineColor: "white",
        outlineStyle: "solid",
        outlineWidth: 2,
        borderRadius: 5,
        backgroundColor: 'rgba(50, 50, 255, 0.3)'
    },
    bottomLeftText: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        color: 'white',
        width: "70%",
        height: "40px"
    },
    bottomRightText: {
        position: 'absolute',
        bottom: 20,
        right: 10,
        color: 'white',
        height: "40px"
    },
    pressableTextContainer: {
        borderWidth: 2, // Add a border
        borderColor: 'transparent', // Make the border transparent
        borderRadius: 5, // Adjust as needed
        overflow: 'hidden', // Clip any content that overflows the container
        //padding: 10, // Adjust padding as needed
    },
    blackBar: {
        width: '100%',
        height: '20%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        top: 25
    },
    whiteBar: {
        width: '95%',
        height: '20%',
        backgroundColor: 'white',
        borderRadius: '5px',
        alignSelf: 'center',
        justifyContent: 'center',
        top: 45
    },
    expirationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 5,
    },
    expirationText: {
        paddingVertical: 5, // adjust as needed
        paddingHorizontal: 10, // adjust as needed
    },
});

export default Card