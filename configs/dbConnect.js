import { connect } from 'mongoose';

export const dbConnect = async () => {
    try {
        await connect(process.env.MONGO_URI)
        console.log('MongoDB has connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}


