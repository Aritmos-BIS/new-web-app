import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ArimalSchema = new Schema({
  _id: false,
  arimalId: {type: Number,  required: true},
  hp:{type: Number, required: true},
  attack:{type: Number, required: true},

})

const PlayerSchema = new Schema({
  _id: false,
  playerId: {type: Number,  required: true},
  turn: {type: Number, required: true},
  correct: {type: Boolean, required: false},
  time: {type: Number, required: false},
  arimal: {type: ArimalSchema, required: false}
})

const BattleSchema = new Schema({
  _id: Number,
  turn: {type: Number,  required: true},
  player1: { type: PlayerSchema, required: false },
  player2: { type: PlayerSchema, required: false },
  winnerId: { type: Number, required: false }
});

export default mongoose.models.Battle || mongoose.model('Battle', BattleSchema);