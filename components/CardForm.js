import React, {useState, useRef} from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { issuerPicker } from '../utils/CardUtils'
import Card from './Card'

function CardForm() {
    const cardNumberRef = useRef(null);
    const cardHolderRef = useRef(null);
    const cardCVVRef = useRef(null);
    const cardMonthRef = useRef();
    const cardYearRef = useRef();

    const [cardNumber, setCardNumber] = useState('');
    const [displayedCardNumber, setDisplayedCardNumber] = useState('################');

    const [cardHolder, setCardHolder] = useState('');
    const [displayedCardHolder, setDisplayedCardHolder] = useState('FULL NAME');

    const [cardMonth, setCardMonth] = useState('MM');
    const [cardYear, setCardYear] = useState('YY');

    const [cardCVV, setCardCVV] = useState('');
    const [displayedCardCVV, setDisplayedCardCVV] = useState('');

    const [isFlipped, setIsFlipped] = useState(false);

    // State for focusing on an input field
    const [focusedField, setFocusedField] = useState(null);
    const handleFocus = (field) => {
        setFocusedField(field);

        if (field === 'cardCVV') {
            setIsFlipped(true);
        } else {
            setIsFlipped(false);
        }

        switch (field) {
            case 'cardNumber':
                cardNumberRef.current.focus();
                break;
            case 'cardHolder':
                cardHolderRef.current.focus();
                break;
            case 'cardCVV':
                cardCVVRef.current.focus();
                break;
            case 'cardMonth':
                cardMonthRef.current.focus();
                break;
            case 'cardYear':
                cardYearRef.current.focus();
                break;            
            default:
                break;
          }
    };
    
    const handleBlur = () => {
        setFocusedField(null);
        setIsFlipped(false);
    };

    const handleCardNumberChange = newText => {
        const numbersOnly = newText.replace(/[^0-9]/g, '').slice(0, 16);
        setCardNumber(numbersOnly);

        const issuer = issuerPicker(numbersOnly);

        const formatted = formatCardNumber(numbersOnly, issuer);
        setDisplayedCardNumber(formatted);
    };

    const formatCardNumber = (number, issuer) => {
        let formatted = String(number);
        let maxDigits = 16;

        if (issuer === 'amex') {
            maxDigits = 15;
        } else if (issuer === 'dinersclub') {
            maxDigits = 14;
        }

        while (formatted.length < maxDigits) {
            formatted += '#';
        }
        
        return formatted;
    };

    const handleCardHolderChange = newText => {
        setCardHolder(newText);
        setDisplayedCardHolder(newText.trim() === '' ? 'FULL NAME' : newText);
    };

    const handleCardCVVChange = newText => {
        const numbersOnly = newText.replace(/[^0-9]/g, '').slice(0, 4);

        setCardCVV(numbersOnly);

        setDisplayedCardCVV('*'.repeat(numbersOnly.length));
    };

    return (
        <View style={styles.container}>

            <View style={styles.cardOutside}>
                <Card
                    number={displayedCardNumber}
                    holder={displayedCardHolder}
                    month={cardMonth}
                    year={cardYear}
                    cvv={displayedCardCVV}
                    focusedField={focusedField}
                    onFocusText={handleFocus}
                    isFlipped={isFlipped}
                    issuer={issuerPicker(cardNumber)}
                />
            </View>

            {/* Card Number */}
            <View style={styles.inputContainer}>
                <Text>Card Number</Text>
                <TextInput
                    ref={cardNumberRef}
                    style={styles.input}
                    onChangeText={handleCardNumberChange}
                    value={cardNumber}
                    onFocus={() => handleFocus('cardNumber')}
                    onBlur={handleBlur}
                    inputMode="numeric"
                />
            </View>

            {/* Card Holder */}
            <View style={styles.inputContainer}>
                <Text>Card Holder</Text>
                <TextInput
                    ref={cardHolderRef}
                    style={styles.input}
                    onChangeText={handleCardHolderChange}
                    value={cardHolder}
                    onFocus={() => handleFocus('cardHolder')}
                    onBlur={handleBlur}
                />
            </View>

            <View style={styles.expirationCVVcontainer}>

                {/* Expiration Month */}
                <View styles={styles.itemTitle}>
                    <Text>Expiration Date</Text>
                    <Picker
                        ref={cardMonthRef}
                        onFocus={() => handleFocus('cardMonth')}
                        onBlur={handleBlur}
                        selectedValue={cardMonth}
                        onValueChange={(itemValue, itemIndex) =>
                        setCardMonth(itemValue)}
                        style={styles.pickerStyle}
                    >
                        <Picker.Item label="Month" value="MM"/>
                        <Picker.Item label="01" value="01" />
                        <Picker.Item label="02" value="02" />
                        <Picker.Item label="03" value="03" />
                        <Picker.Item label="04" value="04" />
                        <Picker.Item label="05" value="05" />
                        <Picker.Item label="06" value="06" />
                        <Picker.Item label="07" value="07" />
                        <Picker.Item label="08" value="08" />
                        <Picker.Item label="09" value="09" />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="11" value="11" />
                        <Picker.Item label="12" value="12" />
                    </Picker>
                </View>

                {/* Expiration Year */}
                <View styles={styles.itemTitle}>
                    <Text> </Text>
                    <Picker
                        ref={cardYearRef}
                        onFocus={() => handleFocus('cardYear')}
                        onBlur={handleBlur}
                        selectedValue={cardYear}
                        onValueChange={(itemValue, itemIndex) =>
                        setCardYear(itemValue)}
                        style={styles.pickerStyle}
                    >
                        <Picker.Item label="Year" value="YY" />
                        <Picker.Item label="2023" value="23" />
                        <Picker.Item label="2024" value="24" />
                        <Picker.Item label="2025" value="25" />
                        <Picker.Item label="2026" value="26" />
                        <Picker.Item label="2027" value="27" />
                        <Picker.Item label="2028" value="28" />
                        <Picker.Item label="2029" value="29" />
                        <Picker.Item label="2030" value="30" />
                        <Picker.Item label="2031" value="31" />
                        <Picker.Item label="2032" value="32" />
                        <Picker.Item label="2033" value="33" />
                        <Picker.Item label="2034" value="34" />
                    </Picker>
                </View>

                {/* CVV */}
                <View styles={styles.itemTitle}>
                    <Text>CVV</Text>
                    <TextInput
                        ref={cardCVVRef}
                        style={styles.input}
                        onChangeText={handleCardCVVChange}
                        value={cardCVV}
                        onFocus={() => handleFocus('cardCVV')}
                        onBlur={handleBlur}
                        inputMode="numeric"
                    />
                </View>

            </View>

            {/* Submit Button */}
            <Pressable style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '450px',
        borderRadius: '20px',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        gap: '10px'
    },
    inputContainer: {
        display: "flex",
        width: '90%',
        gap: '4px',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    expirationCVVcontainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: '0px 20px',
    },
    itemTitle: {
        display: 'flex',
        flexDirection: 'column',
    },
    cardOutside: {
        marginTop: -80, // Adjust this value to control how much the card sticks out
        zIndex: 1, // Ensure the card is rendered above other components
    },
    submitButton: {
        backgroundColor: '#007bff', // A blue color
        padding: 15, // Adjust padding for size
        borderRadius: 5, // Rounded corners
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
        width: '90%', // Span the entire width
        marginTop: 10, // Margin at the top
        marginBottom: 20,
    },
    submitButtonText: {
        color: '#fff', // White text
        fontSize: 18, // Adjust font size as needed
    },
    pickerStyle: {
        backgroundColor: '#fff',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
    }
});

export default CardForm;