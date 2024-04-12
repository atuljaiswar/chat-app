import mongoose from 'mongoose';

const DB_URL = process.env.MONGO_DB_URI as String;

const connectDb = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://atuljagatcode4509:g8xeqMUMoov9jQ1W@cluster0.ffvan1s.mongodb.net/chat-app-db?retryWrites=true&w=majority&appName=Cluster0'
    );
    console.log('Connerctd to DB');
  } catch (error) {
    console.log('error while connecting DB', error);
  }
};

export default connectDb;
