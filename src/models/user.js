import mongoose from 'mongoose'
import bcrypt from 'bcrypt-promise'
import * as log from '../lib/logger'

const UserSchema = mongoose.Schema({
  // TODO: Validate that username is an email
  username: {
    type: String,
    index: true,
    unique: true,
  },
  password: {
    type: String,
  },
})

const User = mongoose.model('User', UserSchema)

User.createUser = async user => {
  const { password: plainTextPassword } = user

  user.password = await bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(plainTextPassword, salt))

  return user.save()
}

User.findOneByUsername = username => User.findOne({ username })
User.isPasswordMatch = bcrypt.compare

export default User
