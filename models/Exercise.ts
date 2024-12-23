import { model, Schema } from 'mongoose';

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
  },
});

export default model('Exercise', ExerciseSchema);
