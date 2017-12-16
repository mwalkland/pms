const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const schema = new Schema({
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  studentInfo: {
    chosenProject: { type: Schema.Types.ObjectId, ref: 'Project' },
    createdProject: { type: Schema.Types.ObjectId, ref: 'Project' }
  },
  staffInfo: {
    suggestedProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    areas: [{ type: String }]
  }
});

schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('User', schema);
