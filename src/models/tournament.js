// models/Torneo.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Esquema de la batalla
const BatallaSchema = new Schema({
  id: { type: Number, required: true },
  alumno1: { type: Object, required: true },
  alumno2: { type: Object, required: true },
  ganador: { type: Number, required: true }
});

// Esquema del torneo
const TorneoSchema = new Schema({
  profesorId: { type: Number, required: true },
  batallas: { type: [BatallaSchema], required: true }
});

export default mongoose.models.Torneo || mongoose.model('Torneo', TorneoSchema);