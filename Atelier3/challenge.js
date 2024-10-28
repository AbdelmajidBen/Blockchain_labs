function customHash(input) {
    let hash = 5381;
    let salt = 907; 

    const vowels = 'AEIOUaeiou';
    let leftPart = '';  
    let rightPart = ''; 

    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        if (vowels.includes(char)) {
            leftPart += char;
        } else {
            rightPart += char;
        }
    }
    let transformedInput = leftPart + rightPart;
    for (let i = 0; i < transformedInput.length; i++) {
        let charCode = transformedInput.charCodeAt(i);


        hash = ((hash << 5) + hash) ^ (charCode * salt);
        salt = (salt * (charCode + i) + 17) & 0xFFFFFFFF;
    }
    hash = (hash ^ (hash >>> 16)) * 0x85ebca6b;
    hash = (hash ^ (hash >>> 13)) * 0xc2b2ae35;
    hash = hash ^ (hash >>> 16);

    return (hash >>> 0).toString(16).padStart(8, '0');
}

console.log(customHash("Hala Madrid , Y nada mas  !"));
console.log(customHash("Hala Madrid , Y nada mas  !"));
console.log(customHash("Vini ballon de oro  !"));
