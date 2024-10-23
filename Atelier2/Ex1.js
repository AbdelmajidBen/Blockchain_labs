function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function generatePrime(limit) {
    let prime = 0;
    while (!isPrime(prime)) {
        prime = Math.floor(Math.random() * limit) + 2;
    }
    return prime;
}

function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function modInverse(e, phi) {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;
    if (phi === 1) return 0;
    while (e > 1) {
        q = Math.floor(e / phi);
        t = phi;
        phi = e % phi;
        e = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }
    return x1 < 0 ? x1 + m0 : x1;
}

function generateKeyPair() {
    const primeLimit = 1000;
    let p = generatePrime(primeLimit);
    let q = generatePrime(primeLimit);
    while (p === q) q = generatePrime(primeLimit);
    let n = p * q;
    let phi = (p - 1) * (q - 1);
    let e = 2;
    while (e < phi && gcd(e, phi) !== 1) e++;
    let d = modInverse(e, phi);
    return { publicKey: { e, n }, privateKey: { d, n } };
}

function encrypt(message, publicKey) {
    let { e, n } = publicKey;
    let cipher = [];
    for (let i = 0; i < message.length; i++) {
        cipher.push(BigInt(message.charCodeAt(i)) ** BigInt(e) % BigInt(n));
    }
    return cipher;
}

function decrypt(cipher, privateKey) {
    let { d, n } = privateKey;
    let message = '';
    for (let i = 0; i < cipher.length; i++) {
        message += String.fromCharCode(Number(BigInt(cipher[i]) ** BigInt(d) % BigInt(n)));
    }
    return message;
}

let { publicKey, privateKey } = generateKeyPair();
let message = "Test Abdelmajid How are you ";
let encryptedMessage = encrypt(message, publicKey);
let decryptedMessage = decrypt(encryptedMessage, privateKey);
console.log("Original Message:", message);
console.log("Encrypted Message:", encryptedMessage);
console.log("Decrypted Message:", decryptedMessage);
