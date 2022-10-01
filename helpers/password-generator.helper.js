const generatePassword = () => {
    const numberChars = '0123456789';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const specialChars = '!@#$%^&*(){}?-,`;[]|<>';
    const allChars = numberChars + upperChars + lowerChars + specialChars;
    const randPasswordArray = Array(16);

    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = specialChars;
    randPasswordArray[3] = lowerChars;
    const password = randPasswordArray.fill(allChars, 3);

    return shuffleArray(
        password.map((x) => {
            return x[Math.floor(Math.random() * x.length)];
        })
    ).join('');
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

module.exports = generatePassword;
