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

User.createUser = async newUser => {
  const { password: plainTextPassword } = newUser

  newUser.password = await bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(plainTextPassword, salt))

  return newUser.save().then(x => {
    log.debug(x)
    return x
  })
}

User.findOneByUsername = username => User.findOne({ username })
User.isPasswordMatch = bcrypt.compare

export default User
