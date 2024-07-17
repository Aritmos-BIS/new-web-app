// models/Torneo.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Esquema de la batalla
const BattleSchema = new Schema({
  _id: false,
  Battleid: { type: Number, required: true,  unique: true },
  alumno1: { type: Object, required: true },
  alumno2: { type: Object, required: true },
  ganador: {
    id: { type: Number, required: true },
    nombre: { type: String, required: true }
  }
});

const TournamentSchema = new Schema({
  profesorId: { type: Number, required: true },
  batallas: { type: [BattleSchema], required: true }
});

export default mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema);