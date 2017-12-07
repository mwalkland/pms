const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  maxStudents: { type: Number, required: true },
  areas: [{ type: String }],
  staff: { type: Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Project', schema);