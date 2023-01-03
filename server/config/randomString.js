function randomString(x) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let randString = '';
    for (let i = 0; i < x; i++) {
        randString += characters[Math.floor(Math.random() * characters.length)];
    }
    return randString;
}