import mongoose from 'mongoose'
import * as log from '../lib/logger'
import User from './user';

const JogSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
  },
  time: { 
    type: Date, 
    default: Date.now,
  },
  duration: {
    type: Number,
    default: 0,
  },
})

const Jog = mongoose.model('Jog', JogSchema)

Jog.createJog = async (jog, user) => {
  jog.user = user._id 
  return jog.save()
}

export default Jog 
