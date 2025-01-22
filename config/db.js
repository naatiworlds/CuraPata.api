import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URI);
        console.log('Conectado a MongoDB');
    } catch (err) {
        console.error('Error al conectar a MongoDB:', err);
        process.exit(1);
    }
};

export default connectDB;
