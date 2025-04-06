import mongoose from 'mongoose';

const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    BANNED: 'banned'
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {type: String, required: true, unique: true},
  password: { type: String, required: true },
  permissions: { type: String, enum: Object.values(ROLES) },
  author: [{type: String}],                       //список щоденників, автором яких являється
  subscribe:[{type: String}],                     //список щоденників, які може читати
  language:{type: String}
});

const UsersModel = mongoose.model('users', userSchema);

export default UsersModel;