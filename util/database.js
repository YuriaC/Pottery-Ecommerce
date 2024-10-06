import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

const dbConnection = async() => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to Mongoose!\n');
    } catch (err) {
        console.error(`Error ${err} has occurred.`);
    } finally {
        // await mongoose.disconnect();
        // console.log('Ended connection to Mongoose!\n');
    }
}
export default dbConnection;