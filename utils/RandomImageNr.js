import { useState, useEffect } from 'react';

export default function useRandomImage() {
    const [randomImageNumber, setRandomImageNumber] = useState(1);

    useEffect(() => {
        const newRandomImageNumber = Math.floor(Math.random() * 25) + 1;
        setRandomImageNumber(newRandomImageNumber);
    }, []);

    return randomImageNumber;
}
