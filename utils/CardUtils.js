  export function issuerPicker(cardNumber) {
    const firstDigit = cardNumber.slice(0, 1);
  
    switch (firstDigit) {
      case '4':
        return 'visa';
      case '5':
        return 'mastercard';
      case '3':
        // Check the second digit for American Express
        const secondDigit = cardNumber.slice(1, 2);
        if (secondDigit === '4' || secondDigit === '7') {
          return 'amex';
        }
        // Check the second digit for Diners Club
        if (secondDigit === '0' || secondDigit === '6' || secondDigit === '8') {
          return 'dinersclub';
        }
        return 'visa';
      case '6':
        return 'discover';
      default:
        return 'visa';
    }
  }

export function partitionCardNumber(issuer, cardNumber) {
let cardNumberPartition = [];

switch (issuer) {
    case 'visa':
    case 'mastercard':
    case 'discover':
        // #### #### #### #### 4-4-4-4
        cardNumberPartition = [cardNumber.slice(0, 4), '****', '****', cardNumber.slice(12, 16)];
        break;
    case 'amex':
        // #### ###### ##### 4-6-5-0
        cardNumberPartition = [cardNumber.slice(0, 4), '******', '*****', ''];
        break;
    case 'dinersclub':
        // #### ###### #### 4-6-4-0
        cardNumberPartition = [cardNumber.slice(0, 4), '******', '****', ''];
        break;
    default:
        cardNumberPartition = [cardNumber.slice(0, 4), '****', '****', cardNumber.slice(12, 16)];
        break;
}

if (issuer === 'amex') {
    cardNumberPartition[1] = cardNumber.slice(4, 10).split('').map(char => /\d/.test(char) ? '*' : char).join('');
    cardNumberPartition[2] = cardNumber.slice(10, 15).split('').map((digit, index) => (index < 2 && /\d/.test(digit) ? '*' : digit)).join('');
} else if (issuer === 'dinersclub') {
    cardNumberPartition[1] = cardNumber.slice(4, 10).split('').map(char => /\d/.test(char) ? '*' : char).join('');
    cardNumberPartition[2] = cardNumber.slice(10, 14).split('').map((digit, index) => (index < 2 && /\d/.test(digit) ? '*' : digit)).join('');
} else {
    cardNumberPartition[1] = cardNumber.slice(4, 8).split('').map(digit => /\d/.test(digit) ? '*' : '#').join('');
    cardNumberPartition[2] = cardNumber.slice(8, 12).split('').map(digit => /\d/.test(digit) ? '*' : '#').join('');
}

return cardNumberPartition;
}