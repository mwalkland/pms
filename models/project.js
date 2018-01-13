const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true, enum: ['Research-based', 'Software Engineering', 'Both'] },
  maxStudents: { type: Number },
  areas: [{ type: String }],
  staff: { type: Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  pendingStudents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['confirmed', 'pending', 'available'] }
});

module.exports = mongoose.model('Project', schema);