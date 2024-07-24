import { connect } from 'mongoose';

const dbConnectionHandler = async () => {
    try {
        await connect(process.env.MONGO_URI)
        console.log('MongoDB has connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}


export default dbConnectionHandler