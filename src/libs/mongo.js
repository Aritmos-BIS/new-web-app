import mongoose from 'mongoose';

export const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    throw new Error('Error conectando a MongoDB');
  }
};
