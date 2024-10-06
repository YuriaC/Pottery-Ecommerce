import {randomBytes} from 'node:crypto';
import { promisify } from 'util';

// generate a random 16 byte-long random string for securing user password hash
// const userSalt = randomBytes(16).toString('hex');  // synchronous function will skip Mongoose password validation process
// console.log(`salt is ${userSalt}`);  // debug

const defaultSaltSize = 16;
const randomBytesAsync = promisify(randomBytes);

function generateSalt(size = defaultSaltSize) {
    return randomBytesAsync(size);  // return a promise
}

async function getSalt() {
    const result = await generateSalt();
    return result.toString('hex');
}

// testing 
// const salt = await getSalt();  
// console.log(`final result ${salt}`);


export default getSalt;


