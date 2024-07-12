import mongoose from 'mongoose';

export const mongoConnection = async () => {
  const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
  try {
    await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    throw new Error('Error conectando a MongoDB');
  }
};
